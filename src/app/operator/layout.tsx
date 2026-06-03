import { ReactNode } from "react";
import DashboardShell from "@/components/dashboard/DashboardShell";

type OperatorLayoutProps = {
  children: ReactNode;
};

export default function OperatorLayout({
  children,
}: OperatorLayoutProps) {
  return (
    <DashboardShell>
      {children}
    </DashboardShell>
  );
}
