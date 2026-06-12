import { NextResponse } from "next/server";

import prisma from "@/lib/prisma";
import { hashPassword } from "@/lib/hash";

import { getCurrentUser } from "@/lib/current-user";
import { canCreateTechnician } from "@/lib/permissions";

import { UserRole } from "@prisma/client";

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
      !canCreateTechnician(
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
      name,
      email,
      password,
    } = body;

    if (
      !name ||
      !email ||
      !password
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

    const hashedPassword =
      await hashPassword(
        password
      );

    const technician =
      await prisma.user.create({
        data: {
          name: name.trim(),

          email: email
            .trim()
            .toLowerCase(),

          password:
            hashedPassword,

          role:
            UserRole.TECHNICIAN,

          siteId:
            currentUser.siteId,

          institutionId:
            currentUser.institutionId,
        },
      });

    return NextResponse.json({
      success: true,

      user: {
        id: technician.id,
        name: technician.name,
        email:
          technician.email,
      },
    });
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      {
        error:
          "Failed to create technician",
      },
      {
        status: 500,
      }
    );
  }
}