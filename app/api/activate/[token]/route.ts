import {query} from "@/database";
import {NextRequest, NextResponse} from "next/server";
import {redirect} from "next/navigation";

export async function GET(request: NextRequest, {params}: {params:{token: string}}) {
  const {token} = params;
  const now:Date = new Date
  const formattedDate:string = now.toISOString().replace('T', ' ').substring(0, 19);
  // get matched token where it has not been activated yet and the time that it was activated at was less than x time
  // this is placing the larger load on server side even though its not that much but still should ideally improve load
  // times for user even if its negligible

  // will deal with the activated less than x time ago later;
  const sql = 'SELECT * FROM defaultdb.activate_token WHERE token=? AND activated_at IS NULL LIMIT 1;';
  const params_sql = [token];
  const result = await query(sql, params_sql);
  if (result.length !== 0) {
    const write_token_sql = 'UPDATE defaultdb.activate_token SET activated_at=? WHERE token=?;';
    const token_params = [formattedDate, token];
    console.log(formattedDate, token, write_token_sql);
    const token_result = await query(write_token_sql, token_params);

    const write_user_sql = 'UPDATE defaultdb.users SET active=? WHERE id=?;';
    const user_params = [true, result[0].user_id];
    const user_result = await query(write_user_sql, user_params);
    console.log(token_result, user_result);

    if (token_result.affectedRows > 0 && user_result.affectedRows > 0) {
      // also want to pass through some kind of message so that it will display as like a popup kind of thing to say
      // that the email has now been verified.
      redirect('/login');
      return NextResponse.json({ user_id: result[0].user_id }, {status: 200});
    }
  }
  // will need to redirect to a error page in some way
  return NextResponse.json({ error: 'Database error' }, {status: 500});
}
