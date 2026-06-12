import { NextResponse } from "next/server";

import prisma from "@/lib/prisma";

import { getCurrentUser } from "@/lib/current-user";
import { isSiteAdmin } from "@/lib/permissions";

export async function DELETE(
  req: Request,
  {
    params,
  }: {
    params: Promise<{
      id: string;
    }>;
  }
) {
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

    if (
      !isSiteAdmin(
        currentUser.role
      )
    ) {
      return NextResponse.json(
        {
          error: "Forbidden",
        },
        {
          status: 403,
        }
      );
    }

    const { id } =
      await params;

    const technician =
      await prisma.user.findFirst({
        where: {
          id,
          role: "TECHNICIAN",
          siteId:
            currentUser.siteId,
        },
      });

    if (!technician) {
      return NextResponse.json(
        {
          error:
            "Technician not found",
        },
        {
          status: 404,
        }
      );
    }

    await prisma.user.delete({
      where: {
        id,
      },
    });

    return NextResponse.json({
      success: true,
    });
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      {
        error:
          "Failed to delete technician",
      },
      {
        status: 500,
      }
    );
  }
}