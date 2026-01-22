"use client";

import { useAuthStore } from "@/src/stores/useAuthStore";
import { UserRole } from "@/src/interfaces/user.interface";
import { useRouter } from "next/navigation";
import { useLayoutEffect } from "react";
import { Loader2 } from "lucide-react";

export default function UserManagementLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const user = useAuthStore((state) => state.user);

  // 1. Derive the value directly during render
  const hasAccess =
    user?.role === UserRole.ADMIN || user?.role === UserRole.SUPER_ADMIN;

  // 2. Handle the redirect in an effect (this is allowed for navigation)
  useLayoutEffect(() => {
    if (!hasAccess) {
      router.replace("/dashboard");
    }
  }, [hasAccess, router]);

  // 3. Conditional Rendering based on the derived value
  if (!hasAccess) {
    return (
      <div className="flex flex-col items-center justify-center h-[70vh] text-slate-500">
        <Loader2 className="animate-spin mb-4 text-purple-600" size={40} />
        <span className="font-black tracking-widest text-[10px] uppercase animate-pulse">
          Verifying Admin Authority...
        </span>
      </div>
    );
  }

  return <>{children}</>;
}
