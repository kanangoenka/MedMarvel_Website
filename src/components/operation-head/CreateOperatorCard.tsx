"use client";

import { useEffect, useState } from "react";

type Site = {
  id: string;
  name: string;
};

export default function CreateOperatorCard() {
  const [name, setName] =
    useState("");

  const [email, setEmail] =
    useState("");

  const [password, setPassword] =
    useState("");

  const [sites, setSites] =
    useState<Site[]>([]);

  const [selectedSites, setSelectedSites] =
    useState<string[]>([]);

  const [loading, setLoading] =
    useState(false);

  useEffect(() => {
    fetchSites();
  }, []);

  async function fetchSites() {
    try {
      const response =
        await fetch("/api/admin/sites");

      const data =
        await response.json();

      if (Array.isArray(data)) {
        setSites(data);
      }
    } catch (error) {
      console.error(error);
    }
  }

  function toggleSite(
    siteId: string
  ) {
    setSelectedSites((prev) =>
      prev.includes(siteId)
        ? prev.filter(
            (id) => id !== siteId
          )
        : [...prev, siteId]
    );
  }

  async function handleSubmit() {
    try {
      setLoading(true);

      const response =
        await fetch(
          "/api/operation-head/create-operator",
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
              siteIds:
                selectedSites,
            }),
          }
        );

      const data =
        await response.json();

      if (!response.ok) {
        alert(
          data.error ||
            "Failed to create operator"
        );

        return;
      }

      alert(
        "Operator created successfully"
      );

      setName("");
      setEmail("");
      setPassword("");
      setSelectedSites([]);

    } catch (error) {
      console.error(error);

      alert(
        "Failed to create operator"
      );
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="bg-white rounded-2xl p-6 shadow">

      <h2 className="text-lg font-bold mb-4">
        Create Operator
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

        <div>
          <p className="font-medium mb-2">
            Assign Sites
          </p>

          <div className="max-h-48 overflow-y-auto border rounded-xl p-3 space-y-2">

            {sites.map((site) => (
              <label
                key={site.id}
                className="flex items-center gap-2"
              >
                <input
                  type="checkbox"
                  checked={selectedSites.includes(
                    site.id
                  )}
                  onChange={() =>
                    toggleSite(
                      site.id
                    )
                  }
                />

                {site.name}
              </label>
            ))}

          </div>
        </div>

        <button
          onClick={handleSubmit}
          disabled={loading}
          className="w-full bg-[#071739] text-white rounded-xl p-3"
        >
          {loading
            ? "Creating..."
            : "Create Operator"}
        </button>

      </div>

    </div>
  );
}