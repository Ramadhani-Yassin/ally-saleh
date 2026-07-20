"use client";

import { FormEvent, useState } from "react";
import { appendActivityLog } from "@/lib/activity-log";
import { updateAdmin, type AdminRecord } from "@/lib/admin-directory";
import { getSessionAdminId } from "@/lib/admin-auth";
import { useCurrentAdmin } from "@/hooks/useCurrentAdmin";

export default function AdminProfilePage() {
  const current = useCurrentAdmin();

  if (!current) {
    return (
      <div className="admin-page-inner admin-page-inner--wide">
        <p className="admin-page-lead">Session not found.</p>
      </div>
    );
  }

  return <ProfileEditor key={`${current.id}-${current.name}-${current.email}`} admin={current} />;
}

function ProfileEditor({ admin }: { admin: AdminRecord }) {
  const [name, setName] = useState(admin.name);
  const [email, setEmail] = useState(admin.email);
  const [password, setPassword] = useState("");
  const [msg, setMsg] = useState<string | null>(null);

  function handleSave(e: FormEvent) {
    e.preventDefault();
    setMsg(null);
    const id = getSessionAdminId();
    if (!id) return;
    const patch: { name: string; email: string; password?: string } = {
      name: name.trim(),
      email: email.trim(),
    };
    if (password.trim()) patch.password = password.trim();
    updateAdmin(id, patch);
    appendActivityLog("Profile updated", patch.email);
    setPassword("");
    setMsg("Saved.");
  }

  return (
    <div className="admin-page-inner admin-page-inner--wide">
      <h1 className="admin-page-title">Profile</h1>
      <p className="admin-page-lead">
        Update your display name, email, and password for this browser (demo
        storage).
      </p>
      <div className="admin-panel">
        <form onSubmit={handleSave} className="admin-profile-form">
          <div className="form-group">
            <label>Name</label>
            <input
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label>Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label>New password (leave blank to keep)</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              autoComplete="new-password"
            />
          </div>
          <p className="admin-profile-role">
            Role: <strong>{admin.role}</strong>
          </p>
          {msg ? <p className="admin-profile-msg">{msg}</p> : null}
          <button type="submit" className="btn-primary">
            <i className="bx bx-save" aria-hidden />
            Save changes
          </button>
        </form>
      </div>
    </div>
  );
}
