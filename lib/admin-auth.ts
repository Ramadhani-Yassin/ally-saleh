import { getAdminById, loadAdmins } from "@/lib/admin-directory";

const SESSION_KEY = "ally-saleh-admin-session";

/** Legacy env password — password-only login maps to primary super admin */
export const ADMIN_PASSWORD =
  process.env.NEXT_PUBLIC_ADMIN_PASSWORD ?? "allysaleh";

export type AdminSessionPayload = {
  adminId: string;
};

export function getSessionAdminId(): string | null {
  if (typeof window === "undefined") return null;
  const raw = window.sessionStorage.getItem(SESSION_KEY);
  if (!raw) return null;
  if (raw === "1") {
    const admins = loadAdmins();
    return (
      admins.find((a) => a.role === "super")?.id ?? admins[0]?.id ?? null
    );
  }
  try {
    const j = JSON.parse(raw) as { adminId?: string };
    if (j?.adminId && getAdminById(j.adminId)) return j.adminId;
  } catch {
    /* empty */
  }
  return null;
}

export function isAdminSession(): boolean {
  return getSessionAdminId() !== null;
}

export function setAdminSession(adminId: string): void {
  if (typeof window === "undefined") return;
  window.sessionStorage.setItem(
    SESSION_KEY,
    JSON.stringify({ adminId } satisfies AdminSessionPayload)
  );
  window.dispatchEvent(new Event("ally-admin-session"));
}

export function clearAdminSession(): void {
  if (typeof window === "undefined") return;
  window.sessionStorage.removeItem(SESSION_KEY);
  window.dispatchEvent(new Event("ally-admin-session"));
}

export function subscribeAdminSession(onStoreChange: () => void): () => void {
  if (typeof window === "undefined") return () => {};
  const handler = () => onStoreChange();
  window.addEventListener("ally-admin-session", handler);
  return () => window.removeEventListener("ally-admin-session", handler);
}

export function getAdminSessionSnapshot(): "1" | "0" {
  return isAdminSession() ? "1" : "0";
}

export function getServerAdminSessionSnapshot(): "0" {
  return "0";
}
