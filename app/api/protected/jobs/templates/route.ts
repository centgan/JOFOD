import {getServerSession} from "next-auth";
import {authOptions} from "@/app/api/auth/[...nextauth]/route";
import {NextResponse} from "next/server";
import {query} from "@/database";

async function getSessionObject() {
  const session = await getServerSession(authOptions);
  if (!session) {
    throw new Error('Unauthorized');
  } else if (session.user.company_id === undefined) {
    throw new Error('Wrong userType');
  }
  return session;
}

export async function GET() {
  const session = await getSessionObject();

  if (!session) {
    return NextResponse.json({message: 'Not authorized'}, {status: 401});
  }

  const template_query = 'SELECT * FROM defaultdb.templates WHERE company_id = ?;';
  const template_values = [session.user.company_id];
  const template_result = await query(template_query, template_values);

  return NextResponse.json(template_result, {status: 200});
}

