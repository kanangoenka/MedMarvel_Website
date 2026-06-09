"use client";

import { useState } from "react";

import {
  Building2,
  MapPin,
  UserCog,
} from "lucide-react";

import CreateInstitutionModal from "@/components/super-admin/CreateInstitutionModal";
import CreateSiteModal from "@/components/super-admin/CreateSiteModal";
import CreateOperationHeadModal from "@/components/super-admin/CreateOperationHeadModal";

export default function SuperAdminPage() {
  const [institutions, setInstitutions] =
    useState<any[]>([]);

  const [sites, setSites] =
    useState<any[]>([]);

  const [operationHeads, setOperationHeads] =
    useState<any[]>([]);

  return (
    <div className="text-[#071739] font-sans pb-12">
      {/* Header */}

      <div className="bg-white border-b border-gray-100 shadow-[0_1px_3px_rgba(15,23,42,0.02)]">
        <div className="max-w-7xl mx-auto px-6 py-6 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold text-[#071739] tracking-tight">
              Super Admin Dashboard
            </h1>

            <p className="text-gray-500 mt-1 text-sm font-medium">
              MedMarvel Software Solutions
            </p>
          </div>

          <div className="flex items-center gap-3">
            <span className="text-xs font-semibold bg-blue-50 text-blue-700 px-3 py-1.5 rounded-full border border-blue-100 flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-blue-500 animate-pulse" />
              Super Admin Mode
            </span>
          </div>
        </div>
      </div>

      {/* Content */}

      <div className="max-w-7xl mx-auto px-6 mt-8">
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">

          {/* Institution Card */}

          <div className="bg-white rounded-2xl border border-gray-100 p-6 shadow-[0_2px_8px_rgba(15,23,42,0.04)] hover:shadow-md hover:-translate-y-0.5 transition-all duration-300 flex flex-col min-h-[500px]">
            <div className="flex items-center gap-3 mb-4 border-b border-gray-50 pb-4">
              <div className="p-2.5 bg-blue-50 text-blue-600 rounded-xl">
                <Building2 className="w-5 h-5" />
              </div>

              <div>
                <h2 className="font-semibold text-base text-[#071739]">
                  Institutions
                </h2>

                <p className="text-xs text-gray-400 font-medium mt-0.5">
                  {institutions.length} Institution
                  {institutions.length !== 1
                    ? "s"
                    : ""}
                </p>
              </div>
            </div>

            <div className="flex-1 overflow-y-auto max-h-[280px] space-y-2">
              {institutions.length === 0 ? (
                <div className="h-full flex items-center justify-center py-12">
                  <p className="text-gray-400 text-xs italic">
                    No institutions added yet
                  </p>
                </div>
              ) : (
                institutions.map(
                  (institution) => (
                    <div
                      key={institution.id}
                      className="px-3 py-3 bg-gray-50 border border-gray-100 rounded-xl"
                    >
                      <p className="font-semibold text-sm">
                        {
                          institution.institutionName
                        }
                      </p>

                      <p className="text-xs text-gray-500 mt-1">
                        Manager:{" "}
                        {
                          institution.managerName
                        }
                      </p>

                      <p className="text-xs text-gray-500">
                        User ID:{" "}
                        {institution.userId}
                      </p>
                    </div>
                  )
                )
              )}
            </div>

            <div className="mt-auto pt-4 border-t border-gray-50">
              <CreateInstitutionModal
                onCreate={(data) =>
                  setInstitutions([
                    ...institutions,
                    data,
                  ])
                }
              />
            </div>
          </div>

          {/* Site Card */}

          <div className="bg-white rounded-2xl border border-gray-100 p-6 shadow-[0_2px_8px_rgba(15,23,42,0.04)] hover:shadow-md hover:-translate-y-0.5 transition-all duration-300 flex flex-col min-h-[500px]">
            <div className="flex items-center gap-3 mb-4 border-b border-gray-50 pb-4">
              <div className="p-2.5 bg-blue-50 text-blue-600 rounded-xl">
                <MapPin className="w-5 h-5" />
              </div>

              <div>
                <h2 className="font-semibold text-base text-[#071739]">
                  Sites
                </h2>

                <p className="text-xs text-gray-400 font-medium mt-0.5">
                  {sites.length} Site
                  {sites.length !== 1
                    ? "s"
                    : ""}
                </p>
              </div>
            </div>

            <div className="flex-1 overflow-y-auto max-h-[280px] space-y-2">
              {sites.length === 0 ? (
                <div className="h-full flex items-center justify-center py-12">
                  <p className="text-gray-400 text-xs italic">
                    No sites added yet
                  </p>
                </div>
              ) : (
                sites.map((site) => (
                  <div
                    key={site.id}
                    className="px-3 py-3 bg-gray-50 border border-gray-100 rounded-xl"
                  >
                    <p className="font-semibold text-sm">
                      {site.siteName}
                    </p>

                    <p className="text-xs text-gray-500 mt-1">
                      Institution:{" "}
                      {
                        site.institutionName
                      }
                    </p>

                    <p className="text-xs text-gray-500">
                      Site Admin:{" "}
                      {site.adminName}
                    </p>

                    <p className="text-xs text-gray-500">
                      User ID:{" "}
                      {site.userId}
                    </p>
                  </div>
                ))
              )}
            </div>

            <div className="mt-auto pt-4 border-t border-gray-50">
              <CreateSiteModal
                institutions={
                  institutions
                }
                onCreate={(data) =>
                  setSites([
                    ...sites,
                    data,
                  ])
                }
              />
            </div>
          </div>

          {/* Operation Head Card */}

          <div className="bg-white rounded-2xl border border-gray-100 p-6 shadow-[0_2px_8px_rgba(15,23,42,0.04)] hover:shadow-md hover:-translate-y-0.5 transition-all duration-300 flex flex-col min-h-[500px]">
            <div className="flex items-center gap-3 mb-4 border-b border-gray-50 pb-4">
              <div className="p-2.5 bg-blue-50 text-blue-600 rounded-xl">
                <UserCog className="w-5 h-5" />
              </div>

              <div>
                <h2 className="font-semibold text-base text-[#071739]">
                  Operation Heads
                </h2>

                <p className="text-xs text-gray-400 font-medium mt-0.5">
                  {
                    operationHeads.length
                  }{" "}
                  Head
                  {operationHeads.length !==
                  1
                    ? "s"
                    : ""}
                </p>
              </div>
            </div>

            <div className="flex-1 overflow-y-auto max-h-[280px] space-y-2">
              {operationHeads.length ===
              0 ? (
                <div className="h-full flex items-center justify-center py-12">
                  <p className="text-gray-400 text-xs italic">
                    No operation heads added
                  </p>
                </div>
              ) : (
                operationHeads.map(
                  (head) => (
                    <div
                      key={head.id}
                      className="px-3 py-3 bg-gray-50 border border-gray-100 rounded-xl"
                    >
                      <p className="font-semibold text-sm">
                        {head.name}
                      </p>

                      <p className="text-xs text-gray-500 mt-1">
                        User ID:{" "}
                        {head.userId}
                      </p>
                    </div>
                  )
                )
              )}
            </div>

            <div className="mt-auto pt-4 border-t border-gray-50">
              <CreateOperationHeadModal
                onCreate={(data) =>
                  setOperationHeads([
                    ...operationHeads,
                    data,
                  ])
                }
              />
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}