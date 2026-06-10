import { NextResponse } from "next/server";

import prisma from "@/lib/prisma";
import { getCurrentUser } from "@/lib/current-user";

export async function GET() {
  try {
    const currentUser =
      await getCurrentUser();

    if (!currentUser) {
      return NextResponse.json(
        {
          error: "Unauthorized",
        },
        {
          status: 401,
        }
      );
    }

    let where: any = {};

    switch (currentUser.role) {
      case "SUPER_ADMIN":
        where = {};
        break;

      case "INSTITUTION_MANAGER":
        where = {
          site: {
            institutionId:
              currentUser.institutionId!,
          },
        };
        break;

      case "SITE_ADMIN":
        where = {
          siteId:
            currentUser.siteId!,
        };
        break;

      case "DOCTOR":
        where = {
          doctorId:
            currentUser.id,
        };
        break;

      case "TECHNICIAN":
        where = {
          uploadedById:
            currentUser.id,
        };
        break;

      case "OPERATION_HEAD": {
        const assignments =
          await prisma.operationHeadSiteAssignment.findMany(
            {
              where: {
                operationHeadId:
                  currentUser.id,
              },
            }
          );

        const siteIds =
          assignments.map(
            (assignment) =>
              assignment.siteId
          );

        where = {
          siteId: {
            in: siteIds,
          },
        };

        break;
      }

      case "OPERATOR": {
        const assignments =
          await prisma.operatorSiteAssignment.findMany(
            {
              where: {
                operatorId:
                  currentUser.id,
              },
            }
          );

        const siteIds =
          assignments.map(
            (assignment) =>
              assignment.siteId
          );

        where = {
          siteId: {
            in: siteIds,
          },
        };

        break;
      }

      default:
        return NextResponse.json(
          {
            error:
              "Invalid role",
          },
          {
            status: 403,
          }
        );
    }

    const studies =
      await prisma.study.findMany({
        where,

        include: {
          patient: true,

          doctor: {
            select: {
              id: true,
              name: true,
              email: true,
            },
          },

          technician: {
            select: {
              id: true,
              name: true,
              email: true,
            },
          },

          operator: {
            select: {
              id: true,
              name: true,
              email: true,
            },
          },

          site: {
            select: {
              id: true,
              name: true,
            },
          },

          files: true,

          report: true,
        },

        orderBy: {
          createdAt: "desc",
        },
      });

    return NextResponse.json(
      studies
    );
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      {
        error:
          "Failed to fetch worklist",
      },
      {
        status: 500,
      }
    );
  }
}