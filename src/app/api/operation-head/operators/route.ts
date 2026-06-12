import { NextResponse } from "next/server";

import prisma from "@/lib/prisma";

import { getCurrentUser } from "@/lib/current-user";
import { isOperationHead } from "@/lib/permissions";

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
      !isOperationHead(
        currentUser.role
      )
    ) {
      return NextResponse.json(
        { error: "Forbidden" },
        { status: 403 }
      );
    }

    const operators =
  await prisma.user.findMany({
    where: {
      role: "OPERATOR",
    },

    select: {
      id: true,
      name: true,
      email: true,

      operatorAssignments: {
        include: {
          site: {
            select: {
              id: true,
              name: true,
            },
          },
        },
      },
    },

    orderBy: {
      name: "asc",
    },
  });

    return NextResponse.json(
      operators
    );
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      {
        error:
          "Failed to fetch operators",
      },
      {
        status: 500,
      }
    );
  }
}