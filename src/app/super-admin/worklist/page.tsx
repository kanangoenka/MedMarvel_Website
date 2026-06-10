import WorklistFilters from "@/components/worklist/WorklistFilters";
import WorklistTable from "@/components/worklist/WorklistTable";

export default function SuperAdminWorklistPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">
          Worklist
        </h1>

        <p className="text-gray-500 mt-1">
          View cases across all institutions and sites.
        </p>
      </div>

      <WorklistFilters
        showInstitution
        showSite
      />

      <WorklistTable />
    </div>
  );
}