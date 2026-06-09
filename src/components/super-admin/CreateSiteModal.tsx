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
          <Button className="w-full bg-blue-600 hover:bg-blue-700 text-white rounded-xl py-2 h-10 flex items-center justify-center gap-1.5 font-medium transition-all border-none shadow-xs cursor-pointer">
            <Plus className="w-4 h-4" />
            Add Site
          </Button>
        }
      />

      <DialogContent className="rounded-2xl border border-gray-100 p-6 shadow-xl bg-white max-w-md w-full">
        <DialogHeader className="pb-2">
          <DialogTitle className="text-lg font-bold text-[#071739]">
            Add Site
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-4 mt-2">
          <Select
            value={institutionId}
            onValueChange={(value: any) =>
              setInstitutionId(value)
            }
          >
            <SelectTrigger className="w-full rounded-xl border border-gray-200 px-3.5 h-11 text-sm bg-white text-left text-gray-700 shadow-xs focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all">
              <SelectValue placeholder="Select Institution" />
            </SelectTrigger>

            <SelectContent className="rounded-xl border border-gray-100 bg-white p-1 shadow-lg">
              {institutions.map((i) => (
                <SelectItem
                  key={i.id}
                  value={i.id}
                >
                  {i.institutionName}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          <Input
            placeholder="Site Name"
            value={siteName}
            onChange={(e) =>
              setSiteName(e.target.value)
            }
            className="rounded-xl border border-gray-200 px-3.5 py-2.5 h-11 text-sm"
          />

          <Input
            placeholder="Site Admin Name"
            value={adminName}
            onChange={(e) =>
              setAdminName(e.target.value)
            }
            className="rounded-xl border border-gray-200 px-3.5 py-2.5 h-11 text-sm"
          />

          <Input
            placeholder="Site Admin User ID"
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
            Create Site
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}