import { NextResponse } from "next/server";

import prisma from "@/lib/prisma";

import { getCurrentUser } from "@/lib/current-user";

export async function GET(
  req: Request
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

    const { searchParams } =
      new URL(req.url);

    const institutionId =
      searchParams.get(
        "institutionId"
      );

    const sites =
      await prisma.site.findMany({
        where: institutionId
          ? {
              institutionId,
            }
          : undefined,

        include: {
          institution: true,
        },

        orderBy: {
          name: "asc",
        },
      });

    return NextResponse.json(
      sites
    );
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      {
        error:
          "Failed to fetch sites",
      },
      {
        status: 500,
      }
    );
  }
}