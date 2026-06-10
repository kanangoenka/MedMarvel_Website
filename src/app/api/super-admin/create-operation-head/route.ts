import { NextResponse } from "next/server";

import prisma from "@/lib/prisma";
import { hashPassword } from "@/lib/hash";

import { getCurrentUser } from "@/lib/current-user";
import { canCreateOperationHead } from "@/lib/permissions";

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
      !canCreateOperationHead(
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
          email: email
            .trim()
            .toLowerCase(),
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

    const operationHead =
      await prisma.user.create({
        data: {
          name: name.trim(),

          email: email
            .trim()
            .toLowerCase(),

          password:
            hashedPassword,

          role:
            UserRole.OPERATION_HEAD,
        },
      });

    return NextResponse.json({
      success: true,

      user: {
        id: operationHead.id,
        name: operationHead.name,
        email: operationHead.email,
      },
    });

  } catch (error) {
    console.error(error);

    return NextResponse.json(
      {
        error:
          "Failed to create operation head",
      },
      {
        status: 500,
      }
    );
  }
}