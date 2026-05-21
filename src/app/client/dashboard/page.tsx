export default function ClientDashboard() {
  return (
    <div>
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-gray-800">
          MedVirtuoso Client Dashboard
        </h1>

        <p className="text-gray-500 mt-2">
          Manage studies and track reports
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white rounded-2xl shadow-sm p-6">
          <h2 className="text-gray-500 text-sm">
            Total Cases
          </h2>

          <p className="text-3xl font-bold mt-2">
            24
          </p>
        </div>

        <div className="bg-white rounded-2xl shadow-sm p-6">
          <h2 className="text-gray-500 text-sm">
            Ready Cases
          </h2>

          <p className="text-3xl font-bold mt-2 text-green-600">
            10
          </p>
        </div>

        <div className="bg-white rounded-2xl shadow-sm p-6">
          <h2 className="text-gray-500 text-sm">
            Pending Cases
          </h2>

          <p className="text-3xl font-bold mt-2 text-yellow-600">
            14
          </p>
        </div>
      </div>
    </div>
  );
}