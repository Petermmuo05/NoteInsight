/* eslint-disable @typescript-eslint/no-explicit-any */
/* app/_lib/auth.ts */
import axios from "axios";
import NextAuth, { Session } from "next-auth";
import Credentials from "next-auth/providers/credentials";
import { User } from "./definitions";
import { JWT } from "next-auth/jwt";
import { jwtDecode } from "jwt-decode";

interface JwtPayload {
  exp: number;
  [key: string]: any;
}

const authConfig = {
  providers: [
    Credentials({
      credentials: {
        email: { label: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials) return null;
        try {
          const { data } = await axios.post<User>(
            `${process.env.NEXT_PUBLIC_API_URL}/login`,
            {
              email: credentials.email,
              password: credentials.password,
            }
          );
          return data; // { id, firstName, email, token }
        } catch (e) {
          console.error("Authentication error:", e);
          return null;
        }
      },
    }),
  ],
  session: {
    strategy: "jwt",
    maxAge: 30 * 24 * 60 * 60, // 30 days
  },
  callbacks: {
    /**
     * Runs on sign-in and on each subsequent request.
     * We store the API’s JWT on first sign-in (when `user` is defined),
     * then on every call we re-decode it and check expiry.
     */
    async jwt({
      token,
      user,
      session,
      trigger,
    }: {
      token: JWT;
      user?: User;
      session: Session;
      trigger: "update" | "signIn" | "jwt" | "session";
    }): Promise<JWT> {
      // First time: set the API JWT onto the token
      if (user) {
        token.id = user.id;
        token.name = user.firstName;
        token.email = user.email;
        token.image = user.image;
        token.accessToken = user.token;
        token.noPromptTill = user.noPromptTill;
      }

      // On every call: validate expiry
      if (token.accessToken) {
        try {
          const { exp } = jwtDecode<JwtPayload>(token.accessToken as string);
          // exp is in seconds
          if (Date.now() >= exp * 1000) {
            // mark it expired
            token.error = "TokenExpired";
          }
          // eslint-disable-next-line @typescript-eslint/no-unused-vars
        } catch (_err) {
          // decoding failed → treat as expired/invalid
          token.error = "TokenInvalid";
        }
      }
      if (trigger === "update" && session) {
        console.log(session, "update from jwt callback");
        if (session.user?.username) token.name = session.user.username;
        if (session.user?.email) token.email = session.user.email;
        if (session.user?.image) token.image = session.user.image;
        if (session.user?.noPromptTill)
          token.noPromptTill = session.user.noPromptTill;
        if (session.accessToken) token.accessToken = session.accessToken; // Handle new token
      }

      return token;
    },

    /**
     * Send the `error` flag to the client in the session object.
     * On the client you can do:
     *   const { data: session } = useSession();
     *   if (session?.error === "TokenExpired") signIn();
     */
    async session({
      session,
      token,
    }: {
      session: Session;
      token: JWT;
    }): Promise<Session> {
      // Standard user props
      session.user = {
        id: token.id as string,
        username: token.name as string,
        image: token.image as string,
        email: token.email as string,
        noPromptTill: token.noPromptTill as string | null | undefined,
      };
      // Pass through accessToken for fetch() calls
      (session as any).accessToken = token.accessToken;
      // Bubble up any JWT errors
      (session as any).error = token.error;
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
