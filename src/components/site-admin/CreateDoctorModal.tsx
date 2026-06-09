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
  onCreate: (doctor: {
    id: string;
    name: string;
    userId: string;
    password: string;
  }) => void;
};

export default function CreateDoctorModal({
  onCreate,
}: Props) {
  const [name, setName] = useState("");
  const [userId, setUserId] = useState("");
  const [password, setPassword] = useState("");

  function handleSubmit() {
    if (!name || !userId || !password) {
      alert("Please fill all fields");
      return;
    }

    onCreate({
      id: crypto.randomUUID(),
      name,
      userId,
      password,
    });

    setName("");
    setUserId("");
    setPassword("");
  }

  return (
    <Dialog>
      <DialogTrigger
        render={
          <Button className="w-full bg-blue-600 hover:bg-blue-700 text-white rounded-xl py-2 h-10">
            <Plus className="w-4 h-4 mr-2" />
            Add Doctor
          </Button>
        }
      />

      <DialogContent className="rounded-2xl border border-gray-100 p-6 shadow-xl bg-white max-w-md w-full">
        <DialogHeader>
          <DialogTitle className="text-lg font-bold text-[#071739]">
            Add Doctor
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-4 mt-2">
          <Input
            placeholder="Doctor Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />

          <Input
            placeholder="User ID"
            value={userId}
            onChange={(e) => setUserId(e.target.value)}
          />

          <Input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <Button
            onClick={handleSubmit}
            className="w-full bg-[#071739]"
          >
            Create Doctor
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
