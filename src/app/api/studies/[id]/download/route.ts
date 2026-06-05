import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { getCurrentUser } from "@/lib/current-user";

import fs from "fs";
import path from "path";
import { PassThrough } from "stream";

// eslint-disable-next-line @typescript-eslint/no-require-imports
const archiver = require("archiver");

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

    const study = await prisma.study.findUnique({
      where: {
        id: studyId,
      },
    });

    if (!study) {
      return NextResponse.json(
        { error: "Study not found" },
        { status: 404 }
      );
    }

    const uploadDir = path.join(
      process.cwd(),
      "public",
      "uploads",
      studyId
    );

    console.log("ZIP REQUEST");
    console.log("Study:", studyId);
    console.log("Folder:", uploadDir);
    console.log("Exists:", fs.existsSync(uploadDir));

    if (!fs.existsSync(uploadDir)) {
      return NextResponse.json(
        { error: "No files uploaded for this study" },
        { status: 404 }
      );
    }

    const archive = archiver("zip", {
      zlib: { level: 9 },
    });

    const pass = new PassThrough();
    const chunks: Buffer[] = [];

    const zipBuffer = await new Promise<Buffer>(
      (resolve, reject) => {
        pass.on("data", (chunk: Buffer) =>
          chunks.push(chunk)
        );

        pass.on("end", () =>
          resolve(Buffer.concat(chunks))
        );

        pass.on("error", reject);

        archive.on("error", reject);

        archive.pipe(pass);

        archive.directory(
          uploadDir,
          false
        );

        archive.finalize();
      }
    );

    return new NextResponse(
      new Uint8Array(zipBuffer),
      {
        headers: {
          "Content-Type": "application/zip",
          "Content-Disposition":
            `attachment; filename="study_${studyId}.zip"`,
          "Content-Length":
            String(zipBuffer.length),
        },
      }
    );

  } catch (error) {
    console.error(
      "ZIP DOWNLOAD ERROR:",
      error
    );

    return NextResponse.json(
      {
        error: "Failed to create ZIP",
      },
      {
        status: 500,
      }
    );
  }
}