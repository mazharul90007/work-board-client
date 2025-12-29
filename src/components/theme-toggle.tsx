"use client";

import { useEffect } from "react";
import { useThemeStore } from "../stores/theme-store";
import { useHasMounted } from "../hooks/use-has-mounted";
import { IoMoon } from "react-icons/io5";
import { IoSunny } from "react-icons/io5";

export default function ThemeToggle() {
  const theme = useThemeStore((s) => s.theme);
  const toggleTheme = useThemeStore((s) => s.toggleTheme);
  const hasMounted = useHasMounted();

  useEffect(() => {
    if (hasMounted) {
      document.documentElement.classList.toggle("dark", theme === "dark");
    }
  }, [theme, hasMounted]);

  if (!hasMounted) return null;

  return (
    <button
      onClick={toggleTheme}
      className="rounded-full border p-2 cursor-pointer hover:bg-active transition-transform duration-300"
    >
      {theme === "dark" ? <IoSunny /> : <IoMoon />}
    </button>
  );
}
