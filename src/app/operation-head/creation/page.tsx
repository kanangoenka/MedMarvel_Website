"use client";

import { useState } from "react";

import CreateOperatorCard from "@/components/operation-head/CreateOperatorCard";

import {
  Dialog,
  DialogContent,
} from "@/components/ui/dialog";

export default function CreationPage() {
  const [operatorOpen, setOperatorOpen] =
    useState(false);

  return (
    <div className="p-6 space-y-8">

      <div>
        <h1 className="text-4xl font-bold text-slate-900">
          Operator Creation
        </h1>

        <p className="text-slate-500 mt-2">
          Create operators and assign them to sites.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">

        <button
          onClick={() =>
            setOperatorOpen(true)
          }
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
            + Create Operator
          </div>

          <p className="text-slate-500 mt-2">
            Add a new operator and assign sites
          </p>
        </button>

      </div>

      <Dialog
        open={operatorOpen}
        onOpenChange={setOperatorOpen}
      >
        <DialogContent className="max-w-2xl">
          <CreateOperatorCard />
        </DialogContent>
      </Dialog>

    </div>
  );
}