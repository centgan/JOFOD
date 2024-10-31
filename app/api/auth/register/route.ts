import {NextResponse} from "next/server";
import { query } from '@/database';
import formData from 'form-data';
import Mailgun from 'mailgun.js';
import {randomUUID} from "node:crypto";
import {redirect} from "next/navigation";

const API_KEY = process.env.MAILGUN_API_KEY || ''
const DOMAIN = process.env.MAILGUN_DOMAIN || ''

async function emailVerif(user) {
  const token = `${randomUUID()}${randomUUID()}`.replace(/-/g, '')

  // write token to database
  console.log(user);
  console.log(user.id, token);
  const write_sql = 'INSERT defaultdb.activate_token (user_id, token) VALUES (?, ?);';
  const write_params = [user.id, token];
  const write_res = await query(write_sql, write_params);
  if (write_res.affectedRows === 0) {
    throw new Error('couldnt write to database');
  }

  const mailgun = new Mailgun(formData);
  const client = mailgun.client({ username: 'api', key: API_KEY });

  const messageData = {
    from: `Example Email <mailgun@${DOMAIN}>`,
    to: user.email,
    subject: 'Please Activate Your Account',
    text: `Hello ${user.first}, please activate your account by clicking this link: http://localhost:3000/api/activate/${token}`,
  };

  await client.messages.create(DOMAIN, messageData);
  return null;
  // redirect is handled by client side maybe would be better for server side but for now just making it in client side
  // redirect('/register/email-verif');
}

async function employeeHandler(request_json) {
  try {
    const {email, password, first, last, location, userType} = request_json;
    console.log(email, password, first, last, location, userType);
    // need to deal with sql injection attack not exactly sure what steps are needed for this

    // need to check if user exists already, yes you could just get an error from the sql query but better to do it
    // this way
    const sql_check = 'SELECT * FROM defaultdb.users WHERE email = ?';
    const params_check = [email];
    const results_check = await query(sql_check, params_check);
    // console.log(results_check);
    if (results_check?.length !== 0) {
      // under has a red line ignore it probably has something to do with how I set up eslint
      return NextResponse.json({ error: 'A user with this email already exists' }, { status: 409 });
    }

    // need to deal with hashed password might write my own thing though since pretty sure bcrypt was deprecated
    // const hashedPassword = await hash(password, 10);

    // wondering if uuid is even really necessary for now will delete the column from database and if end up needing it
    // at a later date then will add it back in because id can serve the same purpose as uuid
    // const uuid = generateUUID();
    // console.log(uuid);
    // insert user into database
    const sql = 'INSERT defaultdb.users (email, password, first_name, last_name, is_employer) VALUES (?, ?, ?, ?, ?);';
    const params = [email, password, first, last, false];
    const results = await query(sql, params);
    console.log(results);
    if (results.affectedRows > 0) {
      if (location !== '') {
        const addition = 'INSERT defaultdb.additional_employee (user_id, location) VALUES (?, ?);';
        const params_added = [results.insertId, location]
        const res = await query(addition, params_added);
        if (res.affectedRows > 0) {
          request_json.id = results.insertId;
          console.log(request_json);
          await emailVerif(request_json);
          return NextResponse.json({ user_id: results.insertId }, {status: 200 });
        }
        return NextResponse.json({ error: 'Database issue' }, {status: 500 });
      }
      request_json.id = results.insertId;
      console.log(request_json);
      await emailVerif(request_json);
      console.log('post');
      return NextResponse.json({ user_id: results.insertId }, {status: 200 });
    }
    return NextResponse.json({ error: 'Database issue' }, {status: 500 });
  } catch (e) {
    console.log(e);
    return NextResponse.json({ error: 'Internal Server Error' },{status: 500});
  }
}

async function employerHandler(request_json) {
  let root_permission = false;
  try {
    const {first, last, company, department, email, password, location} = request_json;
    console.log(first, last, company, location, email, password);
    // check if email is already in use
    const email_check = 'SELECT * FROM defaultdb.users WHERE email = ?';
    const email_params = [email];
    const results_email_check = await query(email_check, email_params);
    if (results_email_check?.length !== 0) {
      // under has a red line ignore it probably has something to do with how I set up eslint
      return NextResponse.json({ error: 'A user with this email already exists' }, { status: 409 });
    }

    // check if company is already listed.
    const company_check = 'SELECT * FROM defaultdb.company_map WHERE company_name = ?';
    const company_params = [company];
    const results_company_check = await query(company_check, company_params);
    let company_id = results_company_check[0]?.id;
    if (results_company_check?.length === 0) {
      // if is the first person to list the company then they get root access even if department is new as well
      // if department is new but company is not then send access request to root user.
      const create_company = 'INSERT defaultdb.company_map (company_name) VALUES (?);'
      const create_params = [company];
      const results_create = await query(create_company, create_params);
      if (results_create.warningStatus !== 0){
        console.log(results_create);
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
      }
      root_permission = true;
      company_id = results_create?.insertId;

      const create_department = 'INSERT defaultdb.department_map (company_id, department_name) VALUES (?, ?);';
      const create_department_params = [company_id, 'ALL'];
      const results_department_check = await query(create_department, create_department_params);
      if (results_department_check.affectedRows === 0) {
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
      }
    }

    // department will not be used to create a record in the department_map table yet. First will wait for the root
    // user to approve and when they approve will connect the user_id with the department name.
    // in department_table there will be a row where department name is ALL and in this instance it means all

    // hash password
    // insert into database
    const sql = `INSERT defaultdb.users (
    email, password, first_name, last_name, is_employer, company_id, root) VALUES (?, ?, ?, ?, ?, ?, ?);`;
    const params = [email, password, first, last, true, company_id, root_permission];
    const results = await query(sql, params);
    console.log(results);
    if (results.affectedRows > 0) {
      if (location !== '') {
        const addition = 'INSERT defaultdb.additional_employer (user_id, location) VALUES (?, ?);';
        const params_added = [results.insertId, location]
        const res = await query(addition, params_added);
        if (res.affectedRows > 0) {
          request_json['id'] = results.insertId;
          await emailVerif(request_json);
          return NextResponse.json({ user_id: results.insertId }, {status: 200 });
        }
        return NextResponse.json({ error: 'Database issue' }, {status: 500 });
      }
      request_json['id'] = results.insertId;
      await emailVerif(request_json);
      return NextResponse.json({ user_id: results.insertId }, {status: 200 });
    }
    return NextResponse.json({ error: 'Database Issue' }, {status: 500 });
  } catch (e) {
    console.log(e);
    return NextResponse.json({ error: 'Internal Server Error' }, {status: 500});
  }
}

export async function POST(request: Request) {
  const req_json = await request.json();
  if (req_json.userType === 'employee') {
    return employeeHandler(req_json);
  } else if (req_json.userType === 'employer') {
    return employerHandler(req_json);
  } else {
    return NextResponse.json({ error: 'Usertype Undefined' }, {status: 404});
  }
}
