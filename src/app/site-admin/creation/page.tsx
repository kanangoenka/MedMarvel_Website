"use client";

import { useState } from "react";

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

  return (
    <div className="p-6 space-y-8">

      <div>
        <h1 className="text-4xl font-bold text-slate-900">
          User Creation
        </h1>

        <p className="text-slate-500 mt-2">
          Create doctors and technicians for this site.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">

        <button
          onClick={() => setDoctorOpen(true)}
          className="
            h-40
            rounded-3xl
            border-2
            border-dashed
            border-slate-300
            bg-white
            hover:border-blue-500
            hover:bg-blue-50
            transition-all
            shadow-sm
          "
        >
          <div className="text-2xl font-bold text-slate-800">
            + Create Doctor
          </div>

          <p className="text-slate-500 mt-2">
            Add a new doctor to this site
          </p>
        </button>

        <button
          onClick={() => setTechnicianOpen(true)}
          className="
            h-40
            rounded-3xl
            border-2
            border-dashed
            border-slate-300
            bg-white
            hover:border-blue-500
            hover:bg-blue-50
            transition-all
            shadow-sm
          "
        >
          <div className="text-2xl font-bold text-slate-800">
            + Create Technician
          </div>

          <p className="text-slate-500 mt-2">
            Add a new technician to this site
          </p>
        </button>

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