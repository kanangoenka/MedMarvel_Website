import RoleBasedWorklist from "@/components/client-dashboard/RoleBasedWorklist";

export default function SuperAdminWorklistPage() {
  return (
    <RoleBasedWorklist
      role="SUPER_ADMIN"
    />
  );
}