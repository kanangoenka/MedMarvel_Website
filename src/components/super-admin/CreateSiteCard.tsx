"use client";

import { useEffect, useState } from "react";

type Institution = {
  id: string;
  name: string;
};

export default function CreateSiteCard() {
  const [siteName, setSiteName] =
    useState("");

  const [institutionId, setInstitutionId] =
    useState("");

  const [institutions, setInstitutions] =
    useState<Institution[]>([]);

  useEffect(() => {
    fetchInstitutions();
  }, []);

  async function fetchInstitutions() {
    try {
      const response = await fetch(
        "/api/admin/institutions"
      );

      const data = await response.json();

if (Array.isArray(data)) {
  setInstitutions(data);
} else {
  console.error(data);
  setInstitutions([]);
}
    } catch (error) {
      console.error(error);
    }
  }

  async function handleSubmit() {
    const response = await fetch(
      "/api/super-admin/create-site",
      {
        method: "POST",

        headers: {
          "Content-Type":
            "application/json",
        },

        body: JSON.stringify({
          siteName,
          institutionId,
        }),
      }
    );

    const data =
      await response.json();

    if (!response.ok) {
      alert(data.error);
      return;
    }

    alert("Site created successfully");

    setSiteName("");
    setInstitutionId("");
  }

  return (
    <div className="bg-white rounded-2xl p-6 shadow">
      <h2 className="font-bold text-lg mb-4">
        Create Site
      </h2>

      <div className="space-y-3">

        <select
          value={institutionId}
          onChange={(e) =>
            setInstitutionId(
              e.target.value
            )
          }
          className="w-full border rounded-xl p-3"
        >
          <option value="">
            Select Institution
          </option>

          {institutions.map(
            (institution) => (
              <option
                key={institution.id}
                value={institution.id}
              >
                {institution.name}
              </option>
            )
          )}
        </select>

        <input
          className="w-full border rounded-xl p-3"
          placeholder="Site Name"
          value={siteName}
          onChange={(e) =>
            setSiteName(
              e.target.value
            )
          }
        />

        <button
          onClick={handleSubmit}
          className="w-full bg-[#071739] text-white rounded-xl p-3"
        >
          Create Site
        </button>
      </div>
    </div>
  );
}