// src/components/dashboardNav.tsx
"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  Users,
  CheckSquare,
  Calendar,
  LineChart,
  ShieldCheck,
  Settings,
} from "lucide-react";
import { UserRole } from "../interfaces/user.interface";
import { useAuthStore } from "../stores/useAuthStore";

const menuItems = [
  { name: "Dashboard", icon: LayoutDashboard, href: "/dashboard" },
  {
    name: "Members",
    icon: Users,
    href: "/dashboard/user",
    roles: [UserRole.ADMIN, UserRole.SUPER_ADMIN], // Define allowed roles
  },
  { name: "Task", icon: CheckSquare, href: "/dashboard/task" },
  { name: "Calendar", icon: Calendar, href: "/dashboard/calendar" },
  { name: "Performance", icon: LineChart, href: "/dashboard/performance" },
  {
    name: "Roles & Permissions",
    icon: ShieldCheck,
    href: "/dashboard/roles",
    // roles: [UserRole.ADMIN, UserRole.SUPER_ADMIN],
  },
  { name: "Settings", icon: Settings, href: "/dashboard/settings" },
];

export default function DashboardNav() {
  const pathname = usePathname();
  const user = useAuthStore((state) => state.user);
  const userRole = user?.role;

  // Filter the menu items based on the user's role
  const filteredMenuItems = menuItems.filter((item) => {
    // If no roles are specified, everyone can see it
    if (!item.roles) return true;

    // Check if the current user's role is included in the item's allowed roles
    return userRole && item.roles.includes(userRole as UserRole);
  });

  return (
    <div className="flex flex-col h-full p-4 bg-purple-50 dark:bg-zinc-800 sticky top-0 z-50">
      {/* Logo Area */}
      <div className="flex items-center gap-2 px-2 mb-8">
        <div className="bg-purple-500 p-1.5 rounded-lg">
          <CheckSquare className="text-white" size={20} />
        </div>
        <span className="text-xl font-bold text-slate-800 dark:text-dark-primary tracking-tight">
          Work Board
        </span>
      </div>

      <nav className="space-y-1">
        <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest px-3 mb-2">
          Main Navigation
        </p>
        {filteredMenuItems.map((item) => {
          const isActive = pathname === item.href;
          return (
            <Link
              key={item.name}
              href={item.href}
              className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all ${
                isActive
                  ? "bg-purple-200 text-purple-600 font-medium"
                  : "text-slate-500 dark:text-dark-secondary hover:bg-purple-100 hover:text-slate-700"
              }`}
            >
              <item.icon
                size={20}
                className={isActive ? "text-purple-500" : "text-slate-400"}
              />
              {item.name}
            </Link>
          );
        })}
      </nav>
    </div>
  );
}
