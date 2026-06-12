import { NextResponse } from "next/server";

import prisma from "@/lib/prisma";
import { hashPassword } from "@/lib/hash";

import { getCurrentUser } from "@/lib/current-user";
import { isOperationHead } from "@/lib/permissions";

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
      !isOperationHead(
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
      siteIds,
    } = body;

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

    await prisma.$transaction(
      async (tx) => {
        await tx.user.update({
          where: { id },
          data,
        });

        await tx.operatorSiteAssignment.deleteMany(
          {
            where: {
              operatorId: id,
            },
          }
        );

        if (
          siteIds &&
          siteIds.length > 0
        ) {
          await tx.operatorSiteAssignment.createMany(
            {
              data:
                siteIds.map(
                  (
                    siteId: string
                  ) => ({
                    operatorId:
                      id,
                    siteId,
                  })
                ),
            }
          );
        }
      }
    );

    return NextResponse.json({
      success: true,
    });
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      {
        error:
          "Failed to update operator",
      },
      {
        status: 500,
      }
    );
  }
}