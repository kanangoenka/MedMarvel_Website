import { ReactNode } from "react";
import DashboardShell from "@/components/dashboard/DashboardShell";

type AdminLayoutProps = {
  children: ReactNode;
};

export default function AdminLayout({
  children,
}: AdminLayoutProps) {
  return (
    <DashboardShell>
      {children}
    </DashboardShell>
  );
}
