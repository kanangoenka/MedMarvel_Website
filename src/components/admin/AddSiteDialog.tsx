"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Plus } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

type Institution = {
  id: string;
  name: string;
};

export default function AddSiteDialog() {
  const router = useRouter();

  const [name, setName] = useState("");
  const [institutionId, setInstitutionId] =
    useState("");

  const [institutions, setInstitutions] =
    useState<Institution[]>([]);

  const [loading, setLoading] =
    useState(false);

  useEffect(() => {
    fetch("/api/admin/institutions")
      .then((res) => res.json())
      .then(setInstitutions);
  }, []);

  async function handleSubmit() {
    if (!name || !institutionId) return;

    try {
      setLoading(true);

      const response = await fetch(
        "/api/admin/sites",
        {
          method: "POST",
          headers: {
            "Content-Type":
              "application/json",
          },
          body: JSON.stringify({
            name,
            institutionId,
          }),
        }
      );

      if (!response.ok) {
        throw new Error();
      }

      router.refresh();

      setName("");
      setInstitutionId("");
    } catch (error) {
      console.error(error);
      alert("Failed to create site");
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
            Add Site
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-4 mt-2">
          <Input
            placeholder="Site Name"
            value={name}
            onChange={(e) =>
              setName(e.target.value)
            }
            className="rounded-xl border border-gray-200 px-3.5 py-2.5 h-10 text-sm outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 bg-white shadow-xs transition-all"
          />

          <Select
            value={institutionId}
            onValueChange={(val) => setInstitutionId(val ?? "")}
          >
            <SelectTrigger className="w-full rounded-xl border border-gray-200 px-3.5 h-10 text-sm bg-white text-left text-gray-700 shadow-xs focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all">
              <SelectValue placeholder="Select Institution" />
            </SelectTrigger>

            <SelectContent className="rounded-xl border border-gray-100 bg-white p-1 shadow-lg max-h-60 overflow-y-auto z-[9999]">
              {institutions.map(
                (institution) => (
                  <SelectItem
                    key={institution.id}
                    value={institution.id}
                    className="rounded-lg px-3 py-2 text-sm text-gray-700 hover:bg-gray-50 focus:bg-blue-50 focus:text-blue-700 cursor-pointer transition-colors"
                  >
                    {institution.name}
                  </SelectItem>
                )
              )}
            </SelectContent>
          </Select>

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