export type WorkCategory = "pdf" | "interview";

export type ArchiveWork = {
  id: string;
  category: WorkCategory;
  title: string;
  description: string;
  url: string;
};

export const STORAGE_WORKS_KEY = "ally_saleh_works_v2";
export const STORAGE_THEME_KEY = "ally_saleh_theme";

export const DEMO_WORKS: ArchiveWork[] = [
  {
    id: "w1",
    category: "pdf",
    title: "Urban Cartographies",
    description:
      "A multidisciplinary study on urban memory and spatial narratives.",
    url: "https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf",
  },
  {
    id: "w2",
    category: "pdf",
    title: "The Neumorphic Notebook",
    description:
      "Explorations in modern interface design and architectural sketches.",
    url: "https://www.africau.edu/images/default/sample.pdf",
  },
  {
    id: "w3",
    category: "interview",
    title: "Ally Saleh on Digital Storytelling",
    description:
      "In-depth interview about narrative futures and creative technology.",
    url: "https://www.youtube.com/embed/dQw4w9WgXcQ",
  },
  {
    id: "w4",
    category: "pdf",
    title: "Whispers in the Stacks",
    description: "Short fiction collection inspired by hidden libraries.",
    url: "https://file-examples.com/storage/fe679d2b17f6e9b2099b3e9/2017/10/file-sample_150kB.pdf",
  },
  {
    id: "w5",
    category: "interview",
    title: "The Future of Publishing",
    description: "Podcast feature with leading literary voices.",
    url: "https://open.spotify.com/embed/track/4cOdK2wGLETKBW3PvgPWqT",
  },
  {
    id: "w6",
    category: "interview",
    title: "Architecture & Memory",
    description:
      "Conversation about space, identity and creative process.",
    url: "https://www.youtube.com/embed/dQw4w9WgXcQ",
  },
];

export function generateId(): string {
  return (
    Date.now().toString(36) + Math.random().toString(36).slice(2, 8)
  );
}

export function loadWorksFromStorage(): ArchiveWork[] {
  if (typeof window === "undefined") return [...DEMO_WORKS];
  try {
    const stored = window.localStorage.getItem(STORAGE_WORKS_KEY);
    if (!stored) return [...DEMO_WORKS];
    const parsed = JSON.parse(stored) as ArchiveWork[];
    if (!Array.isArray(parsed) || parsed.length === 0) return [...DEMO_WORKS];
    return parsed.map((w) => ({
      ...w,
      id: w.id || generateId(),
    }));
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
