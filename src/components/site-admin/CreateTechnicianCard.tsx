"use client";

import { useState } from "react";

type CreateTechnicianCardProps = {
  onSuccess?: () => void;

  initialData?: {
    id: string;
    name: string;
    email: string;
  };

  mode?: "create" | "edit";
};

export default function CreateTechnicianCard({
  onSuccess,
  initialData,
  mode = "create",
}: CreateTechnicianCardProps) {
  const [name, setName] =
  useState(
    initialData?.name ?? ""
  );

const [email, setEmail] =
  useState(
    initialData?.email ?? ""
  );

const [password, setPassword] =
  useState("");

  const [loading, setLoading] =
    useState(false);

  async function handleSubmit() {
    try {
      setLoading(true);

      const response =
  await fetch(
    mode === "edit"
      ? `/api/site-admin/update-technician/${initialData?.id}`
      : "/api/site-admin/create-technician",
    {
      method:
        mode === "edit"
          ? "PATCH"
          : "POST",

      headers: {
        "Content-Type":
          "application/json",
      },

      body: JSON.stringify({
        name,
        email,
        password,
      }),
    }
  );

      const text = await response.text();
console.log("RESPONSE:", text);

if (!response.ok) {
  console.log("STATUS:", response.status);
  alert("Request failed");
  return;
}

const data = JSON.parse(text);

      if (!response.ok) {
        alert(
          data.error ||
  (mode === "edit"
    ? "Failed to update technician"
    : "Failed to create technician")
        );
        return;
      }

      onSuccess?.();

      setName("");
      setEmail("");
      setPassword("");

    } catch (error) {
      console.error(error);

      alert(
        "Failed to create technician"
      );
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="bg-white rounded-2xl p-6 shadow">

      <h2 className="text-lg font-bold mb-4">
        {mode === "edit"
  ? "Edit Technician"
  : "Create Technician"}
      </h2>

      <div className="space-y-3">

        <input
          className="w-full border rounded-xl p-3"
          placeholder="Full Name"
          value={name}
          onChange={(e) =>
            setName(e.target.value)
          }
        />

        <input
          className="w-full border rounded-xl p-3"
          placeholder="Email"
          value={email}
          onChange={(e) =>
            setEmail(e.target.value)
          }
        />

        <input
          type="password"
          className="w-full border rounded-xl p-3"
          placeholder="Password"
          value={password}
          onChange={(e) =>
            setPassword(
              e.target.value
            )
          }
        />

        <button
          onClick={handleSubmit}
          disabled={loading}
          className="w-full bg-[#071739] text-white rounded-xl p-3"
        >
          {loading
  ? mode === "edit"
    ? "Saving..."
    : "Creating..."
  : mode === "edit"
  ? "Save Changes"
  : "Create Technician"}
        </button>

      </div>

    </div>
  );
}