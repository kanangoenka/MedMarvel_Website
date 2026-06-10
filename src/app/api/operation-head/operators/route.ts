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

    const assignedSites =
      await prisma.operationHeadSiteAssignment.findMany(
        {
          where: {
            operationHeadId:
              currentUser.id,
          },
        }
      );

    const siteIds =
      assignedSites.map(
        (site) => site.siteId
      );

    const operators =
      await prisma.user.findMany({
        where: {
          role: "OPERATOR",

          operatorAssignments: {
            some: {
              siteId: {
                in: siteIds,
              },
            },
          },
        },

        select: {
          id: true,
          name: true,
          email: true,
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