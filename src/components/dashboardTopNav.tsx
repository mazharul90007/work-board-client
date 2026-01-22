"use client";

import { useState, useRef, useEffect } from "react";
import {
  LogOut,
  LayoutGrid,
  ChevronRight,
  User,
  Settings,
  ChevronDown,
} from "lucide-react";
import { useAuthStore } from "../stores/useAuthStore";
import ThemeToggle from "./theme-toggle";
import { useLogout } from "../hooks/useAuth";
import { usePathname } from "next/navigation";
import Link from "next/link";

export default function DashboardTopNav() {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const user = useAuthStore((state) => state.user);

  const { mutate: logoutMutate, isPending } = useLogout();
  const pathname = usePathname();

  const pathSegments = pathname.split("/").filter(Boolean);
  const currentPage = pathSegments[pathSegments.length - 1] || "Dashboard";

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <header
      className={`h-18 border-b border-slate-100 dark:border-slate-600 bg-white dark:bg-zinc-800 backdrop-blur-md px-8 flex items-center justify-between sticky top-0 z-50`}
    >
      {/* LEFT SIDE: Breadcrumbs */}
      <div className="flex items-center gap-4">
        <div className="hidden md:flex items-center gap-2">
          <div className="p-2 bg-purple-50 dark:bg-purple-900/20 rounded-xl text-purple-600">
            <LayoutGrid size={20} />
          </div>
          <nav className="flex items-center gap-2 text-sm">
            <span className={` text-slate-400 dark:text-white font-medium`}>
              Workboard
            </span>
            <ChevronRight size={14} className="text-slate-300" />
            <span
              className={`text-slate-900 dark:text-slate-100 font-black capitalize tracking-tight`}
            >
              {currentPage.replace("-", " ")}
            </span>
          </nav>
        </div>
      </div>

      {/* RIGHT SIDE */}
      <div className="flex items-center gap-6">
        <div className="flex items-center pr-2">
          <ThemeToggle />
        </div>

        <div
          className={`flex items-center gap-4 pl-6 border-l border-slate-200  dark:border-slate-500`}
        >
          <div className="hidden sm:flex flex-col items-end">
            <span className="text-[13px] font-black text-slate-800 dark:text-slate-100 tracking-tight leading-none uppercase">
              {user?.name || "User"}
            </span>
            <span className="text-[9px] font-black text-purple-500 dark:text-purple-300 uppercase tracking-[0.15em] mt-1 bg-purple-50 dark:bg-purple-200/10 px-1.5 py-0.5 rounded-md">
              {user?.role || "Member"}
            </span>
          </div>

          <div className="relative" ref={dropdownRef}>
            {/* Trigger Avatar */}
            <button
              onClick={() => setIsDropdownOpen(!isDropdownOpen)}
              className={`relative w-10 h-10 rounded-2xl bg-linear-to-tr from-purple-400 to-purple-600 flex items-center justify-center text-sm font-black text-white shadow-lg shadow-purple-200 dark:shadow-none uppercase cursor-pointer transition-all duration-300 ring-offset-2 dark:ring-offset-slate-900 ${
                isDropdownOpen
                  ? "ring-2 ring-purple-500 scale-95"
                  : "hover:scale-105 active:scale-95"
              }`}
            >
              {user?.name?.charAt(0) || "U"}

              {/* Small Bottom-Right Arrow Badge */}
              <div
                className={`absolute -bottom-1 -right-1 w-4 h-4 rounded-full bg-white dark:bg-slate-200 border-2 border-slate-100 dark:border-slate-800 flex items-center justify-center shadow-sm transition-transform duration-300 ${
                  isDropdownOpen ? "rotate-180" : "rotate-0"
                }`}
              >
                <ChevronDown
                  size={10}
                  className={
                    isDropdownOpen ? "text-purple-600" : "text-slate-500"
                  }
                />
              </div>
            </button>

            {/* Premium Animated Dropdown */}
            {isDropdownOpen && (
              <div className="absolute top-full right-0 mt-3 w-56 bg-white dark:bg-slate-800 border border-slate-100 dark:border-slate-700 rounded-3xl shadow-2xl z-60 overflow-hidden animate-in fade-in zoom-in-95 duration-200 origin-top-right">
                {/* User Header Section */}
                <div className="p-4 bg-slate-50/50 dark:bg-slate-800/50 border-b border-slate-100 dark:border-slate-700">
                  <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">
                    Signed in as
                  </p>
                  <p className="text-sm font-bold text-slate-800 dark:text-white truncate">
                    {user?.email}
                  </p>
                </div>

                {/* Menu Options */}
                <div className="p-2">
                  <Link
                    href="/dashboard/profile"
                    onClick={() => setIsDropdownOpen(false)}
                    className="w-full flex items-center gap-3 px-3 py-2.5 text-sm font-bold text-slate-600 dark:text-slate-300 hover:bg-purple-50 dark:hover:bg-purple-900/20 hover:text-purple-600 dark:hover:text-purple-400 rounded-xl transition-colors group"
                  >
                    <div className="p-1.5 bg-white dark:bg-slate-700 rounded-lg shadow-sm border border-slate-100 dark:border-slate-600 group-hover:border-purple-200 transition-colors">
                      <User size={14} />
                    </div>
                    <span>View Profile</span>
                  </Link>

                  <Link
                    href="/dashboard/settings"
                    onClick={() => setIsDropdownOpen(false)}
                    className="w-full flex items-center gap-3 px-3 py-2.5 text-sm font-bold text-slate-600 dark:text-slate-300 hover:bg-purple-50 dark:hover:bg-purple-900/20 hover:text-purple-600 dark:hover:text-purple-400 rounded-xl transition-colors group"
                  >
                    <div className="p-1.5 bg-white dark:bg-slate-700 rounded-lg shadow-sm border border-slate-100 dark:border-slate-600 group-hover:border-purple-200 transition-colors">
                      <Settings size={14} />
                    </div>
                    <span>Settings</span>
                  </Link>
                </div>

                {/* Footer Section (Logout) */}
                <div className="p-2 border-t border-slate-100 dark:border-slate-700 bg-slate-50/30 dark:bg-slate-800/30">
                  <button
                    onClick={() => {
                      setIsDropdownOpen(false);
                      logoutMutate();
                    }}
                    disabled={isPending}
                    className="w-full flex items-center gap-3 px-3 py-2.5 text-sm font-black text-rose-500 hover:bg-rose-50 dark:hover:bg-rose-900/20 rounded-xl transition-colors cursor-pointer"
                  >
                    <div className="p-1.5 bg-white dark:bg-slate-700 rounded-lg shadow-sm border border-slate-100 dark:border-slate-600 group-hover:border-rose-200 transition-colors">
                      <LogOut size={14} />
                    </div>
                    <span className="uppercase tracking-widest text-[11px]">
                      {isPending ? "Exiting..." : "Sign Out"}
                    </span>
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}
