"use client";

import { Search, LogOut } from "lucide-react";
import { useAuthStore } from "../stores/useAuthStore";
import ThemeToggle from "./theme-toggle";
import { useLogout } from "../hooks/useAuth";

export default function DashboardTopNav() {
  const user = useAuthStore((state) => state.user);
  const { mutate: logoutMutate, isPending } = useLogout();

  const handleLogout = () => {
    logoutMutate();
  };

  return (
    <header className="h-16 border-b border-slate-200 bg-purple-50 px-8 flex items-center justify-between sticky top-0 z-20">
      {/* Search Bar (Keeping your existing code) */}
      <div className="relative w-96 group">
        <Search
          className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-green-500 transition-colors"
          size={18}
        />
        <input
          type="text"
          placeholder="Search..."
          className="w-full bg-slate-100 border-none rounded-lg py-2 pl-10 pr-4 text-sm focus:ring-2 focus:ring-green-500/20 transition-all"
        />
        <kbd className="absolute right-3 top-1/2 -translate-y-1/2 bg-white border border-slate-200 rounded px-1.5 text-[10px] text-slate-400 font-sans shadow-sm">
          ⌘ K
        </kbd>
      </div>

      {/* Right Actions */}
      <div className="flex items-center gap-5">
        <div>
          <ThemeToggle />
        </div>

        {/* Styled Logout Button */}
        <button
          onClick={handleLogout}
          disabled={isPending}
          className="flex items-center gap-2 text-sm font-medium text-slate-500 hover:text-red-600 transition-colors disabled:opacity-50"
        >
          <LogOut size={18} />
          <span>{isPending ? "Logging out..." : "Logout"}</span>
        </button>

        {/* User Profile */}
        <div className="flex items-center gap-3 pl-4 border-l border-slate-200">
          <div className="flex flex-col items-end mr-1">
            <span className="text-xs font-bold text-slate-800">
              {user?.name || "User"}
            </span>
            <span className="text-[10px] text-slate-500 uppercase">
              {user?.role}
            </span>
          </div>
          <div className="w-9 h-9 rounded-full bg-gradient-to-tr from-slate-200 to-slate-300 border-2 border-white shadow-sm flex items-center justify-center text-xs font-bold text-slate-600 overflow-hidden uppercase">
            {user?.name?.charAt(0) || user?.email?.charAt(0) || "U"}
          </div>
        </div>
      </div>
    </header>
  );
}
