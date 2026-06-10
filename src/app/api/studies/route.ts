import { NextResponse } from "next/server";

import prisma from "@/lib/prisma";
import { getCurrentUser } from "@/lib/current-user";

// =========================
// CREATE STUDY
// =========================
export async function POST(request: Request) {
  try {
    const body = await request.json();

    const {
      patientId,
      patientName,
      studyDescription,
      modality,
      imagingLink,
    } = body;

    const user = (await getCurrentUser()) as any;

    if (!user) {
      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 401 }
      );
    }

    const site = user.siteId
      ? await prisma.site.findUnique({
          where: {
            id: user.siteId,
          },
        })
      : null;

    console.log("USER =", user);
    console.log("SITE ID =", user.siteId);
    console.log("ROLE =", user.role);

    if (!site) {
      return NextResponse.json(
        {
          error: "User is not assigned to a site",
        },
        {
          status: 400,
        }
      );
    }

    let patient = null;

    if (patientId || patientName) {
      patient = await prisma.patient.create({
        data: {
          patientId: patientId || "-",
          patientName: patientName || "-",
        },
      });
    }

    const caseNumber = `CASE-${Date.now()}`;

    const study = await prisma.study.create({
      data: {
        caseNumber,

        studyDescription:
          studyDescription || "-",

        modality:
          modality || "-",

        imagingLink:
          imagingLink || "",

        patientId:
          patient?.id || null,

        siteId: site.id,

        doctorId: user.id,

        uploadedById: user.id,

        status: "UPLOADED",
      },

      include: {
        patient: true,
        report: true,
        files: true,

        doctor: {
          select: {
            id: true,
            name: true,
            email: true,
          },
        },

        site: true,
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
        error: "Failed to create study",
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
    const user = (await getCurrentUser()) as any;

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

    const studyInclude = {
      patient: true,
      report: true,
      files: true,

      doctor: {
        select: {
          id: true,
          name: true,
          email: true,
        },
      },

      operator: {
        select: {
          id: true,
          name: true,
          email: true,
        },
      },

      technician: {
        select: {
          id: true,
          name: true,
          email: true,
        },
      },

      uploadedBy: {
        select: {
          id: true,
          name: true,
          email: true,
        },
      },

      site: true,
    };

    let studies: any[] = [];

    // SUPER ADMIN
    if (user.role === "SUPER_ADMIN") {
      studies = await prisma.study.findMany({
        include: studyInclude,
        orderBy: {
          createdAt: "desc",
        },
      });
    }

    // DOCTOR
    else if (user.role === "DOCTOR") {
      studies = await prisma.study.findMany({
        where: {
          doctorId: user.id,
        },

        include: studyInclude,

        orderBy: {
          createdAt: "desc",
        },
      });
    }

    // TECHNICIAN
    else if (user.role === "TECHNICIAN") {
      studies = await prisma.study.findMany({
        where: {
          technicianId: user.id,
        },

        include: studyInclude,

        orderBy: {
          createdAt: "desc",
        },
      });
    }

    // OPERATOR
    else if (user.role === "OPERATOR") {
      studies = await prisma.study.findMany({
        where: {
          operatorId: user.id,
        },

        include: studyInclude,

        orderBy: {
          createdAt: "desc",
        },
      });
    }

    // SITE ADMIN
    else if (user.role === "SITE_ADMIN") {
      studies = await prisma.study.findMany({
        where: {
          siteId: user.siteId ?? undefined,
        },

        include: studyInclude,

        orderBy: {
          createdAt: "desc",
        },
      });
    }

    // INSTITUTION MANAGER / OPERATION HEAD
    else {
      studies = await prisma.study.findMany({
        include: studyInclude,

        orderBy: {
          createdAt: "desc",
        },
      });
    }

    return NextResponse.json(studies);
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      {
        error: "Failed to fetch studies",
      },
      {
        status: 500,
      }
    );
  }
}