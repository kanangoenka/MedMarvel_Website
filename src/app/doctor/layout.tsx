import DashboardShell from "@/components/dashboard/DashboardShell";

export default function DoctorLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <DashboardShell role="DOCTOR">
      {children}
    </DashboardShell>
  );
}