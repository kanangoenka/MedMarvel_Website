import { NextResponse } from "next/server";

import prisma from "@/lib/prisma";
import { hashPassword } from "@/lib/hash";

import { getCurrentUser } from "@/lib/current-user";
import { canCreateSiteAdmin } from "@/lib/permissions";

import { UserRole } from "@prisma/client";

export async function POST(req: Request) {
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
      !canCreateSiteAdmin(
        currentUser.role
      )
    ) {
      return NextResponse.json(
        { error: "Forbidden" },
        { status: 403 }
      );
    }

    const body = await req.json();

    const {
      name,
      email,
      password,
      siteId,
    } = body;

    if (
      !name ||
      !email ||
      !password ||
      !siteId
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

    const existingUser =
      await prisma.user.findUnique({
        where: {
          email,
        },
      });

    if (existingUser) {
      return NextResponse.json(
        {
          error:
            "Email already exists",
        },
        {
          status: 400,
        }
      );
    }

    const site =
      await prisma.site.findUnique({
        where: {
          id: siteId,
        },
      });

    if (!site) {
      return NextResponse.json(
        {
          error: "Site not found",
        },
        {
          status: 404,
        }
      );
    }

    const hashedPassword =
      await hashPassword(
        password
      );

    const siteAdmin =
      await prisma.user.create({
        data: {
          name: name.trim(),

          email: email
            .trim()
            .toLowerCase(),

          password:
            hashedPassword,

          role:
            UserRole.SITE_ADMIN,

          siteId: site.id,

          institutionId:
            site.institutionId,
        },
      });

    return NextResponse.json({
      success: true,

      user: {
        id: siteAdmin.id,
        name: siteAdmin.name,
        email: siteAdmin.email,
      },
    });
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      {
        error:
          "Failed to create site admin",
      },
      {
        status: 500,
      }
    );
  }
}