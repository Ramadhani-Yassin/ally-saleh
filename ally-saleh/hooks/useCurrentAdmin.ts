"use client";

import { useMemo, useSyncExternalStore } from "react";
import { getAdminById, subscribeAdmins } from "@/lib/admin-directory";
import {
  getSessionAdminId,
  subscribeAdminSession,
} from "@/lib/admin-auth";

function subscribeAdminContext(cb: () => void): () => void {
  const u = subscribeAdminSession(cb);
  const v = subscribeAdmins(cb);
  return () => {
    u();
    v();
  };
}

function getAdminIdSnapshot(): string {
  return getSessionAdminId() ?? "";
}

export function useCurrentAdmin() {
  const id = useSyncExternalStore(
    subscribeAdminContext,
    getAdminIdSnapshot,
    () => ""
  );

  return useMemo(() => {
    if (!id) return null;
    return getAdminById(id) ?? null;
  }, [id]);
}
