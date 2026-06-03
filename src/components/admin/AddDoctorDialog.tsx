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
      <DialogTrigger className="mt-4 w-full">
        Add New
      </DialogTrigger>

      <DialogContent>
        <DialogHeader>
          <DialogTitle>
            Add Doctor
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-4">

          <Input
            placeholder="Doctor Name"
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
            value={siteId}
            onValueChange={setSiteId}
          >
            <SelectTrigger>
              <SelectValue placeholder="Select Site" />
            </SelectTrigger>

            <SelectContent>
              {sites.map((site) => (
                <SelectItem
                  key={site.id}
                  value={site.id}
                >
                  {site.name}
                </SelectItem>
              ))}
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