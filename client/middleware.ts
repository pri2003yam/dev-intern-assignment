import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  // Skip middleware for now - let client-side handle auth redirects
  return NextResponse.next();
}

export const config = {
  matcher: ["/dashboard/:path*", "/tasks/:path*", "/login", "/signup"],
};
