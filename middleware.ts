import { NextRequest, NextResponse } from "next/server";

// Public pages that do NOT require login
const publicRoutes = ["/", "/contact", "/signup"];

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Get token from cookie
  const token = request.cookies.get("accessToken")?.value;

  const isPublic = publicRoutes.some((route) => pathname.startsWith(route));

  // 1️⃣ If user is NOT logged in and tries to access a private route
  if (!token && !isPublic) {
    return NextResponse.redirect(new URL("/", request.url));
  }

  // 2️⃣ If user IS logged in and tries to access login page
  if (token && pathname === "/") {
    return NextResponse.redirect(new URL("/dashboard", request.url));
  }

  // 3️⃣ Otherwise, allow access
  return NextResponse.next();
}

// Apply middleware to all routes except static files, API, favicon, etc.
export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};
