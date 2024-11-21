import {NextResponse} from "next/server";
import {query} from "@/database";

interface AddEmployer {
  address: string;
  hiringPreference: string;
  website: string;
  industry: string;
  size: string;
  summary: string;
  values: string;
  mission: string;
  userType: string;
  user_id: number;
  company_id: number;
}

interface AddEmployee {
  cycleType: string;
  cycles: string;
  pitch: string;
  intro: string;
  university: string;
  studyYear: string;
  degreeType: string;
  degree: string;
  links: string[];
  graduationDate: Date;
  userType: string;
  user_id: number;
}
const employeeAddHandler = async (request:AddEmployee) => {
  // should probably figure out a way to make sure that this is indeed the first time that they are writing to it
  // actually not really sure how important it is maybe it can just overwrite it maybe not don't know yet but for now
  // skipping it

  const writing_sql = 'UPDATE defaultdb.additional_employee SET pitch=?, cycle_type=?, cycles=?, ' +
    'intro=?, university_name=?, study_year=?, degree_type=?, degree=?, links=?, graduation_date=? WHERE user_id = ?'
  const writing_params = [request.pitch, request.cycleType, request.cycles, request.intro, request.university,
    request.studyYear, request.degreeType, request.degree, request.links, request.graduationDate, request.user_id];
  const results = await query(writing_sql, writing_params);

  if (results.affectedRows !== 1) {
    return NextResponse.json({error: 'An internal server error occurred'}, {status: 500});
  }

  return NextResponse.json({status: 200});
}

const employerAddHandler = async (request:AddEmployer) => {
  // should probably figure out a way to make sure that this is indeed the first time that they are writing to it
  // actually not really sure how important it is maybe it can just overwrite it maybe not don't know yet but for now
  // skipping it

  // have user_id sent from session id from the front end now have to query database to find what company they belong to
  // or when I create the session id I can include a user_id as well as a company_id will probably be very beneficial
  // lets assume that I've already updated the session id to include the company_id when it is an employer

  const writing_sql = 'UPDATE defaultdb.additional_company SET address = ?, website = ?, industry = ?, `size` = ?, ' +
    'summary = ?, `values` = ?, mission = ? WHERE company_id = ?;';
  const writing_params = [request.address, request.website, request.industry, request.size, request.summary, request.values, request.mission, request.company_id];
  const results = await query(writing_sql, writing_params);
  if (results.affectedRows !== 1) {
    return NextResponse.json({error: 'An internal server error occurred'}, {status: 500});
  }

  const writing_employer = 'UPDATE defaultdb.additional_employer SET hiring_preference=? WHERE user_id=?;';
  const writing_params_employer = [request.hiringPreference, request.user_id];
  const results_employer = await query(writing_employer, writing_params_employer);
  console.log(results_employer);
  if (results_employer.affectedRows !== 1) {
    return NextResponse.json({error: 'An internal server error occurred'}, {status: 500});
  }

  return NextResponse.json({status: 200});
}

export async function POST(request: Request) {
  const req_json = await request.json();
  if (req_json.userType === 'employee') {
    return employeeAddHandler(req_json);
  } else if (req_json.userType === 'employer') {
    return employerAddHandler(req_json);
  } else {
    return NextResponse.json({error: 'invalid user type'}, {status: 400});
  }
}
