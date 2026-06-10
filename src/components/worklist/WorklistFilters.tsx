type WorklistFiltersProps = {
  showInstitution?: boolean;
  showSite?: boolean;
  showDoctor?: boolean;
  showStatus?: boolean;
};

export default function WorklistFilters({
  showInstitution = false,
  showSite = false,
  showDoctor = false,
  showStatus = false,
}: WorklistFiltersProps) {
  return (
    <div className="bg-white border rounded-2xl p-4">
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-5 gap-4">

        {showInstitution && (
          <select className="border rounded-lg px-3 py-2">
            <option>Select Institution</option>
            <option>Institution A</option>
            <option>Institution B</option>
          </select>
        )}

        {showSite && (
          <select className="border rounded-lg px-3 py-2">
            <option>Select Site</option>
            <option>Site A</option>
            <option>Site B</option>
          </select>
        )}

        {showDoctor && (
          <select className="border rounded-lg px-3 py-2">
            <option>Select Doctor</option>
            <option>Dr. Sharma</option>
            <option>Dr. Patel</option>
          </select>
        )}

        {showStatus && (
          <select className="border rounded-lg px-3 py-2">
            <option>Status</option>
            <option>Pending</option>
            <option>Completed</option>
          </select>
        )}

        <input
          type="text"
          placeholder="Search patient..."
          className="border rounded-lg px-3 py-2"
        />
      </div>
    </div>
  );
}