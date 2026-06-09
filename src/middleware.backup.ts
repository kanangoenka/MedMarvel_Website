import { NextRequest, NextResponse } from "next/server";
import { verifyToken } from "@/lib/auth";

console.log("MIDDLEWARE RUNNING");

export async function middleware(req: NextRequest) {
  const token = req.cookies.get("token")?.value;
  const { pathname } = req.nextUrl;

  const isAuthPage = pathname === "/login";
  const isAdminRoute = pathname.startsWith("/admin");
  const isOperatorRoute = pathname.startsWith("/operator");
  const isClientRoute = pathname.startsWith("/client");
  const isViewerRoute = pathname.startsWith("/viewer");
  const isDashboardRoute = pathname.startsWith("/dashboard");
  const isRootRoute = pathname === "/";

  const isProtectedRoute =
    isAdminRoute ||
    isOperatorRoute ||
    isClientRoute ||
    isViewerRoute ||
    isDashboardRoute ||
    isRootRoute;

  if (isProtectedRoute) {
    if (!token) {
      if (isAuthPage) {
        return NextResponse.next();
      }
      return NextResponse.redirect(new URL("/login", req.url));
    }

    const verified = await verifyToken(token);

    if (!verified) {
      // Clear invalid token cookie and redirect to login
      const response = NextResponse.redirect(new URL("/login", req.url));
      response.cookies.delete("token");
      return response;
    }

    const role = verified.role as string;

    const getRoleHomepage = (role: string) => {
  switch (role) {
    case "SUPER_ADMIN":
      return "/super-admin";

    case "INSTITUTION_MANAGER":
      return "/institution-manager";

    case "SITE_ADMIN":
      return "/site-admin";

    case "OPERATION_HEAD":
      return "/operation-head";

    case "OPERATOR":
      return "/operator";

    case "TECHNICIAN":
      return "/technician";

    case "DOCTOR":
      return "/doctor";

    default:
      return "/login";
  }
};

    const homepage = getRoleHomepage(role);

    // Redirect root page or generic /dashboard route to the role-specific homepage
    if (isRootRoute || isDashboardRoute) {
      return NextResponse.redirect(new URL(homepage, req.url));
    }

    // Role access authorization check
    if (isAdminRoute && role !== "ADMIN") {
      return NextResponse.redirect(new URL(homepage, req.url));
    }

    if (isOperatorRoute && role !== "OPERATOR") {
      return NextResponse.redirect(new URL(homepage, req.url));
    }

    if (isClientRoute && role !== "CLIENT") {
      return NextResponse.redirect(new URL(homepage, req.url));
    }
  }

  // Prevent logged-in users from visiting login page
  if (isAuthPage && token) {
    const verified = await verifyToken(token);
    if (verified) {
      const role = verified.role as string;
      const homepage =
        role === "ADMIN"
          ? "/admin"
          : role === "OPERATOR"
          ? "/operator/dashboard"
          : "/client/dashboard";
      return NextResponse.redirect(new URL(homepage, req.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/",
    "/login",
    "/admin/:path*",
    "/operator/:path*",
    "/client/:path*",
    "/viewer/:path*",
    "/dashboard/:path*",
  ],
};