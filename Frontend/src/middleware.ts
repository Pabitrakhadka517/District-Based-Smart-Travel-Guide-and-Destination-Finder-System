import { NextRequest, NextResponse } from "next/server";

// Routes that require an authenticated user
const PROTECTED = ["/dashboard", "/profile", "/settings", "/wishlist", "/planner", "/tracking"];
// Routes that require admin role
const ADMIN_ONLY = ["/admin"];

export function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  // Read lightweight session cookies set by the frontend JS on login/logout.
  // These are NOT security tokens — actual API security relies on the Bearer JWT.
  // The cookies exist purely so this middleware can make redirect decisions.
  const session = req.cookies.get("nepayatra_session")?.value;
  const role = req.cookies.get("nepayatra_role")?.value;

  const isLoggedIn = session === "1";
  const isAdmin = role === "admin";

  // Note: bouncing an already-logged-in user away from /login and /register
  // is handled client-side (AuthOnlyGuard) instead of here, since this cookie
  // can outlive the actual session (e.g. a backend reseed invalidates the
  // token but not this cookie) and a middleware redirect would trap them.

  // Protect user-only routes
  if (PROTECTED.some((p) => pathname.startsWith(p)) && !isLoggedIn) {
    const url = req.nextUrl.clone();
    url.pathname = "/login";
    url.searchParams.set("redirect", pathname);
    return NextResponse.redirect(url);
  }

  // Protect admin routes
  if (ADMIN_ONLY.some((p) => pathname.startsWith(p))) {
    if (!isLoggedIn) {
      const url = req.nextUrl.clone();
      url.pathname = "/login";
      url.searchParams.set("redirect", pathname);
      return NextResponse.redirect(url);
    }
    if (!isAdmin) {
      return NextResponse.redirect(new URL("/dashboard", req.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/dashboard/:path*",
    "/profile/:path*",
    "/settings/:path*",
    "/wishlist/:path*",
    "/planner/:path*",
    "/tracking/:path*",
    "/admin/:path*"
  ]
};
