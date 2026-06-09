"use client";

import CreateInstitutionModal from "@/components/super-admin/CreateInstitutionModal";
import CreateSiteModal from "@/components/super-admin/CreateSiteModal";
import CreateOperationHeadModal from "@/components/super-admin/CreateOperationHeadModal";

export default function SuperAdminPage() {
  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold mb-8">
        MedMarvel Super Admin
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

        <div className="border rounded-xl p-6">
          <h2 className="font-semibold text-lg mb-4">
            Create Institution
          </h2>

          <p className="text-sm text-gray-500 mb-4">
            Create an institution and its Institution Manager.
          </p>

          <CreateInstitutionModal />
        </div>

        <div className="border rounded-xl p-6">
          <h2 className="font-semibold text-lg mb-4">
            Create Site
          </h2>

          <p className="text-sm text-gray-500 mb-4">
            Create a site and its Site Admin.
          </p>

          <CreateSiteModal />
        </div>

        <div className="border rounded-xl p-6">
          <h2 className="font-semibold text-lg mb-4">
            Create Operation Head
          </h2>

          <p className="text-sm text-gray-500 mb-4">
            Create an Operation Head account.
          </p>

          <CreateOperationHeadModal />
        </div>

      </div>
    </div>
  );
}