import { NextResponse } from "next/server";

import prisma from "@/lib/prisma";

import { getCurrentUser } from "@/lib/current-user";
import { isSiteAdmin } from "@/lib/permissions";

export async function GET() {
  try {
    const currentUser =
      await getCurrentUser();

    if (!currentUser) {
      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 401 }
      );
    }

    if (
      !isSiteAdmin(
        currentUser.role
      )
    ) {
      return NextResponse.json(
        { error: "Forbidden" },
        { status: 403 }
      );
    }

    const doctors =
      await prisma.user.findMany({
        where: {
          role: "DOCTOR",
          siteId:
            currentUser.siteId,
        },

        orderBy: {
          name: "asc",
        },

        select: {
          id: true,
          name: true,
          email: true,
        },
      });

    return NextResponse.json(
      doctors
    );
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      {
        error:
          "Failed to fetch doctors",
      },
      {
        status: 500,
      }
    );
  }
}