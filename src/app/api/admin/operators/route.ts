import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { hashPassword } from "@/lib/hash";

export async function GET() {
  try {
    const operators = await prisma.user.findMany({
      where: {
        role: "OPERATOR",
      },
      orderBy: {
        name: "asc",
      },
    });

    return NextResponse.json(operators);
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      { error: "Failed to fetch operators" },
      { status: 500 }
    );
  }
}

export async function POST(req: Request) {
  try {
    const body = await req.json();

    if (
      !body.doctorIds ||
      body.doctorIds.length === 0
    ) {
      return NextResponse.json(
        {
          error:
            "Select at least one doctor",
        },
        { status: 400 }
      );
    }

    const firstDoctor =
      await prisma.user.findUnique({
        where: {
          id: body.doctorIds[0],
        },
      });

    if (!firstDoctor) {
      return NextResponse.json(
        {
          error:
            "Selected doctor not found",
        },
        { status: 404 }
      );
    }

    const hashedPassword =
      await hashPassword(
        body.password
      );

    const operator =
      await prisma.user.create({
        data: {
          name: body.name,
          email: body.email,
          password:
            hashedPassword,
          role: "OPERATOR",

          // Institution automatically
          // comes from first doctor
          institutionId:
            firstDoctor.institutionId,
        },
      });

    await prisma.user.updateMany({
      where: {
        id: {
          in: body.doctorIds,
        },
      },
      data: {
        assignedOperatorId:
          operator.id,
      },
    });

    return NextResponse.json(
      operator
    );
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      {
        error:
          "Failed to create operator",
      },
      { status: 500 }
    );
  }
}