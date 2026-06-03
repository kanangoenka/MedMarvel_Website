"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Plus } from "lucide-react";

import { Button } from "@/components/ui/button";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import { Input } from "@/components/ui/input";

export default function AddInstitutionDialog() {
  const router = useRouter();
  const [name, setName] = useState("");
  const [loading, setLoading] =
    useState(false);

  async function handleSubmit() {
    if (!name.trim()) return;

    try {
      setLoading(true);

      const response = await fetch(
        "/api/admin/institutions",
        {
          method: "POST",
          headers: {
            "Content-Type":
              "application/json",
          },
          body: JSON.stringify({
            name,
          }),
        }
      );

      if (!response.ok) {
        throw new Error(
          "Failed to create institution"
        );
      }

      setName("");

      router.refresh();
    } catch (error) {
      console.error(error);

      alert(
        "Failed to create institution"
      );
    } finally {
      setLoading(false);
    }
  }

  return (
    <Dialog>
      <DialogTrigger
        render={
          <Button className="w-full bg-blue-600 hover:bg-blue-700 text-white rounded-xl py-2 h-10 flex items-center justify-center gap-1.5 font-medium transition-all border-none shadow-xs cursor-pointer">
            <Plus className="w-4 h-4" />
            Add New
          </Button>
        }
      />

      <DialogContent className="rounded-2xl border border-gray-100 p-6 shadow-xl bg-white max-w-sm w-full">
        <DialogHeader className="pb-2">
          <DialogTitle className="text-lg font-bold text-[#071739]">
            Add Institution
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-4 mt-2">
          <Input
            placeholder="Institution Name"
            value={name}
            onChange={(e) =>
              setName(e.target.value)
            }
            className="rounded-xl border border-gray-200 px-3.5 py-2.5 h-10 text-sm outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 bg-white shadow-xs transition-all"
          />

          <Button
            className="w-full bg-[#071739] hover:bg-[#0b2559] text-white rounded-xl py-2 h-10 font-semibold transition-all border-none mt-2 cursor-pointer"
            onClick={handleSubmit}
            disabled={loading}
          >
            {loading
              ? "Saving..."
              : "Save"}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}