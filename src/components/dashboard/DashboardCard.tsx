type DashboardCardProps = {
  title: string;
  value: string | number;
  description?: string;
};

export default function DashboardCard({
  title,
  value,
  description,
}: DashboardCardProps) {
  return (
    <div className="bg-white rounded-2xl shadow-sm border p-5">
      <p className="text-sm text-gray-500">
        {title}
      </p>

      <h2 className="text-3xl font-bold mt-2">
        {value}
      </h2>

      {description && (
        <p className="text-xs text-gray-400 mt-2">
          {description}
        </p>
      )}
    </div>
  );
}