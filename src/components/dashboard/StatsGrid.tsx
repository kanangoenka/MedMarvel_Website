import DashboardCard from "./DashboardCard";

type Stat = {
  title: string;
  value: string | number;
  description?: string;
};

type StatsGridProps = {
  stats: Stat[];
};

export default function StatsGrid({
  stats,
}: StatsGridProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4">
      {stats.map((stat) => (
        <DashboardCard
          key={stat.title}
          title={stat.title}
          value={stat.value}
          description={stat.description}
        />
      ))}
    </div>
  );
}