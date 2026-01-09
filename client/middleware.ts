import { NextResponse } from "next/server";

export function middleware() {
  // Skip middleware for now - let client-side handle auth redirects
  return NextResponse.next();
}

export const config = {
  matcher: ["/dashboard/:path*", "/tasks/:path*", "/login", "/signup"],
};
