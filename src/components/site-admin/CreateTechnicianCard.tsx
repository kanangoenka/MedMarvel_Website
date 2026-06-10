"use client";

import { useState } from "react";

export default function CreateTechnicianCard() {
  const [name, setName] =
    useState("");

  const [email, setEmail] =
    useState("");

  const [password, setPassword] =
    useState("");

  const [loading, setLoading] =
    useState(false);

  async function handleSubmit() {
    try {
      setLoading(true);

      const response =
        await fetch(
          "/api/site-admin/create-technition",
          {
            method: "POST",

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
            "Failed to create technician"
        );
        return;
      }

      alert(
        "Technician created successfully"
      );

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
        Create Technician
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
            ? "Creating..."
            : "Create Technician"}
        </button>

      </div>

    </div>
  );
}