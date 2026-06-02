export default function AdminPage() {
  return (
    <div className="p-8">

      <h1 className="text-3xl font-bold mb-8">
        Admin Dashboard
      </h1>

      <div className="grid grid-cols-3 gap-6">

        <a
          href="/admin/users"
          className="bg-white rounded-xl shadow p-6 hover:shadow-lg"
        >
          <h2 className="text-xl font-semibold">
            Users
          </h2>

          <p className="text-gray-500 mt-2">
            Manage doctors and operators
          </p>
        </a>

      </div>

    </div>
  );
}