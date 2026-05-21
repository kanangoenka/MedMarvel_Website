import { ReactNode } from "react";

import DashboardShell from "@/components/dashboard/DashboardShell";

type ClientLayoutProps = {
  children: ReactNode;
};

export default function ClientLayout({
  children,
}: ClientLayoutProps) {
  return (
    <DashboardShell>
      {children}
    </DashboardShell>
  );
}