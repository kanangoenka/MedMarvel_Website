import { getCurrentUser } from "@/lib/current-user";
import { redirect } from "next/navigation";
import prisma from "@/lib/prisma";

export default async function ViewerPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const user = await getCurrentUser();

  if (!user) {
    redirect("/login");
  }

  const { id } = await params;

  let study: any = null;

  try {
    study = await prisma.study.findUnique({
      where: {
        id,
      },
      include: {
        patient: true,
        report: true,
        files: true,
      },
    });
  } catch (error) {
    console.error("Error fetching study in ViewerPage:", error);
  }

  return (
    <div className="min-h-screen bg-gray-100">

      {/* Header */}
      <div className="bg-white border-b px-6 py-4">
        <h1 className="text-2xl font-bold">
          MRI Viewer
        </h1>

        <p className="text-gray-500">
          Study ID: {id}
        </p>
      </div>

      {/* Main Area */}
      <div className="p-6">

        <div className="grid grid-cols-12 gap-6">

          {/* Left Panel */}
          <div className="col-span-3">

            <div className="bg-white rounded-xl shadow p-4">

              <h2 className="font-semibold text-lg mb-4">
                Patient Information
              </h2>

              <div className="space-y-4">

                <div>
                  <p className="text-sm text-gray-500">
                    Patient ID
                  </p>
                  <p className="font-medium">
                    {study?.patient?.patientId || "-"}
                  </p>
                </div>

                <div>
                  <p className="text-sm text-gray-500">
                    Patient Name
                  </p>
                  <p className="font-medium">
                    {study?.patient?.patientName || "-"}
                  </p>
                </div>

                <div>
                  <p className="text-sm text-gray-500">
                    Modality
                  </p>
                  <p className="font-medium">
                    {study?.modality || "-"}
                  </p>
                </div>

                <div>
                  <p className="text-sm text-gray-500">
                    Status
                  </p>
                  <p className="font-medium">
                    {study?.status || "-"}
                  </p>
                </div>

                <div>
                  <p className="text-sm text-gray-500">
                    Study Description
                  </p>
                  <p className="font-medium">
                    {study?.studyDescription || "-"}
                  </p>
                </div>

              </div>

            </div>

          </div>

          {/* Viewer */}
          <div className="col-span-9">

            <div className="bg-black rounded-xl h-[700px] flex items-center justify-center">

              <h2 className="text-white text-xl">
                MRIcroGL Viewer Will Go Here
              </h2>

            </div>

          </div>

        </div>

        {/* Notes Section */}
        <div className="mt-6 bg-white rounded-xl shadow p-4">

          <h2 className="font-semibold text-lg mb-4">
            Notes / Findings
          </h2>

          <textarea
            className="w-full border rounded-lg p-3"
            rows={5}
            placeholder="Notes will appear here..."
          />

        </div>

      </div>

    </div>
  );
}