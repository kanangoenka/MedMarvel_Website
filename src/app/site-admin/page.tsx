"use client";

import { useState } from "react";
import { UserPlus, Wrench } from "lucide-react";

import CreateDoctorModal from "@/components/site-admin/CreateDoctorModal";
import CreateTechnicianModal from "@/components/site-admin/CreateTechnicianModal";

export default function SiteAdminPage() {
  const [doctors, setDoctors] = useState<any[]>([]);
  const [technicians, setTechnicians] =
    useState<any[]>([]);

  return (
    <div className="text-[#071739] font-sans pb-12">
      {/* Header */}

      <div className="bg-white border-b border-gray-100 shadow-[0_1px_3px_rgba(15,23,42,0.02)]">
        <div className="max-w-7xl mx-auto px-6 py-6 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold text-[#071739] tracking-tight">
              Site Admin Dashboard
            </h1>

            <p className="text-gray-500 mt-1 text-sm font-medium">
              Manage Doctors, Technicians and Cases
            </p>
          </div>

          <div className="flex items-center gap-3">
            <span className="text-xs font-semibold bg-blue-50 text-blue-700 px-3 py-1.5 rounded-full border border-blue-100">
              Site Admin
            </span>
          </div>
        </div>
      </div>

      {/* Actions */}

      <div className="max-w-7xl mx-auto px-6 mt-8">
        <div className="bg-white rounded-2xl border border-gray-100 p-5 shadow-[0_2px_8px_rgba(15,23,42,0.04)]">
          <div className="flex flex-wrap gap-4">

            <div className="w-[220px]">
              <CreateDoctorModal
                onCreate={(data) =>
                  setDoctors([
                    ...doctors,
                    data,
                  ])
                }
              />
            </div>

            <div className="w-[220px]">
              <CreateTechnicianModal
                onCreate={(data) =>
                  setTechnicians([
                    ...technicians,
                    data,
                  ])
                }
              />
            </div>

          </div>
        </div>

        {/* Summary */}

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
          <div className="bg-white rounded-2xl border border-gray-100 p-5 shadow-[0_2px_8px_rgba(15,23,42,0.04)]">
            <div className="flex items-center gap-3">
              <UserPlus className="w-5 h-5 text-blue-600" />

              <div>
                <p className="text-sm text-gray-500">
                  Doctors
                </p>

                <p className="text-2xl font-bold">
                  {doctors.length}
                </p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-2xl border border-gray-100 p-5 shadow-[0_2px_8px_rgba(15,23,42,0.04)]">
            <div className="flex items-center gap-3">
              <Wrench className="w-5 h-5 text-blue-600" />

              <div>
                <p className="text-sm text-gray-500">
                  Technicians
                </p>

                <p className="text-2xl font-bold">
                  {technicians.length}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Cases Section */}

        <div className="mt-6 bg-white rounded-2xl border border-gray-100 shadow-[0_2px_8px_rgba(15,23,42,0.04)] overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-100">
            <h2 className="font-semibold text-lg">
              Cases
            </h2>

            <p className="text-sm text-gray-500">
              All cases for this site will appear here
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
                    Status
                  </th>

                  <th className="text-left px-6 py-4 text-sm font-semibold">
                    Date
                  </th>
                </tr>
              </thead>

              <tbody>
                <tr>
                  <td
                    colSpan={5}
                    className="h-[400px] text-center text-gray-400 text-sm"
                  >
                    No cases available
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

      </div>
    </div>
  );
}