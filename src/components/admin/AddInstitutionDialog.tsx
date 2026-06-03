"use client";

import { useState } from "react";

import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import { Input } from "@/components/ui/input";

export default function AddInstitutionDialog() {
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
      <DialogTrigger className="mt-4 w-full">
  Add New
</DialogTrigger>

      <DialogContent>
        <DialogHeader>
          <DialogTitle>
            Add Institution
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-4">

          <Input
            placeholder="Institution Name"
            value={name}
            onChange={(e) =>
              setName(e.target.value)
            }
          />

          <Button
            className="w-full"
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