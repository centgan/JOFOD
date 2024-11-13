import CredentialsProvider from "next-auth/providers/credentials";
import NextAuth, {NextAuthOptions} from "next-auth";
import {query} from "@/database";
import {NextResponse} from "next/server";

export const authOptions: NextAuthOptions = {
  session: {
    strategy: 'jwt',
  },
  pages: {
    signIn: "/login",
  },
  callbacks: {
    async jwt({token, user}) {
      if (user) {
        token.userType = user.userType;
        token.first = user.first;
      }
      return token; // Return the modified token
    },
    async session({session, token}) {
      session.user.userType = token.userType; // Add role to the session object
      session.user.name = token.first;
      return session; // Return the modified session
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
          first: results[0].first,
          userType: results[0].is_employer ? 'Employer' : 'Employee',
        }
      }
    })
  ],
}

const handler = NextAuth(authOptions);

export {handler as GET, handler as POST}
