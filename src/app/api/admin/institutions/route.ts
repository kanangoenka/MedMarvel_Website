import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function GET() {
  try {
    const institutions = await prisma.institution.findMany({
      orderBy: {
        name: "asc",
      },
    });

    return NextResponse.json(institutions);
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      { error: "Failed to fetch institutions" },
      { status: 500 }
    );
  }
}

export async function POST(req: Request) {
  try {
    const body = await req.json();

    const institution =
      await prisma.institution.create({
        data: {
          name: body.name,
        },
      });

    return NextResponse.json(institution);
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      { error: "Failed to create institution" },
      { status: 500 }
    );
  }
}