export function getDashboardRoute(
  role: string
) {
  switch (role) {
    case "SUPER_ADMIN":
      return "/super-admin";

    case "INSTITUTION_MANAGER":
      return "/institution-manager";

    case "SITE_ADMIN":
      return "/site-admin";

    case "OPERATION_HEAD":
      return "/operation-head";

    case "OPERATOR":
      return "/operator";

    case "DOCTOR":
      return "/doctor";

    case "TECHNICIAN":
      return "/technician";

    default:
      return "/login";
  }
}