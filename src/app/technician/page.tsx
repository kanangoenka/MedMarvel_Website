"use client";

import { useState } from "react";
import {
  FileText,
  FolderOpen,
  Download,
  Eye,
} from "lucide-react";

import CreateCaseModal from "@/components/technician/CreateCaseModal";

export default function TechnicianPage() {
  const [cases, setCases] = useState<any[]>([]);

  // Mock Doctors for now
  const doctors = [
    {
      id: "1",
      name: "Dr. Sharma",
    },
    {
      id: "2",
      name: "Dr. Patel",
    },
    {
      id: "3",
      name: "Dr. Shah",
    },
  ];

  function downloadReport(caseItem: any) {
    if (!caseItem.reportUploaded) return;

    if (caseItem.reportUrl) {
      window.open(
        caseItem.reportUrl,
        "_blank"
      );
    }
  }

  function viewFiles(caseItem: any) {
    const totalFiles =
      caseItem.mriFiles.length +
      caseItem.petFiles.length +
      caseItem.dwiFiles.length +
      caseItem.otherFiles.length +
      caseItem.folderFiles.length +
      caseItem.medicalHistory.length +
      caseItem.consentForm.length +
      caseItem.patientInfo.length +
      caseItem.otherDocuments.length;

    alert(
      `Patient: ${caseItem.patientName}

MRI Files: ${caseItem.mriFiles.length}
PET Files: ${caseItem.petFiles.length}
DWI Files: ${caseItem.dwiFiles.length}
Other Files: ${caseItem.otherFiles.length}

Folder Upload: ${caseItem.folderFiles.length}

Medical History: ${caseItem.medicalHistory.length}
Consent Forms: ${caseItem.consentForm.length}
Patient Information: ${caseItem.patientInfo.length}
Other Documents: ${caseItem.otherDocuments.length}

Total Files: ${totalFiles}`
    );
  }

  return (
    <div className="text-[#071739] font-sans pb-12">

      {/* Header */}

      <div className="bg-white border-b border-gray-100 shadow-[0_1px_3px_rgba(15,23,42,0.02)]">
        <div className="max-w-7xl mx-auto px-6 py-6 flex flex-col md:flex-row md:items-center justify-between gap-4">

          <div>
            <h1 className="text-3xl font-bold">
              Technician Dashboard
            </h1>

            <p className="text-gray-500 mt-1 text-sm">
              Upload and manage assigned cases
            </p>
          </div>
          <button
          onClick={() => setIsModalOpen(true)}
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-xl font-medium"
          >
            + Add Case
          </button>

          
        </div>
      </div>

      {/* Stats */}

      <div className="max-w-7xl mx-auto px-6 mt-8">

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

          <div className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm">
            <p className="text-sm text-gray-500">
              Total Cases
            </p>

            <p className="text-3xl font-bold mt-2">
              {cases.length}
            </p>
          </div>

          <div className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm">
            <p className="text-sm text-gray-500">
              Pending Reports
            </p>

            <p className="text-3xl font-bold mt-2">
              {
                cases.filter(
                  (c) =>
                    !c.reportUploaded
                ).length
              }
            </p>
          </div>

          <div className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm">
            <p className="text-sm text-gray-500">
              Reports Ready
            </p>

            <p className="text-3xl font-bold mt-2">
              {
                cases.filter(
                  (c) =>
                    c.reportUploaded
                ).length
              }
            </p>
          </div>

        </div>

        {/* Worklist */}

        <div className="mt-6 bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">

          <div className="px-6 py-4 border-b border-gray-100">
            <h2 className="font-semibold text-lg">
              My Cases
            </h2>

            <p className="text-sm text-gray-500">
              Cases uploaded by this technician
            </p>
          </div>

          <div className="overflow-x-auto">

            <table className="w-full">

              <thead>
                <tr className="bg-gray-50">

                  <th className="text-left px-6 py-4 text-sm font-semibold">
                    Case ID
                  </th>

                  <th className="text-left px-6 py-4 text-sm font-semibold">
                    Patient
                  </th>

                  <th className="text-left px-6 py-4 text-sm font-semibold">
                    Doctor
                  </th>

                  <th className="text-left px-6 py-4 text-sm font-semibold">
                    Modality
                  </th>

                  <th className="text-left px-6 py-4 text-sm font-semibold">
                    Files
                  </th>

                  <th className="text-left px-6 py-4 text-sm font-semibold">
                    Status
                  </th>

                  <th className="text-left px-6 py-4 text-sm font-semibold">
                    Actions
                  </th>

                </tr>
              </thead>

              <tbody>

                {cases.length === 0 ? (
                  <tr>
                    <td
                      colSpan={7}
                      className="h-[400px] text-center text-gray-400"
                    >
                      No cases uploaded yet
                    </td>
                  </tr>
                ) : (
                  cases.map(
                    (caseItem) => {
                      const totalFiles =
                        caseItem.mriFiles
                          .length +
                        caseItem.petFiles
                          .length +
                        caseItem.dwiFiles
                          .length +
                        caseItem.otherFiles
                          .length +
                        caseItem.folderFiles
                          .length;

                      return (
                        <tr
                          key={
                            caseItem.id
                          }
                          className="border-t border-gray-100"
                        >

                          <td className="px-6 py-4 text-sm font-medium">
                            {
                              caseItem.patientId
                            }
                          </td>

                          <td className="px-6 py-4 text-sm">
                            {
                              caseItem.patientName
                            }
                          </td>

                          <td className="px-6 py-4 text-sm">
                            {
                              caseItem.doctorName
                            }
                          </td>

                          <td className="px-6 py-4 text-sm">
                            {
                              caseItem.modality
                            }
                          </td>

                          <td className="px-6 py-4">
                            <span className="inline-flex items-center gap-2 bg-blue-50 text-blue-700 text-xs px-3 py-1 rounded-full">
                              <FolderOpen className="w-3 h-3" />
                              {
                                totalFiles
                              }{" "}
                              Files
                            </span>
                          </td>

                          <td className="px-6 py-4">
                            {caseItem.reportUploaded ? (
                              <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-xs font-medium">
                                REPORT READY
                              </span>
                            ) : (
                              <span className="bg-yellow-100 text-yellow-700 px-3 py-1 rounded-full text-xs font-medium">
                                PENDING
                              </span>
                            )}
                          </td>

                          <td className="px-6 py-4">

                            <div className="flex items-center gap-2">

                              <button
                                onClick={() =>
                                  viewFiles(
                                    caseItem
                                  )
                                }
                                className="flex items-center gap-1 px-3 py-2 rounded-lg border text-sm hover:bg-gray-50"
                              >
                                <Eye className="w-4 h-4" />
                                View
                              </button>

                              <button
                                disabled={
                                  !caseItem.reportUploaded
                                }
                                onClick={() =>
                                  downloadReport(
                                    caseItem
                                  )
                                }
                                className={`flex items-center gap-1 px-3 py-2 rounded-lg text-sm

                                ${
                                  caseItem.reportUploaded
                                    ? "bg-green-600 text-white hover:bg-green-700"
                                    : "bg-gray-200 text-gray-400 cursor-not-allowed"
                                }`}
                              >
                                <Download className="w-4 h-4" />
                                Report
                              </button>

                            </div>

                          </td>

                        </tr>
                      );
                    }
                  )
                )}

              </tbody>

            </table>

          </div>

        </div>

        {/* Future Note 

        <div className="mt-6 bg-blue-50 border border-blue-100 rounded-2xl p-5">
          <h3 className="font-semibold text-blue-800">
            Future Backend Integration
          </h3>

          <ul className="mt-2 text-sm text-blue-700 space-y-1">
            <li>
              • Operator will be able to
              download all uploaded files
            </li>

            <li>
              • Operator uploads final
              report
            </li>

            <li>
              • Report button becomes
              active automatically
            </li>

            <li>
              • Doctor downloads final
              report
            </li>

            <li>
              • Site Admin and Institution
              Manager can monitor status
            </li>
          </ul>
        </div> */}

      </div>

    </div>
  );
}