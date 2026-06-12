"use client";

import { useEffect, useState } from "react";
import StatsGrid from "@/components/dashboard/StatsGrid";

export default function InstitutionManagerPage() {
  const [stats, setStats] = useState([
    {
      title: "Total Sites",
      value: 0,
      description: "Under this institution",
    },
    {
      title: "Total Cases",
      value: 0,
      description: "Across all sites",
    },
  ]);

  useEffect(() => {
    fetchDashboard();
  }, []);

  async function fetchDashboard() {
    try {
      const response = await fetch(
        "/api/dashboard/institution-manager"
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
          title: "Total Sites",
          value: data.sites,
          description:
            "Under this institution",
        },
        {
          title: "Total Cases",
          value: data.studies,
          description:
            "Across all sites",
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
          Institution Manager Dashboard
        </h1>

        <p className="text-gray-500 mt-1">
          Overview of institution activity.
        </p>
      </div>

      <StatsGrid stats={stats} />
    </div>
  );
}