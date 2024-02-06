"use client";

import { currentRole } from "@/hooks/current-role";
import { UserRole } from "@prisma/client";
import { FormError } from "../form-error";

interface RoleProps {
  children: React.ReactNode;
  allowedRole: UserRole;
}

export const Role = ({ children, allowedRole }: RoleProps) => {
  const role = currentRole();
  if (role !== allowedRole) {
    return <FormError message="Access Denied!" />;
  }
  return <>{children}</>;
};
