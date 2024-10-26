import CredentialsProvider from "next-auth/providers/credentials";
import NextAuth from "next-auth";
import {query} from "@/database";

const handler = NextAuth({
  session: {
    strategy: 'jwt',
  },
  pages: {
    signIn: "/login",
  },
  providers: [
    CredentialsProvider({
      credentials: {
        user: {},
        password: {}
      },
      async authorize(credentials, req) {
        // console.log({credentials});

        // wondering if this is really even necessary because I don't know if we're going to use a username
        // leaving it for now though
        const isEmail = credentials?.user.includes('@');
        const sql = isEmail ?
          'SELECT * from defaultdb.users WHERE email=?;' :
          'SELECT * from defaultdb.users WHERE username=?;';
        const params = [credentials?.user];
        const results = await query(sql, params);

        if (results.length === 0) {
          return null;
        }

        if (credentials?.password === results[0].password) {
          // console.log({id: results[0].user_id, username: results[0].username, email: results[0].email});
          return {
            id: results[0].user_id,
            username: results[0].username,
            email: results[0].email,
          }
        }
        return null;
      }
    })
  ],
})

export {handler as GET, handler as POST}
