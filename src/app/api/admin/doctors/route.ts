import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { hashPassword } from "@/lib/hash";

export async function GET() {
  try {
    const doctors = await prisma.user.findMany({
      where: {
        role: "CLIENT",
      },
      include: {
        institution: true,
        site: true,
      },
      orderBy: {
        name: "asc",
      },
    });

    return NextResponse.json(doctors);
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      { error: "Failed to fetch doctors" },
      { status: 500 }
    );
  }
}

export async function POST(req: Request) {
  try {
    const body = await req.json();

    const hashedPassword =
      await hashPassword(body.password);

    const site = await prisma.site.findUnique({
      where: {
        id: body.siteId,
      },
    });

    if (!site) {
      return NextResponse.json(
        { error: "Site not found" },
        { status: 404 }
      );
    }

    const doctor =
      await prisma.user.create({
        data: {
          name: body.name,
          email: body.email,
          password: hashedPassword,
          role: "CLIENT",
          institutionId: site.institutionId,
          siteId: body.siteId,
        },
      });

    return NextResponse.json(doctor);
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      { error: "Failed to create doctor" },
      { status: 500 }
    );
  }
}