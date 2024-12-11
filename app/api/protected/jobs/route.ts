import {getServerSession} from "next-auth";
import {authOptions} from "@/app/api/auth/[...nextauth]/route";
import {query} from "@/database";
import {NextResponse} from "next/server";
import {PostingType} from "@/app/types/job";

// ues this is duplicated from templates/route.ts but I will deal with this later
async function getSessionObject() {
  const session = await getServerSession(authOptions);
  if (!session) {
    throw new Error('Unauthorized');
  } else if (session.user.company_id === undefined) {
    throw new Error('Wrong userType');
  }
  return session;
}

export async function GET(request: Request) {
  // const req_json = await request.json();
  const url = new URL(request.url);
  console.log(url);
  const url_id = url.searchParams.get('id');
  const url_query = url.searchParams.get('query');
  const company = url.searchParams.get('company');
  const filter = url.searchParams.get('filter');

  let sql_query = 'SELECT * FROM defaultdb.jobs WHERE ';
  const params = [];

  // if requesting by job id then everything else should be empty
  if (url_id) {
    sql_query += 'job_id = ?';
    params.push(url_id);
  } else {
    if (url_query){
      sql_query += 'job_title like ?';
      params.push(`%${url_query}%`);
    }

    if (company){
      sql_query += 'company_id = ?'
      params.push(company);
    }

    if (filter){
      console.log('location', filter);
    }
  }

  if (sql_query.length === 35){
    sql_query = 'SELECT * FROM defaultdb.jobs;';
  }
  // console.log(sql_query, '\n', params);
  const results = await query(sql_query, params);
  // console.log(results);
  if (results.length <= 0){
    return NextResponse.json({status: 204})
  }
  return NextResponse.json(results, {status: 200});
}

export async function POST(request: Request) {
  // maybe verify that this person is indeed an employer and I don't know if maybe later I will want to add this but
  // the user has the necessary permissions

  const session = await getSessionObject();
  const req_json:PostingType = await request.json();

  // const sql_write = 'SELECT * FROM defaultdb.jobs WHERE email = ?';
  const sql_write = 'INSERT INTO defaultdb.jobs (' +
    'company_id, template_id, post_type, job_title, job_description, job_responsibilities, desired_skills, ' +
    'additional_questions, additional_information, location, term, compensation, end_date) ' +
    'VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?);';
  const sql_params = [session.user.company_id, 0, req_json.postType, req_json.jobTitle,
    req_json.jobDescription, req_json.jobResponsibilities, req_json.desiredExperience, req_json.additionQuestion,
    req_json.additionInfo, req_json.location, req_json.workCycle, req_json.compensation, req_json.endDate];
  const results_sql = await query(sql_write, sql_params);
  console.log(results_sql);
  if (results_sql?.affectedRows !== 1) {
    // under has a red line ignore it probably has something to do with how I set up eslint
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
  return NextResponse.json({ status: 500 });
}
