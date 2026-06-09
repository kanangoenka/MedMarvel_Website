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

export default function CreateOperationHeadModal() {
  const router = useRouter();

  const [name, setName] =
    useState("");

  const [email, setEmail] =
    useState("");

  const [password, setPassword] =
    useState("");

  const [loading, setLoading] =
    useState(false);

  async function handleSubmit() {
    if (
      !name ||
      !email ||
      !password
    ) {
      alert("Please fill all fields");
      return;
    }

    try {
      setLoading(true);

      const response = await fetch(
        "/api/super-admin/create-operation-head",
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
          }),
        }
      );

      const data =
        await response.json();

      if (!response.ok) {
        alert(
          data.error ||
            "Failed to create operation head"
        );
        return;
      }

      alert(
        "Operation Head created successfully"
      );

      setName("");
      setEmail("");
      setPassword("");

      router.refresh();
    } catch (error) {
      console.error(error);

      alert(
        "Failed to create operation head"
      );
    } finally {
      setLoading(false);
    }
  }

  return (
    <Dialog>
      <DialogTrigger
        render={
          <Button className="w-full">
            Create Operation Head
          </Button>
        }
      />

      <DialogContent className="rounded-2xl border border-gray-100 p-6 shadow-xl bg-white max-w-md w-full">
        <DialogHeader className="pb-2">
          <DialogTitle className="text-lg font-bold text-[#071739]">
            Add Operation Head
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-4 mt-2">
          <Input
            placeholder="Operation Head Name"
            value={name}
            onChange={(e) =>
              setName(e.target.value)
            }
            className="rounded-xl border border-gray-200 px-3.5 py-2.5 h-11 text-sm"
          />

          <Input
            placeholder="User ID"
            value={userId}
            onChange={(e) =>
              setUserId(e.target.value)
            }
            className="rounded-xl border border-gray-200 px-3.5 py-2.5 h-11 text-sm"
          />

          <Input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) =>
              setPassword(e.target.value)
            }
            className="rounded-xl border border-gray-200 px-3.5 py-2.5 h-11 text-sm"
          />

          <Button
            onClick={handleSubmit}
            className="w-full bg-[#071739] hover:bg-[#0b2559] text-white rounded-xl py-2 h-11 font-semibold transition-all border-none cursor-pointer"
          >
            Create Operation Head
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}