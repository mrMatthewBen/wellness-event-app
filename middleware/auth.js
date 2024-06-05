import { verifyToken } from "../utils/auth";
import { NextResponse } from "next/server";

export function middleware(req) {
  const token = req.cookies.token;

  if (token) {
    const decodedToken = verifyToken(token);
    if (decodedToken) {
      const role = decodedToken.role;

      if (role === "admin") {
        return NextResponse.redirect(
          new URL("/dashboard/admin/createEvent", req.url)
        );
      } else if (role === "vendor") {
        return NextResponse.redirect(
          new URL("/dashboard/vendor/events", req.url)
        );
      }
    }
  }

  return NextResponse.redirect(new URL("/login", req.url));
}

export const config = {
  matcher: ["/"],
};
