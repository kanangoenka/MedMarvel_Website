import {
  LayoutDashboard,
  ClipboardList,
  PlusCircle,
} from "lucide-react";

export const sidebarConfig = {
  SUPER_ADMIN: [
    {
      label: "Dashboard",
      href: "/super-admin",
      icon: LayoutDashboard,
    },
    {
      label: "Worklist",
      href: "/super-admin/worklist",
      icon: ClipboardList,
    },
    {
      label: "Creation",
      href: "/super-admin/creation",
      icon: PlusCircle,
    },
  ],

  INSTITUTION_MANAGER: [
    {
      label: "Dashboard",
      href: "/institution-manager",
      icon: LayoutDashboard,
    },
    {
      label: "Worklist",
      href: "/institution-manager/worklist",
      icon: ClipboardList,
    },
  ],

  SITE_ADMIN: [
    {
      label: "Dashboard",
      href: "/site-admin",
      icon: LayoutDashboard,
    },
    {
      label: "Worklist",
      href: "/site-admin/worklist",
      icon: ClipboardList,
    },
    {
      label: "Creation",
      href: "/site-admin/creation",
      icon: PlusCircle,
    },
  ],

  TECHNICIAN: [
    {
      label: "Worklist",
      href: "/technician",
      icon: ClipboardList,
    },
  ],

  DOCTOR: [
    {
      label: "Worklist",
      href: "/doctor",
      icon: ClipboardList,
    },
  ],

  OPERATION_HEAD: [
    {
      label: "Dashboard",
      href: "/operation-head",
      icon: LayoutDashboard,
    },
    {
      label: "Creation",
      href: "/operation-head/creation",
      icon: PlusCircle,
    },
  ],

  OPERATOR: [
    {
      label: "Worklist",
      href: "/operator",
      icon: ClipboardList,
    },
  ],
} as const;