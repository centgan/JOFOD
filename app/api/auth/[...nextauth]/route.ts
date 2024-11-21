import CredentialsProvider from "next-auth/providers/credentials";
import NextAuth, {NextAuthOptions} from "next-auth";
import {query} from "@/database";

export const authOptions: NextAuthOptions = {
  session: {
    strategy: 'jwt',
  },
  pages: {
    signIn: "/login",
  },
  callbacks: {
    async jwt({token, user, session, trigger}) {
      if (trigger === 'update' && session?.first_time !== undefined) {
        token.first_time = session.first_time;
      }
      if (user) {
        token.userType = user.userType;
        token.id = user.id;
        token.name = user.name;
        token.first_time = user.first_time;
        if (user.userType === 'Employer') token.company_id = user.company_id;
      }
      return token;
    },
    async session({session, token}) {
      if (token){
        session.user.userType = token.userType;
        session.user.name = token.name;
        session.user.id = token.id;
        session.user.first_time = token.first_time;
        if (token.userType === 'Employer') session.user.company_id = token.company_id;
      }
      return session;
    },
  },
  providers: [
    CredentialsProvider({
      credentials: {
        user: {},
        password: {}
      },
      async authorize(credentials) {
        // console.log(credentials);

        // wondering if this is really even necessary because I don't know if we're going to use a username
        // leaving it for now though
        const sql = 'SELECT * from defaultdb.users WHERE email=?;';
        const params = [credentials?.user];
        const results = await query(sql, params);
        console.log(results);

        // probably return different values and based on the returned value throw different errors on the ui
        // check if user exists
        if (results.length === 0) {
          throw new Error('User was not found.');
        }

        // will need to do hashing and shit as well again here
        if (credentials?.password !== results[0].password) {
          // console.log({id: results[0].user_id, username: results[0].username, email: results[0].email});
          throw new Error('Incorrect password.');
        }
        // check if user has been activated
        if (!results[0].active) {
          throw new Error('Inactive user. Please activate your account before logging in.');
        }
        return {
          id: results[0].id,
          email: results[0].email,
          name: results[0].first_name + ' ' + results[0].last_name,
          userType: results[0].is_employer ? 'Employer' : 'Employee',
          company_id: results[0].company_id,
          first_time: results[0].first_time,
        }
      }
    })
  ],
}

const handler = NextAuth(authOptions);

export {handler as GET, handler as POST}
