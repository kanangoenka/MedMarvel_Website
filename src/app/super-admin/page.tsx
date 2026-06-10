import StatsGrid from "@/components/dashboard/StatsGrid";

export default function SuperAdminPage() {
  const stats = [
    {
      title: "Total Institutions",
      value: 12,
      description: "Registered institutions",
    },
    {
      title: "Total Sites",
      value: 48,
      description: "Across all institutions",
    },
    {
      title: "Total Users",
      value: 256,
      description: "Doctors, technicians and operators",
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