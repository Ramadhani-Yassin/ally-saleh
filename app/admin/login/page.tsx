"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { FormEvent, useState } from "react";
import { appendActivityLog } from "@/lib/activity-log";
import { findAdminByEmailPassword, loadAdmins } from "@/lib/admin-directory";
import { ADMIN_PASSWORD, setAdminSession } from "@/lib/admin-auth";

export default function AdminLoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);

  function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setError(null);
    const em = email.trim();
    const pw = password;

    if (em && pw) {
      const found = findAdminByEmailPassword(em, pw);
      if (found) {
        setAdminSession(found.id);
        appendActivityLog("Signed in", found.email);
        router.replace("/admin/dashboard");
        router.refresh();
        return;
      }
    }

    if (!em && pw === ADMIN_PASSWORD) {
      const admins = loadAdmins();
      const primary =
        admins.find((a) => a.role === "super") ?? admins[0];
      if (primary) {
        setAdminSession(primary.id);
        appendActivityLog("Signed in (legacy password)", primary.email);
        router.replace("/admin/dashboard");
        router.refresh();
        return;
      }
    }

    if (em && pw) {
      setError("Invalid email or password.");
      return;
    }
    if (!em && pw) {
      setError("Invalid password, or use email + password.");
      return;
    }
    setError("Enter password (and email if you use directory login).");
  }

  return (
    <div className="admin-login-card-wrap">
      <div className="admin-login-card">
        <div className="admin-login-icon">
          <i className="bx bx-lock-alt" aria-hidden />
        </div>
        <h1 className="admin-login-title">Admin sign-in</h1>
        <p className="admin-login-sub">
          Sign in with your admin email and password, or password only for the
          demo master key.
        </p>
        <form onSubmit={handleSubmit} className="admin-login-form">
          <label className="admin-login-label">
            Email (optional for demo key)
            <input
              type="email"
              autoComplete="username"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="admin-login-input"
              placeholder="admin@allysaleh.local"
            />
          </label>
          <label className="admin-login-label">
            Password
            <input
              type="password"
              autoComplete="current-password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="admin-login-input"
              placeholder="••••••••"
            />
          </label>
          {error ? (
            <p className="admin-login-error" role="alert">
              {error}
            </p>
          ) : null}
          <button type="submit" className="btn-primary admin-login-submit">
            <i className="bx bx-log-in" aria-hidden />
            Continue
          </button>
        </form>
        <p className="admin-login-hint">
          Default directory account:{" "}
          <code className="admin-login-code">admin@allysaleh.local</code> /{" "}
          <code className="admin-login-code">allysaleh</code>. Legacy env
          password: <code className="admin-login-code">{ADMIN_PASSWORD}</code>{" "}
          (leave email empty). New admins are created under Manage admins.
        </p>
        <LinkBack />
      </div>
    </div>
  );
}

function LinkBack() {
  return (
    <p className="admin-login-back">
      <Link href="/">
        <i className="bx bx-arrow-back" aria-hidden /> Back to archive
      </Link>
    </p>
  );
}
