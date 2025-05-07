/* eslint-disable @typescript-eslint/no-explicit-any */
import axios from "axios";
import NextAuth, { Account, Session } from "next-auth";
import Credentials from "next-auth/providers/credentials";
import { User } from "./definitions";
import { JWT } from "next-auth/jwt";
const authConfig = {
  providers: [
    Credentials({
      credentials: {
        email: { label: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        try {
          if (!credentials) return null;
          console.log(`${process.env.NEXT_PUBLIC_API_URL}/login`);
          const response = await axios.post<User>(
            `${process.env.NEXT_PUBLIC_API_URL}/login`,
            {
              email: credentials?.email,
              password: credentials?.password,
            }
          );

          return response.data;
        } catch (error) {
          console.error("Authentication error:", error);
          return null;
        }
      },
    }),
  ],
  callbacks: {
    authorized({ auth }: { auth: { user?: User } }) {
      console.log("auth", auth);
      return !!auth?.user;
    },
    // eslint-disable-next-line @typescript-eslint/no-unused-vars, @typescript-eslint/no-explicit-any
    async jwt({
      token,
      user,
      // eslint-disable-next-line @typescript-eslint/no-unused-vars,
      account,
    }: {
      token: JWT;
      user?: User;
      account?: Account | null;
    }) {
      if (user) {
        console.log(user);
        token.id = user.id;
        token.name = (user as User).firstName;
        token.email = user.email;
        token.accessToken = user.token;
      }
      return token;
    },
    // eslint-disable-next-line @typescript-eslint/no-unused-vars, @typescript-eslint/no-explicit-any
    async session({ session, token }: { session: Session; token: JWT }) {
      session.user = {
        id: token.id as string,
        username: token.name,
        email: token.email,
      };
      (session as any).accessToken = (token as any).accessToken;
      return session;
    },
  },
  pages: {
    signIn: "/login",
  },
};
export const {
  auth,
  handlers: { GET, POST },
} = NextAuth(authConfig);
