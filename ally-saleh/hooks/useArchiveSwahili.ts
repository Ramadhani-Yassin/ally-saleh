"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import {
  ARCHIVE_EN,
  ARCHIVE_SW,
  type ArchiveI18nKey,
} from "@/lib/archive-ui-strings";

export function useArchiveSwahili() {
  const [lang, setLang] = useState<"en" | "sw">("en");

  useEffect(() => {
    document.documentElement.lang = lang === "sw" ? "sw" : "en";
  }, [lang]);

  const toggleLang = useCallback(() => {
    setLang((L) => (L === "en" ? "sw" : "en"));
  }, []);

  const t = useCallback(
    (key: ArchiveI18nKey): string => {
      return lang === "sw" ? ARCHIVE_SW[key] : ARCHIVE_EN[key];
    },
    [lang]
  );

  const format = useCallback(
    (key: ArchiveI18nKey, ...replacements: string[]): string => {
      let s = lang === "sw" ? ARCHIVE_SW[key] : ARCHIVE_EN[key];
      for (const val of replacements) {
        s = s.replace("%s", val);
      }
      return s;
    },
    [lang]
  );

  return useMemo(
    () => ({
      lang,
      loading: false,
      toggleLang,
      t,
      format,
    }),
    [lang, toggleLang, t, format]
  );
}
