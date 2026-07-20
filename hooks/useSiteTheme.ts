"use client";

import { startTransition, useCallback, useEffect, useState } from "react";
import { STORAGE_THEME_KEY } from "@/lib/archive-data";

export function useSiteTheme() {
  const [hydrated, setHydrated] = useState(false);
  // Match `style.html`: default to dark (black) until user chooses otherwise.
  const [isDarkTheme, setIsDarkTheme] = useState(true);

  useEffect(() => {
    startTransition(() => {
      // Default theme is dark (black), unless user explicitly stored a preference.
      const stored =
        typeof window !== "undefined"
          ? window.localStorage.getItem(STORAGE_THEME_KEY)
          : null;
      const dark = stored ? stored === "dark" : true;
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
