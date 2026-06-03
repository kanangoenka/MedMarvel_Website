"use client";
import Image from "next/image";
import { useEffect, useState } from "react";

import {
  Bell,
  LogOut,
} from "lucide-react";

export default function Navbar() {
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    async function fetchUser() {
      try {
        const res = await fetch("/api/auth/me");
        if (res.ok) {
          const data = await res.json();
          setUser(data);
        }
      } catch (error) {
        console.error("Error fetching user in Navbar:", error);
      }
    }
    fetchUser();
  }, []);

  const getInitial = () => {
    if (user?.name) {
      return user.name[0].toUpperCase();
    }
    return "U";
  };

  const getSubLabel = () => {
    if (!user) return "";
    if (user.role === "ADMIN") return "Admin Mode";
    if (user.site?.name && user.institution?.name) {
      return `${user.site.name} (${user.institution.name})`;
    }
    if (user.institution?.name) {
      return user.institution.name;
    }
    return user.role === "OPERATOR" ? "Operator" : "Client User";
  };

  return (
    <div className="h-16 bg-[#071739] border-b border-white/10 flex items-center justify-between px-6">
      {/* LEFT */}
      <div className="flex items-center gap-4">
        <Image
          src="/logo/logo.png"
          alt="MedVirtuoso Logo"
          width={52}
          height={52}
          
          priority
          className="rounded-md"
        />

        <div>
          <h1 className="text-lg font-semibold tracking-wide text-white">
            MEDVIRTUOSO
          </h1>

          <p className="text-[11px] text-blue-100">
            MedMarvel Software Solutions
          </p>
        </div>
      </div>

      {/* RIGHT */}
      <div className="flex items-center gap-5">
        {/* NOTIFICATIONS */}
        <button className="relative text-white/80 hover:text-white transition">
          <Bell size={19} />

          <span className="absolute -top-1 -right-1 h-2 w-2 rounded-xl bg-red-500"></span>
        </button>

        {/* USER */}
        <div className="flex items-center gap-3">
          <div className="h-9 w-9 rounded-xl bg-blue-600 flex items-center justify-center text-white text-sm font-semibold">
            {getInitial()}
          </div>

          <div className="leading-tight">
            <p className="text-sm font-medium text-white">
              {user?.name || "Loading..."}
            </p>

            <p className="text-xs text-blue-100">
              {getSubLabel()}
            </p>
          </div>
        </div>

        {/* LOGOUT */}
        <button
          onClick={async () => {
            await fetch(
              "/api/auth/logout",
              {
                method: "POST",
              }
            );

            window.location.href =
              "/login";
          }}
          className="bg-red-500 hover:bg-red-600 text-white px-5 py-2 rounded-xl transition"
        >
          Logout
        </button>
      </div>
    </div>
  );
}