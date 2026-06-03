import prisma from "@/lib/prisma";
import { Building2, MapPin, Stethoscope, UserCog } from "lucide-react";

import AddInstitutionDialog from "@/components/admin/AddInstitutionDialog";
import AddSiteDialog from "@/components/admin/AddSiteDialog";
import AddDoctorDialog from "@/components/admin/AddDoctorDialog";
import AddOperatorDialog from "@/components/admin/AddOperatorDialog";

export default async function AdminPage() {
  const institutions =
    await prisma.institution.findMany({
      orderBy: {
        name: "asc",
      },
    });

  const sites =
    await prisma.site.findMany({
      orderBy: {
        name: "asc",
      },
    });

  const doctors =
    await prisma.user.findMany({
      where: {
        role: "CLIENT",
      },
      orderBy: {
        name: "asc",
      },
    });

  const operators =
    await prisma.user.findMany({
      where: {
        role: "OPERATOR",
      },
      orderBy: {
        name: "asc",
      },
    });

  return (
    <div className="min-h-screen bg-[#f8fafc] text-[#071739] font-sans pb-12">
      {/* Header Container */}
      <div className="bg-white border-b border-gray-100 shadow-[0_1px_3px_rgba(15,23,42,0.02)]">
        <div className="max-w-7xl mx-auto px-6 py-6 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold text-[#071739] tracking-tight">
              Admin Dashboard
            </h1>
            <p className="text-gray-500 mt-1 text-sm font-medium">
              MedMarvel Software Solutions
            </p>
          </div>
          
          <div className="flex items-center gap-3">
            <span className="text-xs font-semibold bg-blue-50/50 text-blue-700 px-3 py-1.5 rounded-full border border-blue-100 flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-blue-500 animate-pulse"></span>
              Admin Mode
            </span>
          </div>
        </div>
      </div>

      {/* Main Grid Content */}
      <div className="max-w-7xl mx-auto px-6 mt-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          
          {/* Card 1: Institutions */}
          <div className="bg-white rounded-2xl border border-gray-100 p-6 shadow-[0_2px_8px_rgba(15,23,42,0.04)] hover:shadow-md hover:-translate-y-0.5 transition-all duration-300 flex flex-col min-h-[440px]">
            <div className="flex items-center justify-between mb-4 border-b border-gray-50 pb-4">
              <div className="flex items-center gap-3">
                <div className="p-2.5 bg-blue-50 text-blue-600 rounded-xl">
                  <Building2 className="w-5 h-5" />
                </div>
                <div>
                  <h2 className="font-semibold text-base text-[#071739]">
                    Institutions
                  </h2>
                  <p className="text-xs text-gray-400 font-medium mt-0.5">
                    {institutions.length} {institutions.length === 1 ? 'organization' : 'organizations'}
                  </p>
                </div>
              </div>
            </div>

            <div className="flex-1 overflow-y-auto max-h-[240px] my-2 pr-1 space-y-2 custom-scrollbar">
              {institutions.length === 0 ? (
                <div className="h-full flex items-center justify-center py-12">
                  <p className="text-gray-400 text-xs italic">No institutions added yet</p>
                </div>
              ) : (
                institutions.map((institution) => (
                  <div
                    key={institution.id}
                    className="flex items-center gap-3 px-3 py-2.5 bg-gray-50/50 border border-gray-100 hover:border-blue-100 hover:bg-blue-50/10 rounded-xl transition-all group/item"
                  >
                    <div className="w-1.5 h-1.5 rounded-full bg-blue-400 group-hover/item:bg-blue-600 transition-colors" />
                    <span className="text-sm font-semibold text-gray-700 truncate">{institution.name}</span>
                  </div>
                ))
              )}
            </div>

            <div className="mt-auto pt-4 border-t border-gray-50">
              <AddInstitutionDialog />
            </div>
          </div>

          {/* Card 2: Sites */}
          <div className="bg-white rounded-2xl border border-gray-100 p-6 shadow-[0_2px_8px_rgba(15,23,42,0.04)] hover:shadow-md hover:-translate-y-0.5 transition-all duration-300 flex flex-col min-h-[440px]">
            <div className="flex items-center justify-between mb-4 border-b border-gray-50 pb-4">
              <div className="flex items-center gap-3">
                <div className="p-2.5 bg-blue-50 text-blue-600 rounded-xl">
                  <MapPin className="w-5 h-5" />
                </div>
                <div>
                  <h2 className="font-semibold text-base text-[#071739]">
                    Sites
                  </h2>
                  <p className="text-xs text-gray-400 font-medium mt-0.5">
                    {sites.length} {sites.length === 1 ? 'site' : 'sites'}
                  </p>
                </div>
              </div>
            </div>

            <div className="flex-1 overflow-y-auto max-h-[240px] my-2 pr-1 space-y-2 custom-scrollbar">
              {sites.length === 0 ? (
                <div className="h-full flex items-center justify-center py-12">
                  <p className="text-gray-400 text-xs italic">No sites added yet</p>
                </div>
              ) : (
                sites.map((site) => (
                  <div
                    key={site.id}
                    className="flex items-center gap-3 px-3 py-2.5 bg-gray-50/50 border border-gray-100 hover:border-blue-100 hover:bg-blue-50/10 rounded-xl transition-all group/item"
                  >
                    <div className="w-1.5 h-1.5 rounded-full bg-blue-400 group-hover/item:bg-blue-600 transition-colors" />
                    <span className="text-sm font-semibold text-gray-700 truncate">{site.name}</span>
                  </div>
                ))
              )}
            </div>

            <div className="mt-auto pt-4 border-t border-gray-50">
              <AddSiteDialog />
            </div>
          </div>

          {/* Card 3: Doctors */}
          <div className="bg-white rounded-2xl border border-gray-100 p-6 shadow-[0_2px_8px_rgba(15,23,42,0.04)] hover:shadow-md hover:-translate-y-0.5 transition-all duration-300 flex flex-col min-h-[440px]">
            <div className="flex items-center justify-between mb-4 border-b border-gray-50 pb-4">
              <div className="flex items-center gap-3">
                <div className="p-2.5 bg-blue-50 text-blue-600 rounded-xl">
                  <Stethoscope className="w-5 h-5" />
                </div>
                <div>
                  <h2 className="font-semibold text-base text-[#071739]">
                    Doctors
                  </h2>
                  <p className="text-xs text-gray-400 font-medium mt-0.5">
                    {doctors.length} {doctors.length === 1 ? 'doctor' : 'doctors'}
                  </p>
                </div>
              </div>
            </div>

            <div className="flex-1 overflow-y-auto max-h-[240px] my-2 pr-1 space-y-2 custom-scrollbar">
              {doctors.length === 0 ? (
                <div className="h-full flex items-center justify-center py-12">
                  <p className="text-gray-400 text-xs italic">No doctors added yet</p>
                </div>
              ) : (
                doctors.map((doctor) => (
                  <div
                    key={doctor.id}
                    className="flex items-center gap-3 px-3 py-2.5 bg-gray-50/50 border border-gray-100 hover:border-blue-100 hover:bg-blue-50/10 rounded-xl transition-all group/item"
                  >
                    <div className="w-1.5 h-1.5 rounded-full bg-blue-400 group-hover/item:bg-blue-600 transition-colors" />
                    <span className="text-sm font-semibold text-gray-700 truncate">{doctor.name}</span>
                  </div>
                ))
              )}
            </div>

            <div className="mt-auto pt-4 border-t border-gray-50">
              <AddDoctorDialog />
            </div>
          </div>

          {/* Card 4: Operators */}
          <div className="bg-white rounded-2xl border border-gray-100 p-6 shadow-[0_2px_8px_rgba(15,23,42,0.04)] hover:shadow-md hover:-translate-y-0.5 transition-all duration-300 flex flex-col min-h-[440px]">
            <div className="flex items-center justify-between mb-4 border-b border-gray-50 pb-4">
              <div className="flex items-center gap-3">
                <div className="p-2.5 bg-blue-50 text-blue-600 rounded-xl">
                  <UserCog className="w-5 h-5" />
                </div>
                <div>
                  <h2 className="font-semibold text-base text-[#071739]">
                    Operators
                  </h2>
                  <p className="text-xs text-gray-400 font-medium mt-0.5">
                    {operators.length} {operators.length === 1 ? 'operator' : 'operators'}
                  </p>
                </div>
              </div>
            </div>

            <div className="flex-1 overflow-y-auto max-h-[240px] my-2 pr-1 space-y-2 custom-scrollbar">
              {operators.length === 0 ? (
                <div className="h-full flex items-center justify-center py-12">
                  <p className="text-gray-400 text-xs italic">No operators added yet</p>
                </div>
              ) : (
                operators.map((operator) => (
                  <div
                    key={operator.id}
                    className="flex items-center gap-3 px-3 py-2.5 bg-gray-50/50 border border-gray-100 hover:border-blue-100 hover:bg-blue-50/10 rounded-xl transition-all group/item"
                  >
                    <div className="w-1.5 h-1.5 rounded-full bg-blue-400 group-hover/item:bg-blue-600 transition-colors" />
                    <span className="text-sm font-semibold text-gray-700 truncate">{operator.name}</span>
                  </div>
                ))
              )}
            </div>

            <div className="mt-auto pt-4 border-t border-gray-50">
              <AddOperatorDialog />
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}