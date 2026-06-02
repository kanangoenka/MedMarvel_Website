import prisma from "@/lib/prisma";

export default async function UsersPage() {

  const users =
    await prisma.user.findMany({

      include: {
        assignedOperator: true,
      },

      

    });

  return (
    <div className="p-8">

      <div className="flex justify-between mb-6">

        <h1 className="text-3xl font-bold">
          Users
        </h1>

        <a
          href="/admin/users/new"
          className="bg-blue-600 text-white px-4 py-2 rounded-lg"
        >
          Create User
        </a>

      </div>

      <div className="bg-white rounded-xl shadow">

        <table className="w-full">

          <thead>
            <tr className="border-b">

              <th className="text-left p-4">
                Name
              </th>

              <th className="text-left p-4">
                Email
              </th>

              <th className="text-left p-4">
                Role
              </th>

              <th className="text-left p-4">
                Assigned Operator
              </th>

            </tr>
          </thead>

          <tbody>

            {users.map((user) => (

              <tr
                key={user.id}
                className="border-b"
              >

                <td className="p-4">
                  {user.name}
                </td>

                <td className="p-4">
                  {user.email}
                </td>

                <td className="p-4">
                  {user.role}
                </td>

                <td className="p-4">
                  {user.assignedOperator?.name || "-"}
                </td>

              </tr>

            ))}

          </tbody>

        </table>

      </div>

    </div>
  );
}