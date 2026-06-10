import StatsGrid from "@/components/dashboard/StatsGrid";

export default function OperationHeadPage() {
  const stats = [
    {
      title: "Total Operators",
      value: 22,
      description: "Managed operators",
    },
    {
      title: "Total Sites",
      value: 6,
      description: "Assigned sites",
    },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">
          Operation Head Dashboard
        </h1>

        <p className="text-gray-500 mt-1">
          Overview of operators and site assignments.
        </p>
      </div>

      <StatsGrid stats={stats} />
    </div>
  );
}