import StatsGrid from "@/components/dashboard/StatsGrid";

export default function SiteAdminPage() {
  const stats = [
    {
      title: "Total Doctors",
      value: 15,
      description: "Assigned to this site",
    },
    {
      title: "Total Technicians",
      value: 10,
      description: "Working at this site",
    },
    {
      title: "Total Cases",
      value: 420,
      description: "Uploaded in this site",
    },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">
          Site Manager Dashboard
        </h1>

        <p className="text-gray-500 mt-1">
          Overview of site resources and cases.
        </p>
      </div>

      <StatsGrid stats={stats} />
    </div>
  );
}