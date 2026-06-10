import { NextResponse } from "next/server";

import prisma from "@/lib/prisma";

import { getCurrentUser } from "@/lib/current-user";
import { canCreateSite } from "@/lib/permissions";

export async function POST(req: Request) {
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
      !canCreateSite(
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

    const body = await req.json();

    const {
      siteName,
      institutionId,
    } = body;

    if (
      !siteName ||
      !institutionId
    ) {
      return NextResponse.json(
        {
          error:
            "All fields are required",
        },
        {
          status: 400,
        }
      );
    }

    const institution =
      await prisma.institution.findUnique(
        {
          where: {
            id: institutionId,
          },
        }
      );

    if (!institution) {
      return NextResponse.json(
        {
          error:
            "Institution not found",
        },
        {
          status: 404,
        }
      );
    }

    const existingSite =
      await prisma.site.findFirst({
        where: {
          name:
            siteName.trim(),
          institutionId,
        },
      });

    if (existingSite) {
      return NextResponse.json(
        {
          error:
            "Site already exists in this institution",
        },
        {
          status: 400,
        }
      );
    }

    const site =
      await prisma.site.create({
        data: {
          name:
            siteName.trim(),

          institutionId,
        },
      });

    return NextResponse.json({
      success: true,

      site: {
        id: site.id,
        name: site.name,
        institutionId:
          site.institutionId,
      },
    });
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      {
        error:
          "Failed to create site",
      },
      {
        status: 500,
      }
    );
  }
}