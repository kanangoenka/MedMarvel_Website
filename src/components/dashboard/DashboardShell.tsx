"use client";

import { ReactNode, useState } from "react";

import Navbar from "./Navbar";
import RoleSidebar from "./RoleSidebar";
import { sidebarConfig } from "./sidebar-config";

type DashboardShellProps = {
  children: ReactNode;
  role: keyof typeof sidebarConfig;
};

export default function DashboardShell({
  children,
  role,
}: DashboardShellProps) {
  const [collapsed, setCollapsed] =
    useState(false);

  return (
    <div className="flex min-h-screen bg-[#f7f9fc]">

      <RoleSidebar
        role={role}
        collapsed={collapsed}
        setCollapsed={setCollapsed}
      />

      <div className="flex-1 flex flex-col">

        <Navbar />

        <main className="p-6 flex-1">
          {children}
        </main>

      </div>

    </div>
  );
}