import { NextResponse } from "next/server";

import prisma from "@/lib/prisma";

import { getCurrentUser } from "@/lib/current-user";

export async function GET(
  req: Request,
  {
    params,
  }: {
    params: Promise<{
      id: string;
    }>;
  }
) {
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

    const { id } =
      await params;

    const study =
      await prisma.study.findUnique({
        where: {
          id,
        },

        include: {
          patient: true,

          site: {
            select: {
              id: true,
              name: true,
            },
          },

          doctor: {
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

          operator: {
            select: {
              id: true,
              name: true,
              email: true,
            },
          },

          files: true,

          report: true,

          comments: {
            include: {
              user: {
                select: {
                  id: true,
                  name: true,
                  role: true,
                },
              },
            },

            orderBy: {
              createdAt: "asc",
            },
          },
        },
      });

    if (!study) {
      return NextResponse.json(
        {
          error:
            "Study not found",
        },
        {
          status: 404,
        }
      );
    }

    return NextResponse.json(
      study
    );
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      {
        error:
          "Failed to fetch study",
      },
      {
        status: 500,
      }
    );
  }
}

export async function DELETE(
  req: Request,
  {
    params,
  }: {
    params: Promise<{
      id: string;
    }>;
  }
) {
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

    const { id } =
      await params;

    await prisma.studyComment.deleteMany({
      where: {
        studyId: id,
      },
    });

    await prisma.studyFile.deleteMany({
      where: {
        studyId: id,
      },
    });

    await prisma.report.deleteMany({
      where: {
        studyId: id,
      },
    });

    await prisma.study.delete({
      where: {
        id,
      },
    });

    return NextResponse.json({
      success: true,
    });
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      {
        error:
          "Failed to delete study",
      },
      {
        status: 500,
      }
    );
  }
}


export async function PATCH(
  req: Request,
  {
    params,
  }: {
    params: Promise<{
      id: string;
    }>;
  }
) {
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

    const { id } =
      await params;

    const body =
      await req.json();

    const {
      patientId,
      patientName,
      studyDescription,
      modality,
      imagingLink,
    } = body;

    const study =
      await prisma.study.findUnique({
        where: { id },
      });

    if (!study) {
      return NextResponse.json(
        {
          error: "Study not found",
        },
        {
          status: 404,
        }
      );
    }

    if (study.patientId) {
      await prisma.patient.update({
        where: {
          id: study.patientId,
        },
        data: {
          patientId,
          patientName,
        },
      });
    }

    const updatedStudy =
      await prisma.study.update({
        where: {
          id,
        },
        data: {
          studyDescription,
          modality,
          imagingLink,
        },
        include: {
          patient: true,
          files: true,
          report: true,
        },
      });

    return NextResponse.json({
      success: true,
      study: updatedStudy,
    });
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      {
        error:
          "Failed to update study",
      },
      {
        status: 500,
      }
    );
  }
}
