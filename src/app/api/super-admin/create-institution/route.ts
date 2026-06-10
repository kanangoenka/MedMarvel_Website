import { NextResponse } from "next/server";

import prisma from "@/lib/prisma";
import { hashPassword } from "@/lib/hash";

import { getCurrentUser } from "@/lib/current-user";
import { canCreateInstitution } from "@/lib/permissions";

import { UserRole } from "@prisma/client";

export async function POST(req: Request) {
  try {
    const currentUser =
      await getCurrentUser();


      console.log("CURRENT USER");
console.log(currentUser);
console.log("ROLE:", currentUser.role);

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
      !canCreateInstitution(
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
          email: managerEmail,
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
        managerPassword
      );

    const result =
      await prisma.$transaction(
        async (tx) => {
          const institution =
            await tx.institution.create({
              data: {
                name:
                  institutionName.trim(),
              },
            });

          const manager =
            await tx.user.create({
              data: {
                name:
                  managerName.trim(),

                email:
                  managerEmail
                    .trim()
                    .toLowerCase(),

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

    return NextResponse.json({
      success: true,

      institution: {
        id:
          result.institution.id,
        name:
          result.institution.name,
      },

      manager: {
        id: result.manager.id,
        name:
          result.manager.name,
        email:
          result.manager.email,
      },
    });
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