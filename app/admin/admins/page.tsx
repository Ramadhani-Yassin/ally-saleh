"use client";

import { FormEvent, useMemo, useState, useSyncExternalStore } from "react";
import { appendActivityLog } from "@/lib/activity-log";
import {
  addAdmin,
  deleteAdmin,
  loadAdmins,
  type AdminRecord,
  type AdminRole,
  saveAdmins,
  subscribeAdmins,
} from "@/lib/admin-directory";
import { getSessionAdminId } from "@/lib/admin-auth";
import { useCurrentAdmin } from "@/hooks/useCurrentAdmin";

function adminsSnapshot() {
  return JSON.stringify(loadAdmins());
}

export default function AdminManageAdminsPage() {
  const me = useCurrentAdmin();
  const myId = getSessionAdminId();
  const raw = useSyncExternalStore(
    subscribeAdmins,
    adminsSnapshot,
    () => "[]"
  );
  const admins = useMemo(
    () => JSON.parse(raw) as AdminRecord[],
    [raw]
  );

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState<AdminRole>("editor");
  const [editId, setEditId] = useState<string | null>(null);
  const [err, setErr] = useState<string | null>(null);
  const [tableSearch, setTableSearch] = useState("");
  const [roleFilter, setRoleFilter] = useState<"all" | AdminRole>("all");

  const superOnly = me?.role !== "super";

  const filteredAdmins = useMemo(() => {
    return admins.filter((a) => {
      if (roleFilter !== "all" && a.role !== roleFilter) return false;
      const q = tableSearch.trim().toLowerCase();
      if (!q) return true;
      return (
        a.name.toLowerCase().includes(q) ||
        a.email.toLowerCase().includes(q)
      );
    });
  }, [admins, tableSearch, roleFilter]);

  function startEdit(a: AdminRecord) {
    setEditId(a.id);
    setName(a.name);
    setEmail(a.email);
    setPassword("");
    setRole(a.role);
  }

  function cancelEdit() {
    setEditId(null);
    setName("");
    setEmail("");
    setPassword("");
    setRole("editor");
    setErr(null);
  }

  function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setErr(null);
    if (superOnly) return;
    const n = name.trim();
    const em = email.trim();
    const pw = password.trim();
    if (!n || !em) {
      setErr("Name and email required.");
      return;
    }
    if (!editId && !pw) {
      setErr("Password required for new admin.");
      return;
    }
    if (editId) {
      const patch: Partial<Pick<AdminRecord, "name" | "email" | "password" | "role">> = {
        name: n,
        email: em,
        role,
      };
      if (pw) patch.password = pw;
      const list = loadAdmins();
      const next = list.map((a) =>
        a.id === editId ? { ...a, ...patch, email: em.toLowerCase() } : a
      );
      saveAdmins(next);
      appendActivityLog("Admin updated", em);
    } else {
      addAdmin({
        name: n,
        email: em,
        password: pw,
        role,
      });
      appendActivityLog("Admin created", em);
    }
    cancelEdit();
  }

  function handleDelete(id: string) {
    if (superOnly) return;
    if (id === myId) {
      setErr("You cannot delete your own session.");
      return;
    }
    if (!window.confirm("Remove this admin?")) return;
    if (deleteAdmin(id)) {
      appendActivityLog("Admin deleted", id);
    } else {
      setErr("Cannot remove the last super admin.");
    }
  }

  if (superOnly) {
    return (
      <div className="admin-page-inner admin-page-inner--wide">
        <h1 className="admin-page-title">Manage admins</h1>
        <p className="admin-page-lead">
          Only super admins can manage accounts. Your role is{" "}
          <strong>{me?.role}</strong>.
        </p>
      </div>
    );
  }

  return (
    <div className="admin-page-inner admin-page-inner--wide">
      <h1 className="admin-page-title">Manage admins</h1>
      <p className="admin-page-lead">
        Create, edit, or remove admin accounts. Stored in this browser only.
      </p>

      <div className="admin-panel">
        <h3 className="admin-inline-title">
          {editId ? "Edit admin" : "Add admin"}
        </h3>
        <form onSubmit={handleSubmit} className="form-row-wrap">
          <div className="form-row">
            <div className="form-group">
              <label>Name</label>
              <input
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Name"
              />
            </div>
            <div className="form-group">
              <label>Email</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="email@example.com"
              />
            </div>
          </div>
          <div className="form-row">
            <div className="form-group">
              <label>Password {editId ? "(optional)" : ""}</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
              />
            </div>
            <div className="form-group">
              <label>Role</label>
              <select
                value={role}
                onChange={(e) => setRole(e.target.value as AdminRole)}
              >
                <option value="editor">Editor</option>
                <option value="super">Super</option>
              </select>
            </div>
          </div>
          {err ? <p className="admin-login-error">{err}</p> : null}
          <div className="admin-actions-bar">
            <button type="submit" className="btn-primary">
              {editId ? "Save" : "Create"}
            </button>
            {editId ? (
              <button type="button" className="btn-secondary" onClick={cancelEdit}>
                Cancel
              </button>
            ) : null}
          </div>
        </form>
      </div>

      <div className="admin-panel admin-panel--table">
        <h3 className="admin-inline-title">Admins</h3>
        <div className="content-toolbar" role="search">
          <label className="content-toolbar-search">
            <i className="bx bx-search" aria-hidden />
            <input
              type="search"
              value={tableSearch}
              onChange={(e) => setTableSearch(e.target.value)}
              placeholder="Search name or email…"
              autoComplete="off"
              aria-label="Search admins"
            />
          </label>
          <div
            className="content-toolbar-filters"
            role="group"
            aria-label="Filter by role"
          >
            {(
              [
                { id: "all" as const, label: "All" },
                { id: "editor" as const, label: "Editor" },
                { id: "super" as const, label: "Super" },
              ] as const
            ).map(({ id, label }) => (
              <button
                key={id}
                type="button"
                className={`content-filter-btn ${roleFilter === id ? "content-filter-btn--active" : ""}`}
                onClick={() => setRoleFilter(id)}
              >
                {label}
              </button>
            ))}
          </div>
          {admins.length > 0 ? (
            <p className="content-toolbar-meta">
              Showing {filteredAdmins.length} of {admins.length} accounts
            </p>
          ) : null}
        </div>
        <div className="admin-logs-table-wrap">
          <table className="admin-logs-table">
            <thead>
              <tr>
                <th>Name</th>
                <th>Email</th>
                <th>Role</th>
                <th />
              </tr>
            </thead>
            <tbody>
              {admins.length === 0 ? (
                <tr>
                  <td colSpan={4} className="admin-logs-empty">
                    No admins yet.
                  </td>
                </tr>
              ) : filteredAdmins.length === 0 ? (
                <tr>
                  <td colSpan={4} className="admin-logs-empty">
                    No accounts match your search or filter.
                  </td>
                </tr>
              ) : (
                filteredAdmins.map((a) => (
                  <tr key={a.id}>
                    <td>{a.name}</td>
                    <td>{a.email}</td>
                    <td>{a.role}</td>
                    <td className="admin-table-actions">
                      <button
                        type="button"
                        className="icon-btn"
                        onClick={() => startEdit(a)}
                        aria-label="Edit"
                      >
                        <i className="bx bx-edit-alt" aria-hidden />
                      </button>
                      <button
                        type="button"
                        className="icon-btn"
                        onClick={() => handleDelete(a.id)}
                        disabled={a.id === myId}
                        aria-label="Delete"
                      >
                        <i className="bx bx-trash" aria-hidden />
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
