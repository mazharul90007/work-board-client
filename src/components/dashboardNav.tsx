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
  MessageSquare,
  Clock,
  FileText,
  ShieldCheck,
  Settings,
} from "lucide-react";

const menuItems = [
  { name: "Dashboard", icon: LayoutDashboard, href: "/dashboard" },
  { name: "Members", icon: Users, href: "/dashboard/user" },
  { name: "Task", icon: CheckSquare, href: "/dashboard/task" },
  { name: "Calendar", icon: Calendar, href: "/dashboard/calendar" },
  { name: "Performance", icon: LineChart, href: "/dashboard/performance" },
  { name: "Messages", icon: MessageSquare, href: "/dashboard/messages" },
  { name: "Attendance", icon: Clock, href: "/dashboard/attendance" },
  { name: "Reports", icon: FileText, href: "/dashboard/reports" },
  { name: "Roles & Permissions", icon: ShieldCheck, href: "/dashboard/roles" },
  { name: "Settings", icon: Settings, href: "/dashboard/settings" },
];

export default function DashboardNav() {
  const pathname = usePathname();

  return (
    <div className="flex flex-col h-full p-4 bg-purple-50">
      {/* Logo Area */}
      <div className="flex items-center gap-2 px-2 mb-8">
        <div className="bg-purple-500 p-1.5 rounded-lg">
          <CheckSquare className="text-white" size={20} />
        </div>
        <span className="text-xl font-bold text-slate-800 tracking-tight">
          Work Board
        </span>
      </div>

      <nav className="space-y-1">
        <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest px-3 mb-2">
          Main Navigation
        </p>
        {menuItems.map((item) => {
          const isActive = pathname === item.href;
          return (
            <Link
              key={item.name}
              href={item.href}
              className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all ${
                isActive
                  ? "bg-green-50 text-green-600"
                  : "text-slate-500 hover:bg-slate-50 hover:text-slate-700"
              }`}
            >
              <item.icon
                size={20}
                className={isActive ? "text-green-600" : "text-slate-400"}
              />
              {item.name}
            </Link>
          );
        })}
      </nav>
    </div>
  );
}
