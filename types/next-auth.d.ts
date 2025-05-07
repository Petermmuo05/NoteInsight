// eslint-disable-next-line @typescript-eslint/no-unused-vars
import NextAuth from "next-auth";

declare module "next-auth" {
  interface Session {
    user: {
      id: string | null | undefined;
      username: string | null | undefined;
      email: string | null | undefined;
    };
    accessToken: string;
  }
}
