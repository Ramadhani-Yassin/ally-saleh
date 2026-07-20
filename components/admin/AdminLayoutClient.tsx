"use client";

import { usePathname, useRouter } from "next/navigation";
import { useEffect, useSyncExternalStore } from "react";
import {
  getAdminSessionSnapshot,
  getServerAdminSessionSnapshot,
  subscribeAdminSession,
} from "@/lib/admin-auth";
import { AdminShell } from "./AdminShell";

export function AdminLayoutClient({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const router = useRouter();
  const isLogin = pathname === "/admin/login";

  const session = useSyncExternalStore(
    subscribeAdminSession,
    getAdminSessionSnapshot,
    getServerAdminSessionSnapshot
  );
  const loggedIn = session === "1";

  useEffect(() => {
    document.body.classList.add("admin-body");
    return () => document.body.classList.remove("admin-body");
  }, []);

  useEffect(() => {
    if (isLogin && loggedIn) {
      router.replace("/admin/dashboard");
    }
  }, [isLogin, loggedIn, router]);

  useEffect(() => {
    if (isLogin || loggedIn) return;
    router.replace("/admin/login");
  }, [isLogin, loggedIn, router]);

  if (isLogin) {
    return <div className="admin-login-root">{children}</div>;
  }

  if (!loggedIn) {
    return (
      <div className="admin-loading-screen" aria-busy="true">
        <p>Loading…</p>
      </div>
    );
  }

  return <AdminShell>{children}</AdminShell>;
}
