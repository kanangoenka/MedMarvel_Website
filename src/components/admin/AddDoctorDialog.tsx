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

type Site = {
  id: string;
  name: string;
};

export default function AddDoctorDialog() {
  const router = useRouter();

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
    fetch("/api/admin/sites")
      .then((res) => res.json())
      .then(setSites);
  }, []);

  async function handleSubmit() {
    if (
      !name ||
      !email ||
      !password ||
      !siteId
    ) {
      return;
    }

    try {
      setLoading(true);

      const response = await fetch(
        "/api/admin/doctors",
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

      if (!response.ok) {
        throw new Error();
      }

      router.refresh();

      setName("");
      setEmail("");
      setPassword("");
      setSiteId("");
    } catch (error) {
      console.error(error);

      alert(
        "Failed to create doctor"
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
            Add Doctor
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-4 mt-2">
          <Input
            placeholder="Doctor Name"
            value={name}
            onChange={(e) =>
              setName(e.target.value)
            }
            className="rounded-xl border border-gray-200 px-3.5 py-2.5 h-10 text-sm outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 bg-white shadow-xs transition-all"
          />

          <Input
            placeholder="Email"
            value={email}
            onChange={(e) =>
              setEmail(e.target.value)
            }
            className="rounded-xl border border-gray-200 px-3.5 py-2.5 h-10 text-sm outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 bg-white shadow-xs transition-all"
          />

          <Input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) =>
              setPassword(e.target.value)
            }
            className="rounded-xl border border-gray-200 px-3.5 py-2.5 h-10 text-sm outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 bg-white shadow-xs transition-all"
          />

          <Select
            value={siteId}
            onValueChange={(val) => setSiteId(val ?? "")}
          >
            <SelectTrigger className="w-full rounded-xl border border-gray-200 px-3.5 h-10 text-sm bg-white text-left text-gray-700 shadow-xs focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all">
              <SelectValue placeholder="Select Site" />
            </SelectTrigger>

            <SelectContent className="rounded-xl border border-gray-100 bg-white p-1 shadow-lg max-h-60 overflow-y-auto z-[9999]">
              {sites.map((site) => (
                <SelectItem
                  key={site.id}
                  value={site.id}
                  className="rounded-lg px-3 py-2 text-sm text-gray-700 hover:bg-gray-50 focus:bg-blue-50 focus:text-blue-700 cursor-pointer transition-colors"
                >
                  {site.name}
                </SelectItem>
              ))}
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