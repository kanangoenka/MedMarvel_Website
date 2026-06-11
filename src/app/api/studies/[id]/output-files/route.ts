import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { getCurrentUser } from "@/lib/current-user";

import fs from "fs";
import path from "path";
import { v4 as uuidv4 } from "uuid";

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

    const { id: studyId } =
      await context.params;

    const formData =
      await request.formData();

    const file =
      formData.get("file") as File;

    if (!file) {
      return NextResponse.json(
        { error: "No file uploaded" },
        { status: 400 }
      );
    }

    const bytes =
      await file.arrayBuffer();

    const buffer =
      Buffer.from(bytes);

    const extension =
      file.name.split(".").pop();

    const uniqueName =
      `${uuidv4()}.${extension}`;

    const uploadDir =
      path.join(
        process.cwd(),
        "public",
        "outputs"
      );

    if (!fs.existsSync(uploadDir)) {
      fs.mkdirSync(uploadDir, {
        recursive: true,
      });
    }

    const filePath =
      path.join(
        uploadDir,
        uniqueName
      );

    fs.writeFileSync(
      filePath,
      buffer
    );

    const fileUrl =
      `/outputs/${uniqueName}`;

    const outputFile =
      await prisma.studyOutputFile.create({
        data: {
          studyId,
          fileName: file.name,
          fileUrl,
          fileType:
            extension || "FILE",
        },
      });

    await prisma.study.update({
      where: {
        id: studyId,
      },
      data: {
        status: "READY",
      },
    });

    return NextResponse.json({
      success: true,
      file: outputFile,
    });
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      {
        error:
          "Failed to upload output file",
      },
      {
        status: 500,
      }
    );
  }
}