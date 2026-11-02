import { auth } from "./lib/auth";
import { NextResponse } from "next/server";

export const proxy = auth((request) => {
  const isLoggedIn = !!request.auth;
  const role = request.auth?.user?.role;

  const pathname = request.nextUrl.pathname;

  const isAdminRoute = pathname.startsWith("/admin");

  if (!isLoggedIn) {
    return NextResponse.redirect(new URL("/auth/login", request.url));
  }

  if (isAdminRoute && role !== "ADMIN") {
    return NextResponse.redirect(new URL("/home", request.url));
  }

  return NextResponse.next();
});

export const config = {
  matcher: ["/user/:path*", "/admin/:path*"],
};
