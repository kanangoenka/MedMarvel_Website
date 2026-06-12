import DashboardShell from "@/components/dashboard/DashboardShell";

export default function SiteAdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <DashboardShell role="SITE_ADMIN">
      {children}
    </DashboardShell>
  );
}