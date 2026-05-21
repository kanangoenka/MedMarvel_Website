import { Bell } from "lucide-react";

export default function Navbar() {
  return (
    <div className="h-16 bg-white border-b border-gray-200 flex items-center justify-between px-6">
      <div>
        <h2 className="text-xl font-semibold text-gray-800">
          Client Dashboard
        </h2>

    
      </div>

      <div className="flex items-center gap-4">
        <button className="relative">
          <Bell className="text-gray-700" />

          <span className="absolute -top-1 -right-1 h-2 w-2 rounded-full bg-red-500"></span>
        </button>

        <div className="flex items-center gap-3">
          <div className="h-10 w-10 rounded-full bg-blue-600 flex items-center justify-center text-white font-bold">
            A
          </div>

          <div>
            <p className="text-sm font-medium text-gray-800">
              Amit
            </p>

            <p className="text-xs text-gray-500">
              Client User
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}