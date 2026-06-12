import DashboardShell from "@/components/dashboard/DashboardShell";

export default function OperationHeadLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <DashboardShell role="OPERATION_HEAD">
      {children}
    </DashboardShell>
  );
}