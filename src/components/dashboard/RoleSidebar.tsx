"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { sidebarConfig } from "./sidebar-config";
import { Menu } from "lucide-react";

type SidebarProps = {
  role: keyof typeof sidebarConfig;
  collapsed: boolean;
  setCollapsed: (value: boolean) => void;
};

export default function RolSidebar({
  role,
  collapsed,
  setCollapsed,
}: SidebarProps) {
  const pathname = usePathname();

  const menuItems = sidebarConfig[role];

  return (
    <div
      className={`h-screen bg-[#071739] text-white transition-all duration-300 flex flex-col ${
        collapsed ? "w-20" : "w-64"
      }`}
    >
      <div className="flex items-center justify-between p-4 border-b border-white/10">
        {!collapsed && (
          <div>
            <h1 className="text-base font-bold">
              MEDVIRTUOSO
            </h1>

            <p className="text-xs text-gray-300">
              MedMarvel Software Solutions
            </p>
          </div>
        )}

        <button
          onClick={() =>
            setCollapsed(!collapsed)
          }
        >
          <Menu size={20} />
        </button>
      </div>

      <div className="flex-1 p-3 space-y-2">
        {menuItems.map((item) => {
          const Icon = item.icon;

          const active =
            pathname === item.href;

          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex items-center gap-3 rounded-xl px-4 py-3 transition ${
                active
                  ? "bg-blue-600"
                  : "hover:bg-white/10"
              }`}
            >
              <Icon size={20} />

              {!collapsed && (
                <span>{item.label}</span>
              )}
            </Link>
          );
        })}
      </div>

      {!collapsed && (
        <div className="p-4 border-t border-white/10 text-sm text-gray-300">
          MedVirtuoso v1.0
        </div>
      )}
    </div>
  );
}