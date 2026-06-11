"use client";

import { useState } from "react";

import CreateInstitutionCard from "@/components/super-admin/CreateInstitutionCard";
import CreateSiteCard from "@/components/super-admin/CreateSiteCard";
import CreateSiteAdminCard from "@/components/super-admin/CreateSiteAdminCard";
import CreateOperationHeadCard from "@/components/super-admin/CreateOperationHeadCard";

import {
  Dialog,
  DialogContent,
} from "@/components/ui/dialog";

export default function CreationPage() {
  const [institutionOpen, setInstitutionOpen] = useState(false);
  const [siteOpen, setSiteOpen] = useState(false);
  const [siteAdminOpen, setSiteAdminOpen] = useState(false);
  const [operationHeadOpen, setOperationHeadOpen] = useState(false);

  return (
    <div className="p-6 space-y-8">

      <div>
        <h1 className="text-4xl font-bold text-slate-900">
          User Creation
        </h1>

        <p className="text-slate-500 mt-2">
          Create institutions, sites and users.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">

        <button
          onClick={() => setInstitutionOpen(true)}
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
            + Create Institution
          </div>

          <p className="text-slate-500 mt-2">
            Register a new institution
          </p>
        </button>

        <button
          onClick={() => setSiteOpen(true)}
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
            + Create Site
          </div>

          <p className="text-slate-500 mt-2">
            Add a site under an institution
          </p>
        </button>

        <button
          onClick={() => setSiteAdminOpen(true)}
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
            + Create Site Admin
          </div>

          <p className="text-slate-500 mt-2">
            Create a site administrator
          </p>
        </button>

        <button
          onClick={() => setOperationHeadOpen(true)}
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
            + Create Operation Head
          </div>

          <p className="text-slate-500 mt-2">
            Create an operation head user
          </p>
        </button>

      </div>

      <Dialog
        open={institutionOpen}
        onOpenChange={setInstitutionOpen}
      >
        <DialogContent className="max-w-2xl">
          <CreateInstitutionCard />
        </DialogContent>
      </Dialog>

      <Dialog
        open={siteOpen}
        onOpenChange={setSiteOpen}
      >
        <DialogContent className="max-w-2xl">
          <CreateSiteCard />
        </DialogContent>
      </Dialog>

      <Dialog
        open={siteAdminOpen}
        onOpenChange={setSiteAdminOpen}
      >
        <DialogContent className="max-w-2xl">
          <CreateSiteAdminCard />
        </DialogContent>
      </Dialog>

      <Dialog
        open={operationHeadOpen}
        onOpenChange={setOperationHeadOpen}
      >
        <DialogContent className="max-w-2xl">
          <CreateOperationHeadCard />
        </DialogContent>
      </Dialog>

    </div>
  );
}