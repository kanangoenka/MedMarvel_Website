"use client";

import { useState } from "react";
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

type Props = {
  onCreate: (institution: {
    id: string;
    institutionName: string;
    managerName: string;
    userId: string;
    password: string;
  }) => void;
};

export default function CreateInstitutionModal({
  onCreate,
}: Props) {
  const [institutionName, setInstitutionName] =
    useState("");

  const [managerName, setManagerName] =
    useState("");

  const [userId, setUserId] =
    useState("");

  const [password, setPassword] =
    useState("");

  function handleSubmit() {
    if (
      !institutionName.trim() ||
      !managerName.trim() ||
      !userId.trim() ||
      !password.trim()
    ) {
      alert("Please fill all fields");
      return;
    }

    onCreate({
      id: crypto.randomUUID(),
      institutionName,
      managerName,
      userId,
      password,
    });

    setInstitutionName("");
    setManagerName("");
    setUserId("");
    setPassword("");
  }

  return (
    <Dialog>
      <DialogTrigger
        render={
          <Button className="w-full bg-blue-600 hover:bg-blue-700 text-white rounded-xl py-2 h-10 flex items-center justify-center gap-1.5 font-medium transition-all border-none shadow-xs cursor-pointer">
            <Plus className="w-4 h-4" />
            Add Institution
          </Button>
        }
      />

      <DialogContent className="rounded-2xl border border-gray-100 p-6 shadow-xl bg-white max-w-md w-full">
        <DialogHeader className="pb-2">
          <DialogTitle className="text-lg font-bold text-[#071739]">
            Add Institution
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-4 mt-2">
          <Input
            placeholder="Institution Name"
            value={institutionName}
            onChange={(e) =>
              setInstitutionName(e.target.value)
            }
            className="rounded-xl border border-gray-200 px-3.5 py-2.5 h-11 text-sm outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 bg-white shadow-xs transition-all"
          />

          <Input
            placeholder="Institution Manager Name"
            value={managerName}
            onChange={(e) =>
              setManagerName(e.target.value)
            }
            className="rounded-xl border border-gray-200 px-3.5 py-2.5 h-11 text-sm outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 bg-white shadow-xs transition-all"
          />

          <Input
            placeholder="Institution Manager User ID"
            value={userId}
            onChange={(e) =>
              setUserId(e.target.value)
            }
            className="rounded-xl border border-gray-200 px-3.5 py-2.5 h-11 text-sm outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 bg-white shadow-xs transition-all"
          />

          <Input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) =>
              setPassword(e.target.value)
            }
            className="rounded-xl border border-gray-200 px-3.5 py-2.5 h-11 text-sm outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 bg-white shadow-xs transition-all"
          />

          <Button
            onClick={handleSubmit}
            className="w-full bg-[#071739] hover:bg-[#0b2559] text-white rounded-xl py-2 h-11 font-semibold transition-all border-none mt-2 cursor-pointer"
          >
            Create Institution
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}