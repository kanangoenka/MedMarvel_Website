"use client";

import { useEffect, useState } from "react";
import StatsGrid from "@/components/dashboard/StatsGrid";

export default function SiteAdminPage() {
  const [stats, setStats] = useState([
    {
      title: "Total Doctors",
      value: 0,
      description: "Assigned to this site",
    },
    {
      title: "Total Technicians",
      value: 0,
      description: "Working at this site",
    },
    {
      title: "Total Cases",
      value: 0,
      description: "Uploaded in this site",
    },
  ]);

  useEffect(() => {
    fetchDashboard();
  }, []);

  async function fetchDashboard() {
    try {
      const response = await fetch(
        "/api/dashboard/site-admin"
      );

      if (!response.ok) {
        throw new Error(
          "Failed to load dashboard"
        );
      }

      const data =
        await response.json();

      setStats([
        {
          title: "Total Doctors",
          value: data.doctors,
          description:
            "Assigned to this site",
        },
        {
          title:
            "Total Technicians",
          value:
            data.technicians,
          description:
            "Working at this site",
        },
        {
          title: "Total Cases",
          value: data.studies,
          description:
            "Uploaded in this site",
        },
      ]);
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">
          Site Manager Dashboard
        </h1>

        <p className="text-gray-500 mt-1">
          Overview of site resources and cases.
        </p>
      </div>

      <StatsGrid stats={stats} />
    </div>
  );
}