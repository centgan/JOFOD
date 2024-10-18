import {NextResponse} from "next/server";
import { query } from '@/database';

export async function POST(request: Request) {
  try {
    const {email, password, userType} = await request.json();
    console.log(email, password, userType);
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

    // need to create unique id for each user, don't want to use autoincrement

    // insert user into database
    const sql = 'INSERT defaultdb.users (user_id, email, password) VALUES (?, ?, ?);';
    const params = [2, email, password];
    const results = await query(sql, params);
    console.log(results);
  } catch (e) {
    console.log(e);
    return NextResponse.json({ error: 'Internal Server Error' },{status: 500});
  }
}
