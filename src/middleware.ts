import { auth } from "@/app/_lib/auth";

export default auth(async function middleware(req) {
  // Your custom middleware logic goes here
  console.log("This is the req auth", "  middleware is running");
  if (!req.auth && req.nextUrl.pathname !== "/login") {
    const newUrl = new URL("/login", req.nextUrl.origin);
    return Response.redirect(newUrl);
  }
});

export const config = {
  matcher: ["/dashboard", "/note/:path*"],
};
