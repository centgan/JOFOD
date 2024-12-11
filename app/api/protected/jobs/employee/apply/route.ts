import {getServerSession} from "next-auth";
import {authOptions} from "@/app/api/auth/[...nextauth]/route";

async function getSessionObject() {
  const session = await getServerSession(authOptions);
  if (!session) {
    throw new Error('Unauthorized');
  } else if (session.user.userType.toLowerCase() !== 'employee') {
    throw new Error('Wrong userType');
  }
  return session;
}

export async function POST(request: Request) {
  const session = await getSessionObject();
  const req_json = await request.json();

  // this doesn't work yet because I haven't implemented resume_link
  // const sql = 'INSERT INTO defaultdb.applied_jobs (user_id, job_id, resume_link) VALUES (?, ?, ?);';
  // const sql_params = [session.user.user_id, req_json.job_id, req_json.resume_link];


}
