import { generateId } from "@/lib/archive-data";

export type AdminRole = "super" | "editor";

export type AdminRecord = {
  id: string;
  email: string;
  name: string;
  /** Demo-only plain text — replace with hashed auth server-side */
  password: string;
  role: AdminRole;
  createdAt: string;
};

const STORAGE_KEY = "ally_saleh_admins_v1";

export const DEFAULT_ADMINS: AdminRecord[] = [
  {
    id: "admin-seed-super",
    email: "admin@allysaleh.local",
    name: "Ally Saleh",
    password: "allysaleh",
    role: "super",
    createdAt: new Date().toISOString(),
  },
];

function normalizeEmail(e: string): string {
  return e.trim().toLowerCase();
}

export function loadAdmins(): AdminRecord[] {
  if (typeof window === "undefined") return [...DEFAULT_ADMINS];
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return [...DEFAULT_ADMINS];
    const parsed = JSON.parse(raw) as AdminRecord[];
    if (!Array.isArray(parsed) || parsed.length === 0) return [...DEFAULT_ADMINS];
    return parsed;
  } catch {
    return [...DEFAULT_ADMINS];
  }
}

export function saveAdmins(admins: AdminRecord[]): void {
  if (typeof window === "undefined") return;
  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(admins));
  window.dispatchEvent(new Event("ally-admins-updated"));
}

export function findAdminByEmailPassword(
  email: string,
  password: string
): AdminRecord | undefined {
  const e = normalizeEmail(email);
  return loadAdmins().find(
    (a) => normalizeEmail(a.email) === e && a.password === password
  );
}

export function getAdminById(id: string): AdminRecord | undefined {
  return loadAdmins().find((a) => a.id === id);
}

export function updateAdmin(
  id: string,
  patch: Partial<Pick<AdminRecord, "name" | "email" | "password">>
): AdminRecord[] {
  const admins = loadAdmins();
  const next = admins.map((a) => {
    if (a.id !== id) return a;
    return {
      ...a,
      ...patch,
      email: patch.email ? normalizeEmail(patch.email) : a.email,
    };
  });
  saveAdmins(next);
  return next;
}

export function addAdmin(
  rec: Omit<AdminRecord, "id" | "createdAt">
): AdminRecord {
  const admins = loadAdmins();
  const row: AdminRecord = {
    ...rec,
    email: normalizeEmail(rec.email),
    id: generateId(),
    createdAt: new Date().toISOString(),
  };
  saveAdmins([...admins, row]);
  return row;
}

export function deleteAdmin(id: string): boolean {
  const admins = loadAdmins();
  const supers = admins.filter((a) => a.role === "super");
  const target = admins.find((a) => a.id === id);
  if (!target) return false;
  if (target.role === "super" && supers.length <= 1) return false;
  saveAdmins(admins.filter((a) => a.id !== id));
  return true;
}

export function subscribeAdmins(cb: () => void): () => void {
  if (typeof window === "undefined") return () => {};
  const h = () => cb();
  window.addEventListener("ally-admins-updated", h);
  return () => window.removeEventListener("ally-admins-updated", h);
}
