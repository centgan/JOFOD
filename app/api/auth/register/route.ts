import {NextResponse} from "next/server";
import {hash} from "bcrypt";
import { query } from '@/database';

export async function POST(request: Request) {
  try {
    const {username, email, password} = await request.json();
    console.log({username, email, password});
    // need to deal with hashed password might write my own thing though since pretty sure bcrypt was deprecated
    // const hashedPassword = await hash(password, 10);

    // need to deal with sql injection attack

    // need to check if user exists already, yes you could just get an error from the sql query but better to do it
    // this way

    // need to create unique id for each user, don't want to user autoincrement

    // insert user into database
    const sql = 'INSERT defaultdb.users (user_id, username, email, password) VALUES (?, ?, ?, ?);';
    const params = [2, username, email, password];
    const results = await query(sql, params);
    console.log(results);
  } catch (e) {
    console.log(e);
  }
  return NextResponse.json({status: 200});
}
