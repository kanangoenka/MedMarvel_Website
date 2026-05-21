import { ReactNode } from "react";

import Navbar from "./Navbar";

type DashboardShellProps = {
  children: ReactNode;
};

export default function DashboardShell({
  children,
}: DashboardShellProps) {
  return (
    <div className="min-h-screen bg-[#f4f7fb]">
      <Navbar />

      <main className="p-8">
        {children}
      </main>
    </div>
  );
}