import { NextResponse } from "next/server";

import prisma from "@/lib/prisma";
import { hashPassword } from "@/lib/hash";

import { getCurrentUser } from "@/lib/current-user";
import { isSiteAdmin } from "@/lib/permissions";

export async function PATCH(
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

    const { id } =
      await params;

    const body =
      await req.json();

    const {
      name,
      email,
      password,
    } = body;

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

    const data: any = {
      name,
      email,
    };

    if (
      password &&
      password.trim()
    ) {
      data.password =
        await hashPassword(
          password
        );
    }

    await prisma.user.update({
      where: {
        id,
      },
      data,
    });

    return NextResponse.json({
      success: true,
    });
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      {
        error:
          "Failed to update technician",
      },
      {
        status: 500,
      }
    );
  }
}