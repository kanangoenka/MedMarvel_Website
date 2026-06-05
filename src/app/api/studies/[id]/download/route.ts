import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { getCurrentUser } from "@/lib/current-user";

export async function GET(
  request: Request,
  context: any
) {
  try {
    const user = await getCurrentUser();

    if (!user) {
      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 401 }
      );
    }

    const { id: studyId } = await context.params;

    const files =
      await prisma.studyFile.findMany({
        where: {
          studyId,
        },
      });

    return NextResponse.json(files);
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      {
        error: "Failed to fetch files",
      },
      {
        status: 500,
      }
    );
  }
}