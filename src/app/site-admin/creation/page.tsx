import CreateDoctorCard from "@/components/site-admin/CreateDoctorCard";
import CreateTechnicianCard from "@/components/site-admin/CreateTechnicianCard";

export default function CreationPage() {
  return (
    <div className="p-6">

      <h1 className="text-3xl font-bold mb-6">
        User Creation
      </h1>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">

        <CreateDoctorCard />

        <CreateTechnicianCard />

      </div>

    </div>
  );
}