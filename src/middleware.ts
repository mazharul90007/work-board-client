import { NextRequest, NextResponse } from "next/server";

// Public pages that do NOT require login
const authRoutes = ["/", "/signup"];
const publicRoutes = ["/contact"];

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Get token from cookie
  const token = request.cookies.get("accessToken")?.value;

  const isAuthRoute = authRoutes.includes(pathname);
  const isPublicRoute = publicRoutes.some((route) =>
    pathname.startsWith(route),
  );

  // If logged in and hitting "/" or "/signup", go to dashboard
  if (token && isAuthRoute) {
    const response = NextResponse.redirect(new URL("/dashboard", request.url));
    // Force the browser to clear cache for this request
    response.headers.set("x-middleware-cache", "no-cache");
    return response;
  }

  // If not logged in and trying to access to private route
  if (!token && !isAuthRoute && !isPublicRoute) {
    return NextResponse.redirect(new URL("/", request.url));
  }

  // 3️⃣ Otherwise, allow access
  return NextResponse.next();
}

// Apply middleware to all routes except static files, API, favicon, etc.
export const config = {
  matcher: [
    "/", // Explicitly match root
    "/signup", // Explicitly match signup
    "/dashboard/:path*",
  ],
};
