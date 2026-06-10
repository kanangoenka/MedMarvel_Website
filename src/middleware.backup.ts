import { NextRequest, NextResponse } from "next/server";

import { verifyToken } from "@/lib/auth";

export async function middleware(
  request: NextRequest
) {
  const token =
    request.cookies.get("token")
      ?.value;

  const pathname =
    request.nextUrl.pathname;

  // Public Routes

  if (
    pathname === "/login" ||
    pathname.startsWith("/api/auth")
  ) {
    return NextResponse.next();
  }

  // Not logged in

  if (!token) {
    return NextResponse.redirect(
      new URL(
        "/login",
        request.url
      )
    );
  }

  const payload =
    await verifyToken(token);

  if (!payload) {
    return NextResponse.redirect(
      new URL(
        "/login",
        request.url
      )
    );
  }

  const role =
    payload.role as string;

  // SUPER ADMIN

  if (
    pathname.startsWith(
      "/super-admin"
    )
  ) {
    if (
      role !==
      "SUPER_ADMIN"
    ) {
      return NextResponse.redirect(
        new URL(
          "/login",
          request.url
        )
      );
    }
  }

  // INSTITUTION MANAGER

  if (
    pathname.startsWith(
      "/institution-manager"
    )
  ) {
    if (
      role !==
      "INSTITUTION_MANAGER"
    ) {
      return NextResponse.redirect(
        new URL(
          "/login",
          request.url
        )
      );
    }
  }

  // SITE ADMIN

  if (
    pathname.startsWith(
      "/site-admin"
    )
  ) {
    if (
      role !==
      "SITE_ADMIN"
    ) {
      return NextResponse.redirect(
        new URL(
          "/login",
          request.url
        )
      );
    }
  }

  // OPERATION HEAD

  if (
    pathname.startsWith(
      "/operation-head"
    )
  ) {
    if (
      role !==
      "OPERATION_HEAD"
    ) {
      return NextResponse.redirect(
        new URL(
          "/login",
          request.url
        )
      );
    }
  }

  // OPERATOR

  if (
    pathname.startsWith(
      "/operator"
    )
  ) {
    if (
      role !== "OPERATOR"
    ) {
      return NextResponse.redirect(
        new URL(
          "/login",
          request.url
        )
      );
    }
  }

  // DOCTOR

  if (
    pathname.startsWith(
      "/doctor"
    )
  ) {
    if (
      role !== "DOCTOR"
    ) {
      return NextResponse.redirect(
        new URL(
          "/login",
          request.url
        )
      );
    }
  }

  // TECHNICIAN

  if (
    pathname.startsWith(
      "/technician"
    )
  ) {
    if (
      role !==
      "TECHNICIAN"
    ) {
      return NextResponse.redirect(
        new URL(
          "/login",
          request.url
        )
      );
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/super-admin/:path*",
    "/institution-manager/:path*",
    "/site-admin/:path*",
    "/operation-head/:path*",
    "/operator/:path*",
    "/doctor/:path*",
    "/technician/:path*",
  ],
};