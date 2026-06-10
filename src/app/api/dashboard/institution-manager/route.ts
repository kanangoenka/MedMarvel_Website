import { NextResponse } from "next/server";

import prisma from "@/lib/prisma";

import { getCurrentUser } from "@/lib/current-user";
import { isInstitutionManager } from "@/lib/permissions";

export async function GET() {
  try {
    const currentUser =
      await getCurrentUser();

    if (
      !currentUser ||
      !isInstitutionManager(
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
      await prisma.site.count({
        where: {
          institutionId:
            currentUser.institutionId!,
        },
      });

    const studies =
      await prisma.study.count({
        where: {
          site: {
            institutionId:
              currentUser.institutionId!,
          },
        },
      });

    return NextResponse.json({
      sites,
      studies,
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