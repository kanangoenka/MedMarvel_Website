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

export default function CreateSiteModal() {
  const router = useRouter();

  const [institutions, setInstitutions] =
    useState<Institution[]>([]);

  const [institutionId, setInstitutionId] =
    useState("");

  const [siteName, setSiteName] =
    useState("");

  const [siteAdminName, setSiteAdminName] =
    useState("");

  const [siteAdminEmail, setSiteAdminEmail] =
    useState("");

  const [siteAdminPassword, setSiteAdminPassword] =
    useState("");

  const [loading, setLoading] =
    useState(false);

  useEffect(() => {
    fetch("/api/admin/institutions")
      .then((res) => res.json())
      .then(setInstitutions)
      .catch(console.error);
  }, []);

  async function handleSubmit() {
    if (
      !institutionId ||
      !siteName ||
      !siteAdminName ||
      !siteAdminEmail ||
      !siteAdminPassword
    ) {
      alert("Please fill all fields");
      return;
    }

    try {
      setLoading(true);

      const response = await fetch(
        "/api/super-admin/create-site",
        {
          method: "POST",
          headers: {
            "Content-Type":
              "application/json",
          },
          body: JSON.stringify({
            institutionId,
            siteName,
            siteAdminName,
            siteAdminEmail,
            siteAdminPassword,
          }),
        }
      );

      const data =
        await response.json();

      if (!response.ok) {
        alert(
          data.error ||
            "Failed to create site"
        );
        return;
      }

      alert(
        "Site created successfully"
      );

      setInstitutionId("");
      setSiteName("");
      setSiteAdminName("");
      setSiteAdminEmail("");
      setSiteAdminPassword("");

      router.refresh();
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
          <Button className="w-full">
            Create Site
          </Button>
        }
      />

      <DialogContent>
        <DialogHeader>
          <DialogTitle>
            Create Site
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-4">

          <Select
            value={institutionId}
            onValueChange={(val) =>
              setInstitutionId(val ?? "")
            }
          >
            <SelectTrigger className="w-full">
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

          <Input
            placeholder="Site Name"
            value={siteName}
            onChange={(e) =>
              setSiteName(
                e.target.value
              )
            }
          />

          <Input
            placeholder="Site Admin Name"
            value={siteAdminName}
            onChange={(e) =>
              setSiteAdminName(
                e.target.value
              )
            }
          />

          <Input
            placeholder="Site Admin Username"
            value={siteAdminEmail}
            onChange={(e) =>
              setSiteAdminEmail(
                e.target.value
              )
            }
          />

          <Input
            type="password"
            placeholder="Site Admin Password"
            value={siteAdminPassword}
            onChange={(e) =>
              setSiteAdminPassword(
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