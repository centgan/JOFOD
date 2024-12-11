import {getServerSession} from "next-auth";
import {authOptions} from "@/app/api/auth/[...nextauth]/route";
import {query} from "@/database";
import {NextResponse} from "next/server";

async function getSessionObject() {
  const session = await getServerSession(authOptions);
  if (!session) {
    throw new Error('Unauthorized');
  } else if (session.user.userType.toLowerCase() !== 'employee') {
    throw new Error('Wrong userType');
  }
  return session;
}

export async function GET() {
  const session = await getSessionObject();
  const user_id = session.user.id;
  try {
    const sql_applied = 'SELECT * FROM defaultdb.applied_jobs WHERE user_id = ? ORDER BY saved_at;';
    const applied_params = [user_id];
    const applied_res = await query(sql_applied, applied_params);

    const sql_saved = 'SELECT * FROM defaultdb.saved_jobs WHERE user_id = ? ORDER BY saved_at;';
    const saved_params = [user_id];
    const saved_res = await query(sql_saved, saved_params);

    return NextResponse.json([applied_res, saved_res], {status: 200});
  } catch (e) {
    return NextResponse.json({error: e}, {status: 500});
  }
}
