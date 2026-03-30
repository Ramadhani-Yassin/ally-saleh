export type WorkCategory = "poetry" | "short-story" | "resource";

export type ArchiveWork = {
  id: string;
  category: WorkCategory;
  title: string;
  description: string;
  /** Optional Swahili description when `description` is English-only (e.g. “Shared video”). */
  descriptionSw?: string;
  url: string;
};

export const STORAGE_WORKS_KEY = "ally_saleh_works_v3";
export const STORAGE_THEME_KEY = "ally_saleh_theme";

/** Placeholder base — replace each URL in admin when real links are ready. */
const PLACEHOLDER_PDF =
  "https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf";

export const DEMO_WORKS: ArchiveWork[] = [
  {
    id: "poetry-changamka",
    category: "poetry",
    title: "Changamka",
    description: "Kitabu cha mashairi — Ally Saleh.",
    url: `${PLACEHOLDER_PDF}#changamka`,
  },
  {
    id: "poetry-neno",
    category: "poetry",
    title: "Neno",
    description: "Kitabu cha mashairi — Ally Saleh.",
    url: `/Publications/Poetry/${encodeURIComponent("Neno.pdf")}`,
  },
  {
    id: "poetry-tupo",
    category: "poetry",
    title: "Tupo",
    description: "Kitabu cha mashairi — Ally Saleh.",
    url: `${PLACEHOLDER_PDF}#tupo`,
  },
  {
    id: "poetry-kikohozi",
    category: "poetry",
    title: "Kikohozi",
    description: "Kitabu cha mashairi — Ally Saleh.",
    url: `/Publications/Poetry/${encodeURIComponent("KIKOHOZI.pdf")}`,
  },
  {
    id: "story-jumba-maro",
    category: "short-story",
    title: "Jumba Maro",
    description: "Hadithi fupi — Ally Saleh.",
    url: `${PLACEHOLDER_PDF}#jumba-maro`,
  },
  {
    id: "story-la-kuvunda",
    category: "short-story",
    title: "La kuvunda",
    description: "Hadithi fupi — Ally Saleh.",
    url: `${PLACEHOLDER_PDF}#la-kuvunda`,
  },
  {
    id: "story-zubayda",
    category: "short-story",
    title: "Zubayda Kachoka",
    description: "Hadithi fupi — Ally Saleh.",
    url: `/Publications/Short-Stories/${encodeURIComponent("ZUBAYDA KACHOKA 03.10.2023.pdf")}`,
  },
  {
    id: "story-maisha-ya-haji-gora",
    category: "short-story",
    title: "Maisha ya Haji Gora",
    description: "Hadithi fupi — nimeandika.",
    url: `${PLACEHOLDER_PDF}#maisha-ya-haji-gora`,
  },
  {
    id: "story-moto-wa-tumvatu",
    category: "short-story",
    title: "Moto wa Tumvatu",
    description: "Hadithi fupi — nimehariri.",
    url: `${PLACEHOLDER_PDF}#moto-wa-tumvatu`,
  },
  {
    id: "res-jumba-maro-video-1",
    category: "resource",
    title: "Jumba Maro — video",
    description: "Shared video (link 1).",
    descriptionSw: "Video iliyoshirikiwa (kiungo 1).",
    url: "https://share.google/y4nJUsHI4ubBO3Iph",
  },
  {
    id: "res-jumba-maro-video-2",
    category: "resource",
    title: "Jumba Maro — video",
    description: "Shared video (link 2).",
    descriptionSw: "Video iliyoshirikiwa (kiungo 2).",
    url: "https://share.google/mfxnT5xlZa2OkAt4N",
  },
  {
    id: "res-uhakiki-jumba-1",
    category: "resource",
    title: "Uhakiki wa Kitabu cha Jumba Maro I",
    description: "Mohammed Ghassani — WordPress.",
    url: "https://mohammedghassani.wordpress.com/2007/12/11/uhakiki-wa-kitabu-cha-jumba-maro/",
  },
  {
    id: "res-uhakiki-jumba-2",
    category: "resource",
    title: "Uhakiki wa Kitabu cha Jumba Maro II",
    description: "Mohammed Ghassani.",
    url: "https://share.google/dhd0lGOY8GW7zjZdd",
  },
  {
    id: "res-karamu-jumba-maro",
    category: "resource",
    title: "‘Karamu’ ya Jumba Maro na chaguzi barani Afrika",
    description: "Mohammed Ghassani.",
    url: "https://share.google/f6NE45Cgaa0EPDE1Y",
  },
  {
    id: "res-la-kuvunda-ghassani",
    category: "resource",
    title: "La Kuvunda",
    description: "Mohammed Ghassani — makala / tag.",
    url: "https://mohammedghassani.wordpress.com/tag/la-kuvunda/",
  },
];

export function generateId(): string {
  return (
    Date.now().toString(36) + Math.random().toString(36).slice(2, 8)
  );
}

function normalizeCategory(raw: unknown): WorkCategory | null {
  if (raw === "poetry" || raw === "short-story" || raw === "resource") {
    return raw;
  }
  if (raw === "pdf") return "short-story";
  if (raw === "interview") return "poetry";
  return null;
}

export function loadWorksFromStorage(): ArchiveWork[] {
  if (typeof window === "undefined") return [...DEMO_WORKS];
  try {
    const stored = window.localStorage.getItem(STORAGE_WORKS_KEY);
    if (!stored) return [...DEMO_WORKS];
    const parsed = JSON.parse(stored) as ArchiveWork[];
    if (!Array.isArray(parsed) || parsed.length === 0) return [...DEMO_WORKS];
    const next = parsed
      .map((w) => {
        const cat = normalizeCategory(w.category);
        if (!cat) return null;
        return {
          ...w,
          category: cat,
          id: w.id || generateId(),
        };
      })
      .filter((w): w is ArchiveWork => w !== null);
    return next.length > 0 ? next : [...DEMO_WORKS];
  } catch {
    return [...DEMO_WORKS];
  }
}

export function getWorksSnapshotJSON(): string {
  return JSON.stringify(loadWorksFromStorage());
}

export function getServerWorksSnapshotJSON(): string {
  return JSON.stringify([...DEMO_WORKS]);
}

export function subscribeWorks(onStoreChange: () => void): () => void {
  if (typeof window === "undefined") return () => {};
  const handler = () => onStoreChange();
  window.addEventListener("storage", handler);
  window.addEventListener("ally-works-updated", handler);
  return () => {
    window.removeEventListener("storage", handler);
    window.removeEventListener("ally-works-updated", handler);
  };
}

export function persistWorks(works: ArchiveWork[]): void {
  if (typeof window === "undefined") return;
  window.localStorage.setItem(STORAGE_WORKS_KEY, JSON.stringify(works));
  window.dispatchEvent(new Event("ally-works-updated"));
}
