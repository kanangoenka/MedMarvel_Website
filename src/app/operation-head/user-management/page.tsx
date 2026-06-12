"use client";

import { useEffect, useState } from "react";

import CreateOperatorCard from "@/components/operation-head/CreateOperatorCard";

import { Pencil, Trash2, Plus } from "lucide-react";

import {
  Dialog,
  DialogContent,
} from "@/components/ui/dialog";

export default function UserManagementPage() {
  const [operatorOpen, setOperatorOpen] = useState(false);
  const [operators, setOperators] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingOperator, setEditingOperator] = useState<any>(null);
  const [editOperatorOpen, setEditOperatorOpen] = useState(false);

  useEffect(() => {
  fetchOperators();
}, []);

async function fetchOperators() {
  try {
    const response =
      await fetch(
        "/api/operation-head/operators"
      );

    const data =
      await response.json();

    setOperators(data);
  } catch (error) {
    console.error(error);
  } finally {
    setLoading(false);
  }
}

  return (
    <div className="p-6 space-y-8">
      <div>
        <h1 className="text-4xl font-bold text-slate-900">
          User Management
        </h1>

        <p className="text-slate-500 mt-2">
          Manage operators and their site assignments.
        </p>
      </div>

      <div className="bg-white rounded-3xl shadow-sm border border-slate-200 overflow-hidden">

        <div className="flex items-center justify-between px-6 py-5 border-b border-slate-200">

          <div>
            <h2 className="text-2xl font-semibold text-slate-900">
              Operators
            </h2>

            <p className="text-sm text-slate-500">
              Create, edit and manage operators
            </p>
          </div>

          <button
            onClick={() =>
              setOperatorOpen(true)
            }
            className="
              flex items-center gap-2
              bg-[#071739]
              hover:bg-[#0b2559]
              text-white
              px-4 py-2.5
              rounded-xl
              transition
            "
          >
            <Plus size={18} />
            Create Operator
          </button>

        </div>

        <div className="overflow-x-auto">

          <table className="w-full">

            <thead className="bg-slate-50">

              <tr>

                <th className="px-6 py-4 text-left text-sm font-semibold text-slate-600">
                  Name
                </th>

                <th className="px-6 py-4 text-left text-sm font-semibold text-slate-600">
                  Email
                </th>

                <th className="px-6 py-4 text-left text-sm font-semibold text-slate-600">
                  Assigned Sites
                </th>

                <th className="px-6 py-4 text-center text-sm font-semibold text-slate-600">
                  Actions
                </th>

              </tr>

            </thead>

            <tbody>

  {operators.length === 0 ? (
    <tr>
      <td
        colSpan={4}
        className="
          text-center
          py-10
          text-slate-500
        "
      >
        No operators found
      </td>
    </tr>
  ) : (
    operators.map((operator: any) => (
      <tr
        key={operator.id}
        className="border-t"
      >
        <td className="px-6 py-4">
          {operator.name}
        </td>

        <td className="px-6 py-4">
          {operator.email}
        </td>

        <td className="px-6 py-4">
          {operator.operatorAssignments
            ?.map(
              (assignment: any) =>
                assignment.site.name
            )
            .join(", ")}
        </td>

        <td className="px-6 py-4">
          <div className="flex items-center justify-center gap-2">

            <button
  onClick={() => {
    setEditingOperator(operator);

    setEditOperatorOpen(true);
  }}
  className="
    p-2
    rounded-lg
    hover:bg-blue-100
    text-blue-600
    transition
  "
  title="Edit"
>
  <Pencil size={16} />
</button>

            <button
  onClick={async () => {
    const confirmed =
      window.confirm(
        `Delete ${operator.name}?`
      );

    if (!confirmed) {
      return;
    }

    try {
      const response =
        await fetch(
          `/api/operation-head/delete-operator/${operator.id}`,
          {
            method: "DELETE",
          }
        );

      const data =
        await response.json();

      if (!response.ok) {
        alert(
          data.error ||
            "Failed to delete operator"
        );

        return;
      }

      fetchOperators();
    } catch (error) {
      console.error(error);

      alert(
        "Failed to delete operator"
      );
    }
  }}
  className="
    p-2
    rounded-lg
    hover:bg-red-100
    text-red-600
    transition
  "
  title="Delete"
>
  <Trash2 size={16} />
</button>

          </div>
        </td>
      </tr>
    ))
  )}

            </tbody>

          </table>

        </div>

      </div>

      <Dialog
        open={operatorOpen}
        onOpenChange={setOperatorOpen}
      >
        <Dialog
  open={editOperatorOpen}
  onOpenChange={setEditOperatorOpen}
>
  <DialogContent className="max-w-2xl">

    {editingOperator && (
      <CreateOperatorCard
        mode="edit"
        initialData={{
          id: editingOperator.id,
          name: editingOperator.name,
          email: editingOperator.email,
          siteIds:
            editingOperator.operatorAssignments?.map(
              (assignment: any) =>
                assignment.site.id
            ) ?? [],
        }}
        onSuccess={() => {
          setEditOperatorOpen(false);

          setEditingOperator(null);

          fetchOperators();
        }}
      />
    )}

  </DialogContent>
</Dialog>
        <DialogContent className="max-w-2xl">

          <CreateOperatorCard
  onSuccess={() => {
    setOperatorOpen(false);

    fetchOperators();
  }}
/>

        </DialogContent>
      </Dialog>

    </div>
  );
}