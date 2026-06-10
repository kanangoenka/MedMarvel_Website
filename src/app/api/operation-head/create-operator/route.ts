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

    const operationHeadSites =
      await prisma.operationHeadSiteAssignment.findMany(
        {
          where: {
            operationHeadId:
              currentUser.id,
          },
        }
      );

    const allowedSiteIds =
      operationHeadSites.map(
        (site) => site.siteId
      );

    const invalidSite =
      siteIds?.find(
        (siteId: string) =>
          !allowedSiteIds.includes(
            siteId
          )
      );

    if (invalidSite) {
      return NextResponse.json(
        {
          error:
            "You can only assign operators to your own sites",
        },
        {
          status: 403,
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
            Array.isArray(siteIds)
          ) {
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