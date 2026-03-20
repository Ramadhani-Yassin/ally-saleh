"use client";

import { useMemo, useState, useSyncExternalStore } from "react";
import type { ActivityEntry } from "@/lib/activity-log";
import {
  getActivityLogs,
  subscribeActivity,
} from "@/lib/activity-log";

function subscribe(cb: () => void) {
  return subscribeActivity(cb);
}

function snapshot() {
  return JSON.stringify(getActivityLogs());
}

type LogFilter = "all" | "content" | "admin" | "session";

function matchesLogFilter(row: ActivityEntry, f: LogFilter): boolean {
  if (f === "all") return true;
  const a = row.action.toLowerCase();
  if (f === "content") return a.includes("archive");
  if (f === "admin")
    return a.includes("admin") || a.includes("profile");
  if (f === "session") return a.includes("signed");
  return true;
}

function matchesLogSearch(row: ActivityEntry, q: string): boolean {
  if (!q.trim()) return true;
  const s = q.trim().toLowerCase();
  const ts = new Date(row.ts).toLocaleString().toLowerCase();
  return (
    row.action.toLowerCase().includes(s) ||
    (row.detail ?? "").toLowerCase().includes(s) ||
    ts.includes(s)
  );
}

export default function AdminLogsPage() {
  const raw = useSyncExternalStore(
    subscribe,
    snapshot,
    () => "[]"
  );
  const logs = useMemo(
    () => JSON.parse(raw) as ReturnType<typeof getActivityLogs>,
    [raw]
  );
  const [search, setSearch] = useState("");
  const [logFilter, setLogFilter] = useState<LogFilter>("all");

  const filteredLogs = useMemo(() => {
    return logs.filter(
      (row) =>
        matchesLogFilter(row, logFilter) && matchesLogSearch(row, search)
    );
  }, [logs, logFilter, search]);

  return (
    <div className="admin-page-inner admin-page-inner--wide">
      <h1 className="admin-page-title">Activity log</h1>
      <p className="admin-page-lead">
        Recent actions in this browser (demo storage). Cleared if you clear
        site data.
      </p>
      <div className="content-toolbar" role="search">
        <label className="content-toolbar-search">
          <i className="bx bx-search" aria-hidden />
          <input
            type="search"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search action, detail, or time…"
            autoComplete="off"
            aria-label="Search activity log"
          />
        </label>
        <div
          className="content-toolbar-filters"
          role="group"
          aria-label="Filter by category"
        >
          {(
            [
              { id: "all" as const, label: "All" },
              { id: "content" as const, label: "Archive" },
              { id: "admin" as const, label: "Admins" },
              { id: "session" as const, label: "Session" },
            ] as const
          ).map(({ id, label }) => (
            <button
              key={id}
              type="button"
              className={`content-filter-btn ${logFilter === id ? "content-filter-btn--active" : ""}`}
              onClick={() => setLogFilter(id)}
            >
              {label}
            </button>
          ))}
        </div>
        {logs.length > 0 ? (
          <p className="content-toolbar-meta">
            Showing {filteredLogs.length} of {logs.length} entries
          </p>
        ) : null}
      </div>
      <div className="admin-logs-table-wrap">
        <table className="admin-logs-table">
          <thead>
            <tr>
              <th>Time</th>
              <th>Action</th>
              <th>Detail</th>
            </tr>
          </thead>
          <tbody>
            {logs.length === 0 ? (
              <tr>
                <td colSpan={3} className="admin-logs-empty">
                  No activity yet.
                </td>
              </tr>
            ) : filteredLogs.length === 0 ? (
              <tr>
                <td colSpan={3} className="admin-logs-empty">
                  No log lines match your search or filter.
                </td>
              </tr>
            ) : (
              filteredLogs.map((row) => (
                <tr key={row.id}>
                  <td className="admin-logs-ts">
                    {new Date(row.ts).toLocaleString()}
                  </td>
                  <td>{row.action}</td>
                  <td className="admin-logs-detail">{row.detail ?? "—"}</td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
