import { NextResponse } from "next/server";

import prisma from "@/lib/prisma";

import { getCurrentUser } from "@/lib/current-user";
import { isOperationHead } from "@/lib/permissions";

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
      !isOperationHead(
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

    const operator =
      await prisma.user.findFirst({
        where: {
          id,
          role: "OPERATOR",
        },
      });

    if (!operator) {
      return NextResponse.json(
        {
          error:
            "Operator not found",
        },
        {
          status: 404,
        }
      );
    }

    await prisma.operatorSiteAssignment.deleteMany(
      {
        where: {
          operatorId: id,
        },
      }
    );

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
          "Failed to delete operator",
      },
      {
        status: 500,
      }
    );
  }
}