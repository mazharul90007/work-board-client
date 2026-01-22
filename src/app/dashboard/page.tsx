"use client";
import AdminDashboard from "@/src/components/dashboard/AdminDashboard";
import LeaderDashboard from "@/src/components/dashboard/LeaderDashboard";
import MemberDashboard from "@/src/components/dashboard/MemberDashboard";
import { UserRole } from "@/src/interfaces/user.interface";
import { useAuthStore } from "@/src/stores/useAuthStore";

export default function DashboardPage() {
  const user = useAuthStore((state) => state.user);
  const role = user?.role;

  return (
    <div>
      {role === UserRole.ADMIN || role === UserRole.SUPER_ADMIN ? (
        <AdminDashboard />
      ) : role === UserRole.LEADER ? (
        <LeaderDashboard />
      ) : role === UserRole.MEMBER ? (
        <MemberDashboard />
      ) : (
        <div className="flex items-center justify-center h-[60vh] font-bold text-slate-400">
          User role Undefined
        </div>
      )}
    </div>
  );
}
