import StatsGrid from "@/components/dashboard/StatsGrid";
import prisma from "@/lib/prisma";

export default async function SuperAdminPage() {
  const [institutions, sites, users] =
    await Promise.all([
      prisma.institution.count(),
      prisma.site.count(),
      prisma.user.count(),
    ]);

  const stats = [
    {
      title: "Total Institutions",
      value: institutions,
      description: "Registered institutions",
    },
    {
      title: "Total Sites",
      value: sites,
      description: "Across all institutions",
    },
    {
      title: "Total Users",
      value: users,
      description:
        "Doctors, technicians and operators",
    },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">
          Super Admin Dashboard
        </h1>

        <p className="text-gray-500 mt-1">
          Overview of all institutions and users.
        </p>
      </div>

      <StatsGrid stats={stats} />
    </div>
  );
}