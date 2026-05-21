import { Bell, LogOut } from "lucide-react";

export default function Navbar() {
  return (
    <div className="h-18 bg-[#071739] border-b border-white/10 flex items-center justify-between px-6 text-white shadow-sm">
      {/* LEFT */}
      <div>
        <h1 className="text-2xl font-bold tracking-wide">
          MEDVIRTUOSO
        </h1>

        <p className="text-sm text-blue-100 mt-1">
          MedMarvel Software Solutions
        </p>
      </div>

      {/* RIGHT */}
      <div className="flex items-center gap-6">
        {/* NOTIFICATION */}
        <button className="relative">
          <Bell size={22} />

          <span className="absolute -top-1 -right-1 h-2.5 w-2.5 rounded-full bg-red-500"></span>
        </button>

        {/* USER */}
        <div className="flex items-center gap-3">
          <div className="h-10 w-10 rounded-full bg-blue-600 flex items-center justify-center text-white font-bold text-base">
            A
          </div>

          <div>
            <p className="font-medium">
              Amit
            </p>

            <p className="text-sm text-gray-300">
              Client User
            </p>
          </div>
        </div>

        {/* LOGOUT */}
        <button className="flex items-center gap-2 bg-red-500 hover:bg-red-600 px-5 py-3 rounded-xl transition font-medium">
          <LogOut size={18} />

          Logout
        </button>
      </div>
    </div>
  );
}