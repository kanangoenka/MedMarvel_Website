import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function GET() {
  try {
    const sites = await prisma.site.findMany({
      include: {
        institution: true,
      },
      orderBy: {
        name: "asc",
      },
    });

    return NextResponse.json(sites);
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      { error: "Failed to fetch sites" },
      { status: 500 }
    );
  }
}

export async function POST(req: Request) {
  try {
    const body = await req.json();

    const site = await prisma.site.create({
      data: {
        name: body.name,
        institutionId: body.institutionId,
      },
    });

    return NextResponse.json(site);
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      { error: "Failed to create site" },
      { status: 500 }
    );
  }
}