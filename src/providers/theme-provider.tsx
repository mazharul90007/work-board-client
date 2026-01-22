"use client";

import { useEffect } from "react";
import { useThemeStore } from "@/src/stores/theme-store";

export default function ThemeEffect() {
  const theme = useThemeStore((state) => state.theme);

  useEffect(() => {
    const root = window.document.documentElement;
    if (theme === "dark") {
      root.classList.add("dark");
    } else {
      root.classList.remove("dark");
    }
  }, [theme]);

  return null;
}
