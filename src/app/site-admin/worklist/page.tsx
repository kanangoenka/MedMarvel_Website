import RoleBasedWorklist from "@/components/client-dashboard/RoleBasedWorklist";

export default function SiteAdminWorklistPage() {
  return (
    <RoleBasedWorklist
      role="SITE_ADMIN"
    />
  );
}