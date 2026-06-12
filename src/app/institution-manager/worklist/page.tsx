import RoleBasedWorklist from "@/components/client-dashboard/RoleBasedWorklist";

export default function InstitutionManagerWorklistPage() {
  return (
    <RoleBasedWorklist
      role="INSTITUTION_MANAGER"
    />
  );
}