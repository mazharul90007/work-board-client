"use client";
import AdminRolesPage from "@/src/components/rolesAndPermission/AdminRoles";
import LeaderRolesPage from "@/src/components/rolesAndPermission/LeaderRoles";
import MemberRolesPage from "@/src/components/rolesAndPermission/MemberRoles";
import { UserRole } from "@/src/interfaces/user.interface";
import { useAuthStore } from "@/src/stores/useAuthStore";

const RoleAndPermssions = () => {
  const user = useAuthStore((state) => state.user);
  return (
    <div>
      {user?.role === UserRole.ADMIN || user?.role === UserRole.SUPER_ADMIN ? (
        <AdminRolesPage />
      ) : user?.role === UserRole.LEADER ? (
        <LeaderRolesPage />
      ) : (
        <MemberRolesPage />
      )}
    </div>
  );
};

export default RoleAndPermssions;
