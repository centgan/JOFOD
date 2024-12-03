import {getServerSession} from "next-auth";
import {authOptions} from "@/app/api/auth/[...nextauth]/route";

export async function GET() {}

export async function POST(request: Request) {
  // maybe verify that this person is indeed an employer and I don't know if maybe later I will want to add this but
  // the user has the necessary permissions

  const session = getServerSession(authOptions);
  const req_json = await request.json();

  // what columns do I need to create a job posting?
  // id
  // company_id
  // posted by whom? (for internal usage only maybe)
  // job title
  // template_id if there are only small changes maybe figure out a way to still use this template_id but just make the changes? Maybe too complicated just store the changes so forget about this field then
  // location
  // summary
  // description
  // desired skills
  // coop term
  // posted date
  // compensation?
}
