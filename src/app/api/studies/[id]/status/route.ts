import { NextResponse } from "next/server";

import prisma from "@/lib/prisma";
import { getCurrentUser } from "@/lib/current-user";

import { StudyStatus } from "@prisma/client";

export async function PATCH(
  request: Request,
  context: any
) {
  try {
    const user =
      await getCurrentUser();

    if (!user) {
      return NextResponse.json(
        {
          error: "Unauthorized",
        },
        {
          status: 401,
        }
      );
    }

    const { id } =
      await context.params;

    const body =
      await request.json();

    const { status } = body;

    if (
      !Object.values(
        StudyStatus
      ).includes(status)
    ) {
      return NextResponse.json(
        {
          error:
            "Invalid status",
        },
        {
          status: 400,
        }
      );
    }

    const study =
      await prisma.study.update({
        where: {
          id,
        },

        data: {
          status,
        },
      });

    return NextResponse.json(
      study
    );
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      {
        error:
          "Failed to update status",
      },
      {
        status: 500,
      }
    );
  }
}