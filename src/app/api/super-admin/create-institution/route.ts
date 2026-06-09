import { NextResponse } from "next/server";

import prisma from "@/lib/prisma";
import { hashPassword } from "@/lib/hash";

import { UserRole } from "@prisma/client";

export async function POST(req: Request) {
  try {
    const body = await req.json();

    const {
      institutionName,
      managerName,
      managerEmail,
      managerPassword,
    } = body;

    if (
      !institutionName ||
      !managerName ||
      !managerEmail ||
      !managerPassword
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
          email: managerEmail,
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
      await hashPassword(
        managerPassword
      );

    const result =
      await prisma.$transaction(
        async (tx) => {
          const institution =
            await tx.institution.create({
              data: {
                name: institutionName,
              },
            });

          const manager =
            await tx.user.create({
              data: {
                name: managerName,

                email:
                  managerEmail,

                password:
                  hashedPassword,

                role:
                  UserRole.INSTITUTION_MANAGER,

                institutionId:
                  institution.id,
              },
            });

          return {
            institution,
            manager,
          };
        }
      );

    return NextResponse.json(
      result
    );
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      {
        error:
          "Failed to create institution",
      },
      {
        status: 500,
      }
    );
  }
}