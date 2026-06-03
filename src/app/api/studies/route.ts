import { NextResponse } from "next/server";

import prisma from "@/lib/prisma";
import { getCurrentUser } from "@/lib/current-user";

// =========================
// CREATE STUDY
// =========================
export async function POST(
  request: Request
) {
  try {
    const body =
      await request.json();

    const {
      patientId,
      patientName,
      studyDescription,
      modality,
      imagingLink,
    } = body;

    const user =
      await getCurrentUser() as any;

    if (!user) {
      return NextResponse.json(
        {
          error: "Unauthorized",
        },
        {
          status: 401,
        }
      );
    }

    const site =
      user.siteId
        ? await prisma.site.findUnique({
            where: {
              id: user.siteId,
            },
          })
        : null;
      console.log("USER =", user)
      console.log("SITE ID =", user.siteId)
      console.log("ROLE =", user.role)
    if (!site) {
      return NextResponse.json(
        {
          error:
            "Doctor is not assigned to a site",
        },
        {
          status: 400,
        }
      );
    }

    let patient = null;

    if (
      patientId ||
      patientName
    ) {
      patient =
        await prisma.patient.create({
          data: {
            patientId:
              patientId || "-",

            patientName:
              patientName || "-",
          },
        });
    }

    const study =
      await prisma.study.create({
        data: {
          studyDescription:
            studyDescription || "-",

          modality:
            modality || "-",

          imagingLink,

          patientId:
            patient?.id || null,

          siteId: site.id,

          userId: user.id,
        },

        include: {
          patient: true,
          report: true,
          files: true,
        },
      });

    return NextResponse.json({
      success: true,
      study,
    });
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      {
        error:
          "Failed to create study",
      },
      {
        status: 500,
      }
    );
  }
}

// =========================
// FETCH STUDIES
// =========================
export async function GET() {
  try {
    const user =
      await getCurrentUser() as any;

    if (!user) {
      return NextResponse.json(
        {
          error: "Unauthorized",
        },
        {
          status: 401,
        }
      );
    }

    let studies: any[] = [];

    if (user.role === "ADMIN") {
      studies =
        await prisma.study.findMany({
          include: {
            patient: true,
            report: true,
            files: true,
          },
          orderBy: {
            createdAt: "desc",
          },
        });
    } else if (
      user.role === "CLIENT"
    ) {
      studies =
        await prisma.study.findMany({
          where: {
            userId: user.id,
          },

          include: {
            patient: true,
            report: true,
            files: true,
          },

          orderBy: {
            createdAt: "desc",
          },
        });
    } else if (
      user.role === "OPERATOR"
    ) {
      const doctorIds =
        user.assignedDoctors.map(
          (doctor: any) => doctor.id
        );

      studies =
        await prisma.study.findMany({
          where: {
            userId: {
              in: doctorIds,
            },
          },

          include: {
            patient: true,
            report: true,
            files: true,
          },

          orderBy: {
            createdAt: "desc",
          },
        });
    }

    return NextResponse.json(
      studies
    );
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      {
        error:
          "Failed to fetch studies",
      },
      {
        status: 500,
      }
    );
  }
}