import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { getCurrentUser } from "@/lib/current-user";

import fs from "fs";
import path from "path";

export async function POST(
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

    const formData = await request.formData();

    const file = formData.get("file") as File;

    if (!file) {
      return NextResponse.json(
        { error: "No file uploaded" },
        { status: 400 }
      );
    }

    const uploadDir = path.join(
      process.cwd(),
      "public",
      "uploads",
      studyId
    );

    if (!fs.existsSync(uploadDir)) {
      fs.mkdirSync(uploadDir, {
        recursive: true,
      });
    }

    const fileName = file.name.replace(
      /[^a-zA-Z0-9.\-_ ]/g,
      "_"
    );

    const filePath = path.join(
      uploadDir,
      fileName
    );

    const bytes = await file.arrayBuffer();

    fs.writeFileSync(
      filePath,
      Buffer.from(bytes)
    );

    const fileUrl =
      `/uploads/${studyId}/${fileName}`;

    const studyFile =
      await prisma.studyFile.create({
        data: {
          studyId,
          fileName,
          fileUrl,
          fileType: "FILE",
        },
      });

    return NextResponse.json({
      success: true,
      file: studyFile,
    });
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      {
        error: "Upload failed",
      },
      {
        status: 500,
      }
    );
  }
}