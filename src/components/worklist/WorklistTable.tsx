import WorklistActionDialog from "./WorklistActionDialog";

type CaseRow = {
  patient: string;
  institution?: string;
  site?: string;
  doctor?: string;
  status: string;

  files?: string[];

  report?: string | null;
};

type WorklistTableProps = {
  cases: CaseRow[];
};

export default function WorklistTable({
  cases,
}: WorklistTableProps) {
  return (
    <div className="bg-white border rounded-2xl overflow-hidden shadow-sm">
      <table className="w-full">
        <thead className="bg-gray-50">
          <tr>
            <th className="text-left p-4 font-semibold">
              Patient
            </th>

            <th className="text-left p-4 font-semibold">
              Institution
            </th>

            <th className="text-left p-4 font-semibold">
              Site
            </th>

            <th className="text-left p-4 font-semibold">
              Doctor
            </th>

            <th className="text-left p-4 font-semibold">
              Status
            </th>

            <th className="text-left p-4 font-semibold">
              Action
            </th>
          </tr>
        </thead>

        <tbody>
          {(cases ?? []).map((item, index) => (
            <tr
              key={index}
              className="border-t hover:bg-gray-50 transition"
            >
              <td className="p-4">
                {item.patient}
              </td>

              <td className="p-4">
                {item.institution ?? "-"}
              </td>

              <td className="p-4">
                {item.site ?? "-"}
              </td>

              <td className="p-4">
                {item.doctor ?? "-"}
              </td>

              <td className="p-4">
                <span
                  className={`px-3 py-1 rounded-full text-xs font-medium ${
                    item.status === "Completed"
                      ? "bg-green-100 text-green-700"
                      : "bg-yellow-100 text-yellow-700"
                  }`}
                >
                  {item.status}
                </span>
              </td>

              <td className="p-4">
                <div className="flex items-center gap-2">
                  <WorklistActionDialog
                  type="viewer"
                  />
                  
                  <WorklistActionDialog
                  type="files"
                  files={item.files}
                  />
                  
                  <WorklistActionDialog
                  type="report"
                  report={item.report}
                  />
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}