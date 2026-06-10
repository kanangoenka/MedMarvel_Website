import { NextResponse } from "next/server";

import prisma from "@/lib/prisma";

import { getCurrentUser } from "@/lib/current-user";
import { isSiteAdmin } from "@/lib/permissions";

export async function GET() {
  try {
    const currentUser =
      await getCurrentUser();

    if (
      !currentUser ||
      !isSiteAdmin(
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
      doctors,
      technicians,
      studies,
    ] = await Promise.all([
      prisma.user.count({
        where: {
          role: "DOCTOR",
          siteId:
            currentUser.siteId!,
        },
      }),

      prisma.user.count({
        where: {
          role: "TECHNICIAN",
          siteId:
            currentUser.siteId!,
        },
      }),

      prisma.study.count({
        where: {
          siteId:
            currentUser.siteId!,
        },
      }),
    ]);

    return NextResponse.json({
      doctors,
      technicians,
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