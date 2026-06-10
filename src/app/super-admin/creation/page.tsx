import CreateInstitutionCard from "@/components/super-admin/CreateInstitutionCard";
import CreateSiteCard from "@/components/super-admin/CreateSiteCard";
import CreateSiteAdminCard from "@/components/super-admin/CreateSiteAdminCard";
import CreateOperationHeadCard from "@/components/super-admin/CreateOperationHeadCard";

export default function CreationPage() {
  return (
    <div className="p-6 space-y-6">
      <h1 className="text-2xl font-bold text-[#071739]">
        User Creation
      </h1>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <CreateInstitutionCard />
        <CreateSiteCard />
        <CreateSiteAdminCard />
        <CreateOperationHeadCard />
      </div>
    </div>
  );
}