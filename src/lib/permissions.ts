import { UserRole } from "@prisma/client";

export function isSuperAdmin(
  role: UserRole
) {
  return role === "SUPER_ADMIN";
}

export function isInstitutionManager(
  role: UserRole
) {
  return role === "INSTITUTION_MANAGER";
}

export function isSiteAdmin(
  role: UserRole
) {
  return role === "SITE_ADMIN";
}

export function isOperationHead(
  role: UserRole
) {
  return role === "OPERATION_HEAD";
}

export function isOperator(
  role: UserRole
) {
  return role === "OPERATOR";
}

export function isDoctor(
  role: UserRole
) {
  return role === "DOCTOR";
}

export function isTechnician(
  role: UserRole
) {
  return role === "TECHNICIAN";
}

export function canCreateInstitution(
  role: UserRole
) {
  return role === "SUPER_ADMIN";
}

export function canCreateSite(
  role: UserRole
) {
  return role === "SUPER_ADMIN";
}

export function canCreateInstitutionManager(
  role: UserRole
) {
  return role === "SUPER_ADMIN";
}

export function canCreateSiteAdmin(
  role: UserRole
) {
  return role === "SUPER_ADMIN";
}

export function canCreateOperationHead(
  role: UserRole
) {
  return role === "SUPER_ADMIN";
}

export function canCreateDoctor(
  role: UserRole
) {
  return role === "SITE_ADMIN";
}

export function canCreateTechnician(
  role: UserRole
) {
  return role === "SITE_ADMIN";
}

export function canCreateOperator(
  role: UserRole
) {
  return role === "OPERATION_HEAD";
}

export function canViewAllCases(
  role: UserRole
) {
  return role === "SUPER_ADMIN";
}