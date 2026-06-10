type RoleWorklistProps = {
  role:
    | "SUPER_ADMIN"
    | "INSTITUTION_MANAGER"
    | "SITE_ADMIN"
    | "TECHNICIAN"
    | "DOCTOR"
    | "OPERATOR";
};

export default function RoleWorklist({
  role,
}: RoleWorklistProps) {
  const canAddCase =
    role === "DOCTOR" ||
    role === "TECHNICIAN";

  const showInstitution =
    role === "SUPER_ADMIN";

  const showSite =
    role === "SUPER_ADMIN" ||
    role === "INSTITUTION_MANAGER";

  return (
    <div className="space-y-6">

      {canAddCase && (
        <div>
          <button className="bg-[#071739] hover:bg-[#0d275e] text-white px-6 py-3 rounded-2xl font-medium">
            + Add New Case
          </button>
        </div>
      )}

      <div className="bg-white rounded-3xl overflow-hidden shadow-sm">

        {/* Header */}
        <div className="p-6">
          <h1 className="text-4xl font-bold text-[#071739]">
            Worklist
          </h1>
        </div>

        {/* Search + Stats */}
        <div className="px-6 pb-6 flex flex-col xl:flex-row gap-6 justify-between">

          <div className="flex-1">
            <input
              type="text"
              placeholder="Search patients..."
              className="w-full max-w-xl border rounded-2xl px-5 py-3 outline-none"
            />
          </div>

          <div className="flex gap-3 flex-wrap">

            <div className="bg-gray-50 rounded-2xl px-6 py-4 min-w-[110px]">
              <p className="text-gray-500 text-sm">
                Total
              </p>

              <p className="text-3xl font-bold text-[#071739]">
                24
              </p>
            </div>

            <div className="bg-gray-50 rounded-2xl px-6 py-4 min-w-[110px]">
              <p className="text-gray-500 text-sm">
                Ready
              </p>

              <p className="text-3xl font-bold text-green-600">
                18
              </p>
            </div>

            <div className="bg-gray-50 rounded-2xl px-6 py-4 min-w-[110px]">
              <p className="text-gray-500 text-sm">
                Pending
              </p>

              <p className="text-3xl font-bold text-yellow-500">
                6
              </p>
            </div>

            <select className="border rounded-2xl px-5 py-3 min-w-[140px]">
              <option>All</option>
              <option>Pending</option>
              <option>Completed</option>
            </select>

          </div>

        </div>

        {/* Additional Filters */}
        {(showInstitution || showSite) && (
          <div className="px-6 pb-6 flex gap-4 flex-wrap">

            {showInstitution && (
              <select className="border rounded-xl px-4 py-2">
                <option>All Institutions</option>
                <option>Apollo</option>
                <option>Ruby Hall</option>
              </select>
            )}

            {showSite && (
              <select className="border rounded-xl px-4 py-2">
                <option>All Sites</option>
                <option>Pune</option>
                <option>Mumbai</option>
              </select>
            )}

          </div>
        )}

        {/* Table */}
        <div className="overflow-x-auto">

          <table className="w-full">

            <thead className="bg-gray-50">

              <tr>

                <th className="text-left px-8 py-5 font-semibold">
                  Patient
                </th>

                {showInstitution && (
                  <th className="text-left px-8 py-5 font-semibold">
                    Institution
                  </th>
                )}

                {showSite && (
                  <th className="text-left px-8 py-5 font-semibold">
                    Site
                  </th>
                )}

                <th className="text-left px-8 py-5 font-semibold">
                  Doctor
                </th>

                <th className="text-left px-8 py-5 font-semibold">
                  Uploaded Files
                </th>

                <th className="text-left px-8 py-5 font-semibold">
                  Status
                </th>

                <th className="text-left px-8 py-5 font-semibold">
                  Actions
                </th>

              </tr>

            </thead>

            <tbody>

              <tr className="border-t">

                <td className="px-8 py-5">
                  Rahul Sharma
                </td>

                {showInstitution && (
                  <td className="px-8 py-5">
                    Apollo
                  </td>
                )}

                {showSite && (
                  <td className="px-8 py-5">
                    Pune
                  </td>
                )}

                <td className="px-8 py-5">
                  Dr. Patil
                </td>

                <td className="px-8 py-5">
                  2 Files
                </td>

                <td className="px-8 py-5">
                  <span className="text-yellow-600 font-medium">
                    Pending
                  </span>
                </td>

                <td className="px-8 py-5">
                  <div className="flex items-center gap-4 text-lg">
                    <button title="Viewer">
                      👁
                    </button>

                    <button title="Files">
                      📄
                    </button>

                    <button title="Report">
                      ⬇
                    </button>
                  </div>
                </td>

              </tr>

            </tbody>

          </table>

        </div>

      </div>

    </div>
  );
}