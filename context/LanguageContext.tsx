"use client";

import { createContext, useContext, useCallback, useState, useEffect, useMemo, ReactNode } from "react";
import {
  ARCHIVE_EN,
  ARCHIVE_SW,
  type ArchiveI18nKey,
} from "@/lib/archive-ui-strings";

interface LangContextValue {
  lang: "en" | "sw";
  toggleLang: () => void;
  t: (key: ArchiveI18nKey) => string;
  format: (key: ArchiveI18nKey, ...replacements: string[]) => string;
}

const LangContext = createContext<LangContextValue | null>(null);

export function LanguageProvider({ children }: { children: ReactNode }) {
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

  const value = useMemo(
    () => ({ lang, toggleLang, t, format }),
    [lang, toggleLang, t, format]
  );

  return (
    <LangContext.Provider value={value}>
      {children}
    </LangContext.Provider>
  );
}

export function useLang(): LangContextValue {
  const ctx = useContext(LangContext);
  if (!ctx) throw new Error("useLang must be used within LanguageProvider");
  return ctx;
}
