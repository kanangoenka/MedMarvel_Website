import { NextResponse } from "next/server";

import prisma from "@/lib/prisma";
import { hashPassword } from "@/lib/hash";

import { getCurrentUser } from "@/lib/current-user";
import { canCreateOperator } from "@/lib/permissions";

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
      !canCreateOperator(
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
      siteIds,
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

    const result =
      await prisma.$transaction(
        async (tx) => {
          const operator =
            await tx.user.create({
              data: {
                name:
                  name.trim(),

                email: email
                  .trim()
                  .toLowerCase(),

                password:
                  hashedPassword,

                role:
                  UserRole.OPERATOR,
              },
            });

          if (
            siteIds &&
            Array.isArray(siteIds) &&
            siteIds.length > 0
          ) {
            const sites =
              await tx.site.findMany({
                where: {
                  id: {
                    in: siteIds,
                  },
                },
              });

            if (
              sites.length !==
              siteIds.length
            ) {
              throw new Error(
                "One or more selected sites do not exist"
              );
            }

            await tx.operatorSiteAssignment.createMany(
              {
                data:
                  siteIds.map(
                    (
                      siteId: string
                    ) => ({
                      operatorId:
                        operator.id,

                      siteId,
                    })
                  ),
              }
            );
          }

          return operator;
        }
      );

    return NextResponse.json({
      success: true,

      user: {
        id: result.id,
        name: result.name,
        email: result.email,
      },
    });

  } catch (error) {
    console.error(error);

    return NextResponse.json(
      {
        error:
          "Failed to create operator",
      },
      {
        status: 500,
      }
    );
  }
}