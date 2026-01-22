"use client";
import AdminTaskPage from "@/src/components/task/AdminTaskPage";
import MemberTaskPage from "@/src/components/task/MemberTaskPage";
import { UserRole } from "@/src/interfaces/user.interface";
import { useAuthStore } from "@/src/stores/useAuthStore";

const TaskPage = () => {
  const user = useAuthStore((state) => state.user);

  // Use an array to check against multiple roles
  const canSeeAdminView = [
    UserRole.ADMIN,
    UserRole.SUPER_ADMIN,
    UserRole.LEADER,
  ].includes(user?.role as UserRole);

  return <div>{canSeeAdminView ? <AdminTaskPage /> : <MemberTaskPage />}</div>;
};

export default TaskPage;
