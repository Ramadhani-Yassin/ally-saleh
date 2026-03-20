import { generateId } from "@/lib/archive-data";

export type ActivityEntry = {
  id: string;
  ts: string;
  action: string;
  detail?: string;
};

const STORAGE_KEY = "ally_saleh_activity_v1";
const MAX = 300;

function loadRaw(): ActivityEntry[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    const p = JSON.parse(raw) as ActivityEntry[];
    return Array.isArray(p) ? p : [];
  } catch {
    return [];
  }
}

export function getActivityLogs(): ActivityEntry[] {
  return [...loadRaw()].sort(
    (a, b) => new Date(b.ts).getTime() - new Date(a.ts).getTime()
  );
}

export function appendActivityLog(action: string, detail?: string): void {
  if (typeof window === "undefined") return;
  const list = loadRaw();
  const entry: ActivityEntry = {
    id: generateId(),
    ts: new Date().toISOString(),
    action,
    detail,
  };
  const next = [entry, ...list].slice(0, MAX);
  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
  window.dispatchEvent(new Event("ally-activity-updated"));
}

export function subscribeActivity(cb: () => void): () => void {
  if (typeof window === "undefined") return () => {};
  const h = () => cb();
  window.addEventListener("ally-activity-updated", h);
  return () => window.removeEventListener("ally-activity-updated", h);
}
