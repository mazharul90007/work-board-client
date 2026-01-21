"use client";

import { useEffect } from "react";
import { useThemeStore } from "../stores/theme-store";
import { useHasMounted } from "../hooks/use-has-mounted";

export default function ThemeToggle() {
  const theme = useThemeStore((s) => s.theme);
  const toggleTheme = useThemeStore((s) => s.toggleTheme);
  const hasMounted = useHasMounted();

  useEffect(() => {
    if (hasMounted) {
      document.documentElement.classList.toggle("dark", theme === "dark");
    }
  }, [theme, hasMounted]);

  if (!hasMounted)
    return <div className="w-16 h-8 bg-slate-100 rounded-full animate-pulse" />;

  const isDark = theme === "dark";

  return (
    <button
      onClick={toggleTheme}
      className={`
        relative w-16 h-8 rounded-full flex items-center p-1 transition-all duration-700 ease-in-out cursor-pointer overflow-hidden border
        ${
          isDark
            ? "bg-[#0F172A] border-slate-800 shadow-[inset_0_2px_4px_rgba(0,0,0,0.3)]"
            : "bg-gradient-to-b from-sky-400 to-sky-300 border-sky-200 shadow-[inset_0_2px_4px_rgba(255,255,255,0.2)]"
        }
      `}
    >
      {/* Background Atmosphere */}
      <div className="absolute inset-0 pointer-events-none">
        {/* Stars */}
        <div
          className={`absolute inset-0 transition-opacity duration-700 ${isDark ? "opacity-100" : "opacity-0"}`}
        >
          <div className="absolute top-2 left-4 w-0.5 h-0.5 bg-white rounded-full animate-pulse" />
          <div className="absolute top-5 left-8 w-1 h-1 bg-white/40 rounded-full" />
          <div
            className="absolute top-3 right-10 w-0.5 h-0.5 bg-white/60 rounded-full animate-bounce"
            style={{ animationDuration: "3s" }}
          />
        </div>
        {/* Clouds */}
        <div
          className={`absolute inset-0 transition-opacity duration-700 ${isDark ? "opacity-0" : "opacity-100"}`}
        >
          <div className="absolute bottom-1 left-2 w-5 h-3 bg-white/30 rounded-full blur-[2px]" />
          <div className="absolute top-1 right-3 w-6 h-3 bg-white/20 rounded-full blur-[3px]" />
        </div>
      </div>

      {/* The Celestial Body (Sun/Moon) */}
      <div
        className={`
          z-10 w-6 h-6 rounded-full transition-all duration-700 cubic-bezier(0.34, 1.56, 0.64, 1)
          ${
            isDark
              ? "translate-x-8 bg-slate-100 shadow-[0_0_12px_rgba(255,255,255,0.5)]"
              : "translate-x-0 bg-amber-300 shadow-[0_0_15px_rgba(251,191,36,0.8)]"
          }
        `}
      >
        {/* Moon Details */}
        <div
          className={`absolute inset-0 transition-opacity duration-500 flex items-center justify-center ${isDark ? "opacity-100" : "opacity-0"}`}
        >
          <div className="absolute top-1.5 right-1.5 w-1 h-1 bg-slate-300 rounded-full" />
          <div className="absolute bottom-1.5 left-1.5 w-1.5 h-1.5 bg-slate-300 rounded-full" />
        </div>

        {/* Sun Flare Effect */}
        <div
          className={`absolute inset-0 transition-opacity duration-500 ${isDark ? "opacity-0" : "opacity-100"}`}
        >
          <div className="absolute -inset-1 bg-amber-400/30 rounded-full animate-pulse" />
        </div>
      </div>
    </button>
  );
}
