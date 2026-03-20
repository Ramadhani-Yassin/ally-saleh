"use client";

import { startTransition, useCallback, useEffect, useState } from "react";
import { STORAGE_THEME_KEY } from "@/lib/archive-data";

export function useSiteTheme() {
  const [hydrated, setHydrated] = useState(false);
  const [isDarkTheme, setIsDarkTheme] = useState(false);

  useEffect(() => {
    startTransition(() => {
      const dark =
        typeof window !== "undefined" &&
        window.localStorage.getItem(STORAGE_THEME_KEY) === "dark";
      setIsDarkTheme(dark);
      if (dark) document.body.classList.add("dark-theme");
      else document.body.classList.remove("dark-theme");
      setHydrated(true);
    });
  }, []);

  useEffect(() => {
    if (!hydrated) return;
    if (isDarkTheme) {
      document.body.classList.add("dark-theme");
      window.localStorage.setItem(STORAGE_THEME_KEY, "dark");
    } else {
      document.body.classList.remove("dark-theme");
      window.localStorage.setItem(STORAGE_THEME_KEY, "light");
    }
  }, [isDarkTheme, hydrated]);

  const toggleTheme = useCallback(() => {
    setIsDarkTheme((d) => !d);
  }, []);

  return { isDarkTheme, toggleTheme, hydrated };
}
