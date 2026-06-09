import { NextResponse } from "next/server";

import prisma from "@/lib/prisma";
import { hashPassword } from "@/lib/hash";

import { UserRole } from "@prisma/client";

export async function POST(req: Request) {
  try {
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
          error: "All fields are required",
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
          error: "Email already exists",
        },
        {
          status: 400,
        }
      );
    }

    const hashedPassword =
      await hashPassword(password);

    const operationHead =
      await prisma.user.create({
        data: {
          name,
          email,
          password: hashedPassword,

          role:
            UserRole.OPERATION_HEAD,
        },
      });

    return NextResponse.json(
      operationHead
    );
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