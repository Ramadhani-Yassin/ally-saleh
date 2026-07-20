"use client";

import { createContext, useContext, useCallback, useState, useEffect, useMemo, ReactNode } from "react";
import {
  ARCHIVE_EN,
  ARCHIVE_SW,
  type ArchiveI18nKey,
} from "@/lib/archive-ui-strings";
import {
  CONTENT_EN,
  CONTENT_SW,
  type ContentKey,
} from "@/lib/content-strings";

interface LangContextValue {
  lang: "en" | "sw";
  toggleLang: () => void;
  t: (key: ArchiveI18nKey) => string;
  tc: (key: ContentKey) => string;
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

  const tc = useCallback(
    (key: ContentKey): string => {
      return lang === "sw" ? CONTENT_SW[key] : CONTENT_EN[key];
    },
    [lang]
  );

  const value = useMemo(
    () => ({ lang, toggleLang, t, tc }),
    [lang, toggleLang, t, tc]
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
