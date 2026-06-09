"use client";

import { useState } from "react";
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

export default function CreateInstitutionModal() {
  const router = useRouter();

  const [institutionName, setInstitutionName] =
    useState("");

  const [managerName, setManagerName] =
    useState("");

  const [managerEmail, setManagerEmail] =
    useState("");

  const [managerPassword, setManagerPassword] =
    useState("");

  const [loading, setLoading] =
    useState(false);

  async function handleSubmit() {
    if (
      !institutionName ||
      !managerName ||
      !managerEmail ||
      !managerPassword
    ) {
      alert("Please fill all fields");
      return;
    }

    try {
      setLoading(true);

      const response = await fetch(
        "/api/super-admin/create-institution",
        {
          method: "POST",
          headers: {
            "Content-Type":
              "application/json",
          },
          body: JSON.stringify({
            institutionName,
            managerName,
            managerEmail,
            managerPassword,
          }),
        }
      );

      const data =
        await response.json();

      if (!response.ok) {
        alert(
          data.error ||
            "Failed to create institution"
        );
        return;
      }

      alert(
        "Institution created successfully"
      );

      setInstitutionName("");
      setManagerName("");
      setManagerEmail("");
      setManagerPassword("");

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
          <Button className="w-full">
            Create Institution
          </Button>
        }
      />

      <DialogContent>
        <DialogHeader>
          <DialogTitle>
            Create Institution
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-4">

          <Input
            placeholder="Institution Name"
            value={institutionName}
            onChange={(e) =>
              setInstitutionName(
                e.target.value
              )
            }
          />

          <Input
            placeholder="Institution Manager Name"
            value={managerName}
            onChange={(e) =>
              setManagerName(
                e.target.value
              )
            }
          />

          <Input
            placeholder="Institution Manager Username"
            value={managerEmail}
            onChange={(e) =>
              setManagerEmail(
                e.target.value
              )
            }
          />

          <Input
            type="password"
            placeholder="Institution Manager Password"
            value={managerPassword}
            onChange={(e) =>
              setManagerPassword(
                e.target.value
              )
            }
          />

          <Button
            className="w-full"
            onClick={handleSubmit}
            disabled={loading}
          >
            {loading
              ? "Creating..."
              : "Create"}
          </Button>

        </div>
      </DialogContent>
    </Dialog>
  );
}