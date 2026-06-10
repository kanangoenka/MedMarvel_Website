import { NextResponse } from "next/server";

import prisma from "@/lib/prisma";

import { getCurrentUser } from "@/lib/current-user";
import { isSuperAdmin } from "@/lib/permissions";

export async function GET() {
  try {
    const currentUser =
      await getCurrentUser();

    if (
      !currentUser ||
      !isSuperAdmin(
        currentUser.role
      )
    ) {
      return NextResponse.json(
        {
          error: "Unauthorized",
        },
        {
          status: 401,
        }
      );
    }

    const [
      institutions,
      sites,
      users,
    ] = await Promise.all([
      prisma.institution.count(),
      prisma.site.count(),
      prisma.user.count(),
    ]);

    return NextResponse.json({
      institutions,
      sites,
      users,
    });
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      {
        error:
          "Failed to load dashboard",
      },
      {
        status: 500,
      }
    );
  }
}