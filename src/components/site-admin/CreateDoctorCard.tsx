"use client";

import { useState } from "react";

type CreateDoctorCardProps = {
  onSuccess?: () => void;

  initialData?: {
    id: string;
    name: string;
    email: string;
  };

  mode?: "create" | "edit";
};

export default function CreateDoctorCard({
  onSuccess,
  initialData,
  mode = "create",
}: CreateDoctorCardProps) {
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
      ? `/api/site-admin/update-doctor/${initialData?.id}`
      : "/api/site-admin/create-doctor",
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

      const data =
        await response.json();

      if (!response.ok) {
        alert(
          data.error ||
  (mode === "edit"
    ? "Failed to update doctor"
    : "Failed to create doctor")
        );
        return;
      }

      setName("");
setEmail("");
setPassword("");

onSuccess?.();

    } catch (error) {
      console.error(error);

      alert(
        "Failed to create doctor"
      );
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="bg-white rounded-2xl p-6 shadow">

      <h2 className="text-lg font-bold mb-4">
  {mode === "edit"
    ? "Edit Doctor"
    : "Create Doctor"}
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
  : "Create Doctor"}
        </button>

      </div>

    </div>
  );
}