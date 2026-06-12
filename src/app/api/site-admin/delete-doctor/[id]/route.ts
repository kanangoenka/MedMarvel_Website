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

    const doctor =
      await prisma.user.findFirst({
        where: {
          id,
          role: "DOCTOR",
          siteId:
            currentUser.siteId,
        },
      });

    if (!doctor) {
      return NextResponse.json(
        {
          error:
            "Doctor not found",
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
          "Failed to delete doctor",
      },
      {
        status: 500,
      }
    );
  }
}