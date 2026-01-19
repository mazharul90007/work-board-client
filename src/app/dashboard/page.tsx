"use client";
import AdminDashboard from "@/src/components/dashboard/AdminDashboard";
import { useAuthStore } from "@/src/stores/useAuthStore";

export default function DashboardPage() {
  const user = useAuthStore((state) => state.user);
  const role = user?.role;
  return (
    <div>{role === "ADMIN" ? <AdminDashboard /> : "I AM JUST A USER"}</div>
  );
}
