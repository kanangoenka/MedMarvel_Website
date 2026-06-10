"use client";

import { useState } from "react";

export default function CreateInstitutionCard() {
  const [institutionName, setInstitutionName] =
    useState("");

  const [managerName, setManagerName] =
    useState("");

  const [managerEmail, setManagerEmail] =
    useState("");

  const [managerPassword, setManagerPassword] =
    useState("");

  async function handleSubmit() {
    const response = await fetch(
      "/api/super-admin/create-institution",
      {
        method: "POST",

        headers: {
          "Content-Type":
            "application/json",
        },

        body: JSON.stringify({
          institutionName,
          managerName,
          managerEmail,
          managerPassword,
        }),
      }
    );

    const data =
      await response.json();

    if (!response.ok) {
      alert(data.error);
      return;
    }

    alert(
      "Institution created successfully"
    );

    setInstitutionName("");
    setManagerName("");
    setManagerEmail("");
    setManagerPassword("");
  }

  return (
    <div className="bg-white rounded-2xl p-6 shadow">
      <h2 className="font-bold text-lg mb-4">
        Create Institution
      </h2>

      <div className="space-y-3">
        <input
          className="w-full border rounded-xl p-3"
          placeholder="Institution Name"
          value={institutionName}
          onChange={(e) =>
            setInstitutionName(
              e.target.value
            )
          }
        />

        <input
          className="w-full border rounded-xl p-3"
          placeholder="Manager Name"
          value={managerName}
          onChange={(e) =>
            setManagerName(
              e.target.value
            )
          }
        />

        <input
          className="w-full border rounded-xl p-3"
          placeholder="Manager Email"
          value={managerEmail}
          onChange={(e) =>
            setManagerEmail(
              e.target.value
            )
          }
        />

        <input
          type="password"
          className="w-full border rounded-xl p-3"
          placeholder="Password"
          value={managerPassword}
          onChange={(e) =>
            setManagerPassword(
              e.target.value
            )
          }
        />

        <button
          onClick={handleSubmit}
          className="w-full bg-[#071739] text-white rounded-xl p-3"
        >
          Create Institution
        </button>
      </div>
    </div>
  );
}