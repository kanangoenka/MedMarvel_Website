import StatsGrid from "@/components/dashboard/StatsGrid";

export default function InstitutionManagerPage() {
  const stats = [
    {
      title: "Total Sites",
      value: 8,
      description: "Under this institution",
    },
    {
      title: "Total Cases",
      value: 1250,
      description: "Across all sites",
    },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">
          Institution Manager Dashboard
        </h1>

        <p className="text-gray-500 mt-1">
          Overview of institution activity.
        </p>
      </div>

      <StatsGrid stats={stats} />
    </div>
  );
}