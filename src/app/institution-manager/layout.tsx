import DashboardShell from "@/components/dashboard/DashboardShell";

export default function InstitutionManagerLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <DashboardShell role="INSTITUTION_MANAGER">
      {children}
    </DashboardShell>
  );
}