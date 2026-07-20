"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useCallback, useMemo, useState } from "react";
import { appendActivityLog } from "@/lib/activity-log";
import { clearAdminSession } from "@/lib/admin-auth";
import { useCurrentAdmin } from "@/hooks/useCurrentAdmin";
import { useSiteTheme } from "@/hooks/useSiteTheme";

const navBase = [
  { href: "/admin/dashboard", label: "Dashboard", icon: "bx-grid-alt" },
  { href: "/admin/manage", label: "Library", icon: "bx-library" },
  { href: "/admin/logs", label: "Logs", icon: "bx-list-ul" },
  { href: "/admin/admins", label: "Manage admins", icon: "bx-group" },
  { href: "/admin/profile", label: "Profile", icon: "bx-user-circle" },
];

export function AdminShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const { isDarkTheme, toggleTheme } = useSiteTheme();
  const current = useCurrentAdmin();
  const [mobileOpen, setMobileOpen] = useState(false);

  const nav = useMemo(() => {
    if (current?.role === "super") return navBase;
    return navBase.filter((i) => i.href !== "/admin/admins");
  }, [current?.role]);

  const closeMobile = useCallback(() => setMobileOpen(false), []);

  return (
    <div className="admin-root">
      <header className="admin-shell-header">
        <button
          type="button"
          className="admin-nav-toggle"
          aria-expanded={mobileOpen}
          aria-label="Toggle navigation"
          onClick={() => setMobileOpen((o) => !o)}
        >
          <i className="bx bx-menu" aria-hidden />
        </button>
        <div className="admin-shell-brand">
          <i className="bx bx-book-open" aria-hidden />
          <span>Ally Saleh · Admin</span>
        </div>
        <div className="admin-shell-header-actions">
          <button
            type="button"
            className="admin-shell-theme-btn"
            onClick={toggleTheme}
            aria-label={isDarkTheme ? "Switch to light mode" : "Switch to dark mode"}
          >
            <i
              className={isDarkTheme ? "bx bx-sun" : "bx bx-moon"}
              aria-hidden
            />
            <span className="admin-shell-theme-text">
              {isDarkTheme ? "Light" : "Dark"}
            </span>
          </button>
          <Link href="/" className="admin-shell-home-link">
            <i className="bx bx-home-alt" aria-hidden />
            <span className="admin-shell-home-text">Site</span>
          </Link>
        </div>
      </header>

      {mobileOpen ? (
        <button
          type="button"
          className="admin-shell-backdrop"
          aria-label="Close menu"
          onClick={closeMobile}
        />
      ) : null}

      <div className="admin-shell-row">
        <aside
          className={`admin-shell-nav ${mobileOpen ? "admin-shell-nav--open" : ""}`}
        >
          <div className="admin-shell-nav-panel">
            <div className="admin-shell-nav-inner">
              <div className="admin-nav-primary">
                {nav.map((item) => {
                  const active = pathname === item.href;
                  return (
                    <Link
                      key={item.href}
                      href={item.href}
                      className={`admin-nav-link ${active ? "admin-nav-link--active" : ""}`}
                      onClick={closeMobile}
                    >
                      <i className={`bx ${item.icon}`} aria-hidden />
                      {item.label}
                    </Link>
                  );
                })}
              </div>
              <div className="admin-nav-bottom">
                <button
                  type="button"
                  className="admin-nav-link admin-nav-link--danger admin-nav-link--logout"
                  onClick={() => {
                    appendActivityLog("Signed out");
                    clearAdminSession();
                    closeMobile();
                    router.push("/admin/login");
                  }}
                >
                  <i className="bx bx-log-out" aria-hidden />
                  Sign out
                </button>
              </div>
            </div>
          </div>
        </aside>

        <main className="admin-shell-main">{children}</main>
      </div>
    </div>
  );
}
