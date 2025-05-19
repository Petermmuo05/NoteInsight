import { jwtDecode } from "jwt-decode";

interface JwtPayload {
  exp: number;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [key: string]: any;
}

export function isTokenExpired(token: string): boolean {
  try {
    const { exp } = jwtDecode<JwtPayload>(token);
    if (!exp) return true;
    return Date.now() >= exp * 1000;
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
  } catch (e) {
    return true; // Invalid or unreadable token
  }
}
