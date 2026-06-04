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

    const params = await context.params;
    const studyId = params.id;

    const formData = await request.formData();
    const file = formData.get("file") as File;
    const category = (formData.get("category") as string || "unknown").toLowerCase();
    const folderPath = formData.get("folderPath") as string | null;

    const docType = formData.get("docType") as string | null;

    if (!file) {
      return NextResponse.json(
        { error: "No file uploaded" },
        { status: 400 }
      );
    }

    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    // Path sanitization helper
    const sanitizePath = (p: string) => {
      return p
        .split(/[/\\]+/)
        .map(seg => seg.replace(/[^a-zA-Z0-9.\-_ ]/g, "_"))
        .filter(seg => seg !== "" && seg !== "..")
        .join("/");
    };

    let relativeSavePath = "";
    let fileType = category;

    if (category === "folder" && folderPath) {
      const sanitizedFolderFile = sanitizePath(folderPath);
      relativeSavePath = `folders/${sanitizedFolderFile}`;
      fileType = "folder";
    } else if (category === "document" && docType) {
      const sanitizedFileName = file.name.replace(/[^a-zA-Z0-9.\-_ ]/g, "_");
      const sanitizedDocType = sanitizePath(docType);
      relativeSavePath = `docs/${sanitizedDocType}/${sanitizedFileName}`;
      fileType = `document (${docType})`;
    } else {
      const sanitizedFileName = file.name.replace(/[^a-zA-Z0-9.\-_ ]/g, "_");
      relativeSavePath = `${category}/${sanitizedFileName}`;
    }

    const uploadDir = path.join(
      process.cwd(),
      "public",
      "uploads",
      studyId
    );

    const fullFilePath = path.join(uploadDir, relativeSavePath);
    const targetDir = path.dirname(fullFilePath);

    if (!fs.existsSync(targetDir)) {
      fs.mkdirSync(targetDir, { recursive: true });
    }

    fs.writeFileSync(fullFilePath, buffer);

    const fileUrl = `/uploads/${studyId}/${relativeSavePath}`;

    await prisma.studyFile.create({
      data: {
        studyId,
        fileName: file.name,
        fileUrl,
        fileType: fileType,
        folderPath: relativeSavePath,
      },
    });

    return NextResponse.json({
      success: true,
      fileUrl,
    });

  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Failed to upload file" },
      { status: 500 }
    );
  }
}