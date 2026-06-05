import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { getCurrentUser } from "@/lib/current-user";

import fs from "fs";
import path from "path";

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

    const { fileId } = await context.params;

    const file =
      await prisma.studyFile.findUnique({
        where: {
          id: fileId,
        },
      });

    if (!file) {
      return NextResponse.json(
        { error: "File not found" },
        { status: 404 }
      );
    }

    const fullPath = path.join(
      process.cwd(),
      "public",
      file.fileUrl
    );

    if (!fs.existsSync(fullPath)) {
      return NextResponse.json(
        { error: "Physical file not found" },
        { status: 404 }
      );
    }

    const buffer = fs.readFileSync(fullPath);

    return new NextResponse(buffer, {
      headers: {
        "Content-Disposition":
          `attachment; filename="${file.fileName}"`,
        "Content-Type":
          "application/octet-stream",
      },
    });
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      { error: "Download failed" },
      { status: 500 }
    );
  }
}