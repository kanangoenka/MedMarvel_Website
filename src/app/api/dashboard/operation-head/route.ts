import { NextResponse } from "next/server";

import prisma from "@/lib/prisma";

import { getCurrentUser } from "@/lib/current-user";
import { isOperationHead } from "@/lib/permissions";

export async function GET() {
  try {
    const currentUser =
      await getCurrentUser();

    if (
      !currentUser ||
      !isOperationHead(
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

    const sites =
      await prisma.operationHeadSiteAssignment.count(
        {
          where: {
            operationHeadId:
              currentUser.id,
          },
        }
      );

    const operators =
      await prisma.user.count({
        where: {
          role: "OPERATOR",

          operatorAssignments: {
            some: {
              site: {
                operationHeadAssignments:
                  {
                    some: {
                      operationHeadId:
                        currentUser.id,
                    },
                  },
              },
            },
          },
        },
      });

    return NextResponse.json({
      sites,
      operators,
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