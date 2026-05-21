"use client";

import { ReactNode, useState } from "react";

import Sidebar from "./Sidebar";
import Navbar from "./Navbar";

type DashboardShellProps = {
  children: ReactNode;
};

export default function DashboardShell({
  children,
}: DashboardShellProps) {
  const [collapsed, setCollapsed] =
    useState(false);

  return (
    <div className="flex min-h-screen bg-gray-100">
      <Sidebar
        collapsed={collapsed}
        setCollapsed={setCollapsed}
      />

      <div className="flex-1 flex flex-col">
        <Navbar />

        <main className="flex-1 p-6 overflow-auto">
          {children}
        </main>
      </div>
    </div>
  );
}