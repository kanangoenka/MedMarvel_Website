"use client";

import { useEffect, useState } from "react";

type Site = {
  id: string;
  name: string;
};

export default function CreateSiteAdminCard() {
  const [name, setName] =
    useState("");

  const [email, setEmail] =
    useState("");

  const [password, setPassword] =
    useState("");

  const [siteId, setSiteId] =
    useState("");

  const [sites, setSites] =
    useState<Site[]>([]);

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

      setSites(data);
    } catch (error) {
      console.error(error);
    }
  }

  async function handleSubmit() {
    try {
      setLoading(true);

      const response =
        await fetch(
          "/api/super-admin/create-site-admin",
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
              siteId,
            }),
          }
        );

      const data =
        await response.json();

      if (!response.ok) {
        alert(
          data.error ||
            "Failed to create site admin"
        );

        return;
      }

      alert(
        "Site Admin created successfully"
      );

      setName("");
      setEmail("");
      setPassword("");
      setSiteId("");

    } catch (error) {
      console.error(error);

      alert(
        "Failed to create site admin"
      );
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="bg-white rounded-2xl p-6 shadow">
      <h2 className="text-lg font-bold mb-4">
        Create Site Admin
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

        <select
          value={siteId}
          onChange={(e) =>
            setSiteId(
              e.target.value
            )
          }
          className="w-full border rounded-xl p-3"
        >
          <option value="">
            Select Site
          </option>

          {sites.map((site) => (
            <option
              key={site.id}
              value={site.id}
            >
              {site.name}
            </option>
          ))}
        </select>

        <button
          onClick={handleSubmit}
          disabled={loading}
          className="w-full bg-[#071739] text-white rounded-xl p-3"
        >
          {loading
            ? "Creating..."
            : "Create Site Admin"}
        </button>
      </div>
    </div>
  );
}