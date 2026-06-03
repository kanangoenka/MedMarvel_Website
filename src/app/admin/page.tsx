import prisma from "@/lib/prisma";

import { Card } from "@/components/ui/card";

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
    <div className="p-8">
      <h1 className="text-3xl font-bold text-[#071739]">
        Admin Dashboard
      </h1>

      <p className="text-gray-500 mt-2">
        MedVirtuoso Administration
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mt-8">

        <Card className="p-6">
          <h2 className="font-semibold text-lg">
            Institutions
          </h2>

          <AddInstitutionDialog />

          <div className="mt-4 space-y-2">
            {institutions.map(
              (institution) => (
                <div
                  key={institution.id}
                  className="text-sm"
                >
                  • {institution.name}
                </div>
              )
            )}
          </div>
        </Card>

        <Card className="p-6">
          <h2 className="font-semibold text-lg">
            Sites
          </h2>

          <AddSiteDialog />

          <div className="mt-4 space-y-2">
            {sites.map((site) => (
              <div
                key={site.id}
                className="text-sm"
              >
                • {site.name}
              </div>
            ))}
          </div>
        </Card>

        <Card className="p-6">
          <h2 className="font-semibold text-lg">
            Doctors
          </h2>

          <AddDoctorDialog />

          <div className="mt-4 space-y-2">
            {doctors.map(
              (doctor) => (
                <div
                  key={doctor.id}
                  className="text-sm"
                >
                  • {doctor.name}
                </div>
              )
            )}
          </div>
        </Card>

        <Card className="p-6">
          <h2 className="font-semibold text-lg">
            Operators
          </h2>

          <AddOperatorDialog />

          <div className="mt-4 space-y-2">
            {operators.map(
              (operator) => (
                <div
                  key={operator.id}
                  className="text-sm"
                >
                  • {operator.name}
                </div>
              )
            )}
          </div>
        </Card>

      </div>
    </div>
  );
}