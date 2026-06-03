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

type Doctor = {
  id: string;
  name: string;
};

type Institution = {
  id: string;
  name: string;
};

export default function AddOperatorDialog() {
  const router = useRouter();

  const [name, setName] =
    useState("");

  const [email, setEmail] =
    useState("");

  const [password, setPassword] =
    useState("");

  const [institutionId, setInstitutionId] =
    useState("");

  const [doctors, setDoctors] =
    useState<Doctor[]>([]);

  const [institutions, setInstitutions] =
    useState<Institution[]>([]);

  const [selectedDoctors, setSelectedDoctors] =
    useState<string[]>([]);

  const [loading, setLoading] =
    useState(false);

  useEffect(() => {
    fetch("/api/admin/doctors")
      .then((res) => res.json())
      .then(setDoctors);

    fetch("/api/admin/institutions")
      .then((res) => res.json())
      .then(setInstitutions);
  }, []);

  function toggleDoctor(id: string) {
    setSelectedDoctors((prev) =>
      prev.includes(id)
        ? prev.filter((x) => x !== id)
        : [...prev, id]
    );
  }

  async function handleSubmit() {
    if (
      !name ||
      !email ||
      !password ||
      !institutionId
    ) {
      return;
    }

    try {
      setLoading(true);

      const response = await fetch(
        "/api/admin/operators",
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
            institutionId,
            doctorIds:
              selectedDoctors,
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
      setInstitutionId("");
      setSelectedDoctors([]);
    } catch (error) {
      console.error(error);

      alert(
        "Failed to create operator"
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
            Add Operator
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-4">

          <Input
            placeholder="Operator Name"
            value={name}
            onChange={(e) =>
              setName(e.target.value)
            }
          />

          <Input
            placeholder="Email"
            value={email}
            onChange={(e) =>
              setEmail(e.target.value)
            }
          />

          <Input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) =>
              setPassword(e.target.value)
            }
          />

          <Select
            value={institutionId}
            onValueChange={
              setInstitutionId
            }
          >
            <SelectTrigger>
              <SelectValue placeholder="Select Institution" />
            </SelectTrigger>

            <SelectContent>
              {institutions.map(
                (institution) => (
                  <SelectItem
                    key={
                      institution.id
                    }
                    value={
                      institution.id
                    }
                  >
                    {institution.name}
                  </SelectItem>
                )
              )}
            </SelectContent>
          </Select>

          <div className="border rounded p-3 max-h-40 overflow-y-auto">

            <p className="font-medium mb-2">
              Assign Doctors
            </p>

            {doctors.map((doctor) => (
              <label
                key={doctor.id}
                className="flex gap-2 items-center mb-2"
              >
                <input
                  type="checkbox"
                  checked={selectedDoctors.includes(
                    doctor.id
                  )}
                  onChange={() =>
                    toggleDoctor(
                      doctor.id
                    )
                  }
                />

                {doctor.name}
              </label>
            ))}

          </div>

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