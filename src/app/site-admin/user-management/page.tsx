"use client";

import { useEffect, useState } from "react";

import CreateDoctorCard from "@/components/site-admin/CreateDoctorCard";
import CreateTechnicianCard from "@/components/site-admin/CreateTechnicianCard";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

export default function CreationPage() {
  const [doctorOpen, setDoctorOpen] = useState(false);
  const [technicianOpen, setTechnicianOpen] = useState(false);
  const [doctors, setDoctors] = useState<any[]>([]);
  const [technicians, setTechnicians] = useState<any[]>([]);
useEffect(() => {
  async function fetchData() {
    try {
      const doctorsResponse =
        await fetch(
          "/api/site-admin/doctors"
        );

      if (doctorsResponse.ok) {
        const doctorsData =
          await doctorsResponse.json();

        setDoctors(doctorsData);
      }

      const techniciansResponse =
        await fetch(
          "/api/site-admin/technicians"
        );

      if (techniciansResponse.ok) {
        const techniciansData =
          await techniciansResponse.json();

        setTechnicians(
          techniciansData
        );
      }
    } catch (error) {
      console.error(error);
    }
  }

  fetchData();
}, []);


  return (
    <div className="p-6 space-y-8">

      <div>
        <h1 className="text-4xl font-bold text-slate-900">
  User Management
</h1>

<p className="text-slate-500 mt-2">
  Create, view, edit and manage doctors and technicians for this site.
</p>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">

  {/* Doctors */}
  <div className="bg-white rounded-3xl border border-slate-200 p-6 shadow-sm">

    <div className="flex items-center justify-between mb-6">
      <div>
        <h2 className="text-2xl font-semibold text-slate-900">
          Doctors
        </h2>

        <p className="text-sm text-slate-500 mt-1">
          Manage doctors assigned to this site.
        </p>
      </div>

      <button
        onClick={() => setDoctorOpen(true)}
        className="
          bg-[#071739]
          hover:bg-[#0b2559]
          text-white
          px-4
          py-2
          rounded-xl
          text-sm
          font-medium
        "
      >
        + Create Doctor
      </button>
    </div>

    <div className="overflow-hidden rounded-2xl border border-slate-200">
  <table className="w-full">
    <thead className="bg-slate-50">
      <tr>
        <th className="text-left px-4 py-3 text-sm font-semibold">
          Name
        </th>

        <th className="text-left px-4 py-3 text-sm font-semibold">
          Email
        </th>

        <th className="text-left px-4 py-3 text-sm font-semibold">
          Actions
        </th>
      </tr>
    </thead>

    <tbody>
  {doctors.length === 0 ? (
    <tr>
      <td
        className="px-4 py-4 text-sm text-slate-500"
        colSpan={3}
      >
        No doctors found.
      </td>
    </tr>
  ) : (
    doctors.map((doctor) => (
      <tr
        key={doctor.id}
        className="border-t"
      >
        <td className="px-4 py-3">
          {doctor.name}
        </td>

        <td className="px-4 py-3">
          {doctor.email}
        </td>

        <td className="px-4 py-3">
  <div className="flex items-center gap-2">
    <button
      className="
        px-3 py-1
        rounded-lg
        bg-blue-100
        text-blue-700
        text-xs
        font-medium
      "
    >
      Edit
    </button>

    <button
      className="
        px-3 py-1
        rounded-lg
        bg-red-100
        text-red-700
        text-xs
        font-medium
      "
    >
      Delete
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

  {/* Technicians */}
  <div className="bg-white rounded-3xl border border-slate-200 p-6 shadow-sm">

    <div className="flex items-center justify-between mb-6">
      <div>
        <h2 className="text-2xl font-semibold text-slate-900">
          Technicians
        </h2>

        <p className="text-sm text-slate-500 mt-1">
          Manage technicians assigned to this site.
        </p>
      </div>

      <button
        onClick={() => setTechnicianOpen(true)}
        className="
          bg-[#071739]
          hover:bg-[#0b2559]
          text-white
          px-4
          py-2
          rounded-xl
          text-sm
          font-medium
        "
      >
        + Create Technician
      </button>
    </div>

    <div className="overflow-hidden rounded-2xl border border-slate-200">
  <table className="w-full">
    <thead className="bg-slate-50">
      <tr>
        <th className="text-left px-4 py-3 text-sm font-semibold">
          Name
        </th>

        <th className="text-left px-4 py-3 text-sm font-semibold">
          Email
        </th>

        <th className="text-left px-4 py-3 text-sm font-semibold">
          Actions
        </th>
      </tr>
    </thead>

    <tbody>
  {technicians.length === 0 ? (
    <tr>
      <td
        className="px-4 py-4 text-sm text-slate-500"
        colSpan={3}
      >
        No technicians found.
      </td>
    </tr>
  ) : (
    technicians.map((technician) => (
      <tr
        key={technician.id}
        className="border-t"
      >
        <td className="px-4 py-3">
          {technician.name}
        </td>

        <td className="px-4 py-3">
          {technician.email}
        </td>

        <td className="px-4 py-3">
  <div className="flex items-center gap-2">
    <button
      className="
        px-3 py-1
        rounded-lg
        bg-blue-100
        text-blue-700
        text-xs
        font-medium
      "
    >
      Edit
    </button>

    <button
      className="
        px-3 py-1
        rounded-lg
        bg-red-100
        text-red-700
        text-xs
        font-medium
      "
    >
      Delete
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

</div>

      <Dialog
        open={doctorOpen}
        onOpenChange={setDoctorOpen}
      >
        <DialogContent className="max-w-2xl">

          <CreateDoctorCard />
        </DialogContent>
      </Dialog>

      <Dialog
        open={technicianOpen}
        onOpenChange={setTechnicianOpen}
      >
        <DialogContent className="max-w-2xl">

          <CreateTechnicianCard />
        </DialogContent>
      </Dialog>

    </div>
  );
}