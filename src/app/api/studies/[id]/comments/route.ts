import { NextResponse } from "next/server";

import prisma from "@/lib/prisma";

// =========================
// GET COMMENTS
// =========================
export async function GET(
  request: Request,
  context: any
) {

  try {

    const params =
      await context.params;

    const studyId =
      params.id;

    const comments =
      await prisma.studyComment.findMany({
        where: {
          studyId,
        },

        include: {
          user: true,
        },

        orderBy: {
          createdAt: "asc",
        },
      });

    return NextResponse.json(
      comments
    );

  } catch (error) {

    console.error(error);

    return NextResponse.json(
      {
        error:
          "Failed to fetch comments",
      },
      {
        status: 500,
      }
    );
  }
}

// =========================
// CREATE COMMENT
// =========================
export async function POST(
  request: Request,
  context: any
) {

  try {

    const params =
      await context.params;

    const studyId =
      params.id;

    const body =
      await request.json();

    const {
      message,
      role,
    } = body;

    // FIND USER BY ROLE
    const user =
      await prisma.user.findFirst({
        where: {
          role,
        },
      });

    if (!user) {

      return NextResponse.json(
        {
          error:
            "No user found",
        },
        {
          status: 500,
        }
      );
    }

    const comment =
      await prisma.studyComment.create({
        data: {
          message,

          studyId,

          userId: user.id,
        },

        include: {
          user: true,
        },
      });

    return NextResponse.json(
      comment
    );

  } catch (error) {

    console.error(error);

    return NextResponse.json(
      {
        error:
          "Failed to create comment",
      },
      {
        status: 500,
      }
    );
  }
}