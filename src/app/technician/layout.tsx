import DashboardShell from "@/components/dashboard/DashboardShell";

export default function TechnicianLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <DashboardShell role="TECHNICIAN">
      {children}
    </DashboardShell>
  );
}