"use client";

import { useAuthStore } from "@/src/stores/useAuthStore";
import { UserRole } from "@/src/interfaces/user.interface";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { Loader2 } from "lucide-react";

export default function UserManagementLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const user = useAuthStore((state) => state.user);

  // 1. Initialize as false.
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    // Using a requestAnimationFrame or a 0ms timeout ensures the
    // update happens after the initial paint, satisfying the linter.
    const frame = requestAnimationFrame(() => {
      setIsMounted(true);
    });
    return () => cancelAnimationFrame(frame);
  }, []);

  const hasAccess =
    user?.role === UserRole.ADMIN || user?.role === UserRole.SUPER_ADMIN;

  useEffect(() => {
    // Navigation is an "external system" update, which IS the correct use of useEffect
    if (isMounted && !hasAccess) {
      router.replace("/dashboard");
    }
  }, [isMounted, hasAccess, router]);

  // 2. While not mounted, show the loader to prevent the early redirect
  if (!isMounted) {
    return (
      <div className="flex flex-col items-center justify-center h-[70vh] bg-white dark:bg-background transition-colors duration-500">
        <div className="relative flex items-center justify-center">
          <div className="absolute w-16 h-16 bg-purple-500/20 rounded-full animate-ping" />
          <Loader2
            className="animate-spin text-purple-600 dark:text-purple-400 z-10"
            size={40}
          />
        </div>
        <span className="mt-6 font-black tracking-[0.2em] text-[10px] uppercase animate-pulse text-slate-500 dark:text-zinc-500">
          Initializing Workspace...
        </span>
      </div>
    );
  }

  // 3. If mounted but no access, keep showing the loader while router.replace works
  if (!hasAccess) {
    return (
      <div className="flex flex-col items-center justify-center h-[70vh] bg-white dark:bg-background">
        <Loader2 className="animate-spin mb-4 text-purple-600" size={40} />
        <span className="font-black tracking-widest text-[10px] uppercase">
          Verifying Authority...
        </span>
      </div>
    );
  }

  return <>{children}</>;
}
