"use client";
import { useEffect, useState } from "react";
import { Bell } from "lucide-react";

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
    if (user?.role === "ADMIN") return "A";
    if (user?.name) return user.name[0].toUpperCase();
    return "U";
  };

  const getDisplayName = () => {
    if (!user) return "Loading...";
    if (user.role === "ADMIN") return "Admin";
    return user.name;
  };

  const getSubLabel = () => {
    if (!user) return "";
    if (user.role === "ADMIN") return "System Administrator";
    if (user.role === "OPERATOR") {
      if (user.institution?.name) return `Operator · ${user.institution.name}`;
      return "Operator";
    }
    if (user.site?.name && user.institution?.name) {
      return `${user.site.name} · ${user.institution.name}`;
    }
    if (user.institution?.name) return user.institution.name;
    return "Doctor";
  };

  const getAvatarColor = () => {
    if (user?.role === "ADMIN") return "bg-violet-600";
    if (user?.role === "OPERATOR") return "bg-teal-600";
    return "bg-blue-600";
  };

  return (
    <div className="h-16 bg-[#071739] border-b border-white/10 flex items-center justify-between px-6">

      {/* LEFT — Text branding only, no logo */}
      <div className="flex flex-col justify-center">
        <h1 className="text-[15px] font-bold tracking-wide text-white leading-tight">
          MedVirtuoso
        </h1>
        <p className="text-[10px] text-blue-300 font-medium tracking-wider leading-tight">
          Advanced Medical Imaging Platform
        </p>
      </div>

      {/* RIGHT */}
      <div className="flex items-center gap-5">

        {/* NOTIFICATIONS */}
        <button className="relative text-white/70 hover:text-white transition">
          <Bell size={18} />
          <span className="absolute -top-1 -right-1 h-2 w-2 rounded-full bg-red-500" />
        </button>

        {/* USER */}
        <div className="flex items-center gap-3">
          <div
            className={`h-9 w-9 rounded-xl flex items-center justify-center text-white text-sm font-bold ${getAvatarColor()}`}
          >
            {getInitial()}
          </div>

          <div className="leading-tight">
            <div className="flex items-center gap-2">
              <p className="text-sm font-semibold text-white">
                {getDisplayName()}
              </p>
              {user?.role === "ADMIN" && (
                <span className="text-[10px] font-bold bg-violet-500/20 text-violet-300 border border-violet-500/30 px-2 py-0.5 rounded-full">
                  Admin
                </span>
              )}
            </div>
            <p className="text-[11px] text-blue-200">
              {getSubLabel()}
            </p>
          </div>
        </div>

        {/* LOGOUT */}
        <button
          onClick={async () => {
            await fetch("/api/auth/logout", { method: "POST" });
            window.location.href = "/login";
          }}
          className="bg-red-500/90 hover:bg-red-600 text-white text-sm px-4 py-1.5 rounded-lg transition font-medium"
        >
          Logout
        </button>
      </div>
    </div>
  );
}