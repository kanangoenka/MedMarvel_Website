import { NextResponse } from "next/server";

import prisma from "@/lib/prisma";
import { hashPassword } from "@/lib/hash";

import { UserRole } from "@prisma/client";

export async function POST(req: Request) {
  try {
    const body = await req.json();

    const {
      institutionId,
      siteName,
      siteAdminName,
      siteAdminEmail,
      siteAdminPassword,
    } = body;

    if (
      !institutionId ||
      !siteName ||
      !siteAdminName ||
      !siteAdminEmail ||
      !siteAdminPassword
    ) {
      return NextResponse.json(
        { error: "All fields are required" },
        { status: 400 }
      );
    }

    const existingUser =
      await prisma.user.findUnique({
        where: {
          email: siteAdminEmail,
        },
      });

    if (existingUser) {
      return NextResponse.json(
        { error: "Email already exists" },
        { status: 400 }
      );
    }

    const hashedPassword =
      await hashPassword(siteAdminPassword);

    const result =
      await prisma.$transaction(
        async (tx) => {
          const site =
            await tx.site.create({
              data: {
                name: siteName,
                institutionId,
              },
            });

          const siteAdmin =
            await tx.user.create({
              data: {
                name: siteAdminName,
                email: siteAdminEmail,
                password: hashedPassword,

                role:
                  UserRole.SITE_ADMIN,

                institutionId,

                siteId: site.id,
              },
            });

          return {
            site,
            siteAdmin,
          };
        }
      );

    return NextResponse.json(result);
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      { error: "Failed to create site" },
      { status: 500 }
    );
  }
}