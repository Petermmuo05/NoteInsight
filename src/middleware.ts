import { auth } from "@/app/_lib/auth";

export default auth(async function middleware(req) {
  console.log("This is the req auth", req.auth, "  middleware is running");
  if (
    !req.auth ||
    req.auth.error === "TokenExpired" ||
    req.auth.error === "TokenInvalid"
  ) {
    if (req.nextUrl.pathname !== "/login") {
      const newUrl = new URL("/login", req.nextUrl.origin);
      return Response.redirect(newUrl);
    }
  }
});

export const config = {
  matcher: ["/dashboard", "/note/:path*"],
};
