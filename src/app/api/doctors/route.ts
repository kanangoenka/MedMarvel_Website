import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { getCurrentUser } from "@/lib/current-user";

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

    if (!currentUser.siteId) {
      return NextResponse.json(
        {
          error:
            "User is not assigned to a site",
        },
        {
          status: 400,
        }
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