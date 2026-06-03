"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

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
      <DialogTrigger className="mt-4 w-full">
        Add New
      </DialogTrigger>

      <DialogContent>
        <DialogHeader>
          <DialogTitle>
            Add Site
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-4">

          <Input
            placeholder="Site Name"
            value={name}
            onChange={(e) =>
              setName(e.target.value)
            }
          />

          <Select
            value={institutionId}
            onValueChange={setInstitutionId}
          >
            <SelectTrigger>
              <SelectValue placeholder="Select Institution" />
            </SelectTrigger>

            <SelectContent>
              {institutions.map(
                (institution) => (
                  <SelectItem
                    key={institution.id}
                    value={institution.id}
                  >
                    {institution.name}
                  </SelectItem>
                )
              )}
            </SelectContent>
          </Select>

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