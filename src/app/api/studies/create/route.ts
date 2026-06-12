import { NextResponse } from "next/server";

import prisma from "@/lib/prisma";

import { getCurrentUser } from "@/lib/current-user";

import { generateCaseNumber } from "@/lib/generateCaseNumber";

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
      currentUser.role !==
        "DOCTOR" &&
      currentUser.role !==
        "TECHNICIAN"
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
      patientName,
      patientId,
      doctorId,
      studyDescription,
      modality,
      imagingLink,
    } = body;

    if (
      !patientName ||
      !patientId
    ) {
      return NextResponse.json(
        {
          error:
            "Patient information required",
        },
        {
          status: 400,
        }
      );
    }

    let finalDoctorId =
      doctorId;

    let technicianId:
      | string
      | null = null;

    if (
      currentUser.role ===
      "DOCTOR"
    ) {
      finalDoctorId =
        currentUser.id;
    }

    if (
      currentUser.role ===
      "TECHNICIAN"
    ) {
      technicianId =
        currentUser.id;

      if (!doctorId) {
        return NextResponse.json(
          {
            error:
              "Doctor is required",
          },
          {
            status: 400,
          }
        );
      }
    }

    const patient =
      await prisma.patient.create({
        data: {
          patientName,
          patientId,
        },
      });

    const caseNumber =
  generateCaseNumber();

   const study =
  await prisma.study.create({
    data: {
      caseNumber,

      patientId:
        patient.id,

      siteId:
        currentUser.siteId!,

      uploadedById:
        currentUser.id,

      technicianId,

      doctorId:
        finalDoctorId,

      studyDescription,

      modality,

      imagingLink,   // <-- ADD THIS
    },

    include: {
      patient: true,
      doctor: true,
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