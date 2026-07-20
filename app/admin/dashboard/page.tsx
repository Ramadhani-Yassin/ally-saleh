"use client";

import Link from "next/link";
import { useMemo } from "react";
import { DashboardCharts } from "@/components/admin/DashboardCharts";
import { useArchiveWorks } from "@/hooks/useArchiveWorks";
import { useSiteTheme } from "@/hooks/useSiteTheme";

export default function AdminDashboardPage() {
  const { works } = useArchiveWorks();
  const { isDarkTheme } = useSiteTheme();
  const poetryCount = useMemo(
    () => works.filter((w) => w.category === "poetry").length,
    [works]
  );
  const shortStoryCount = useMemo(
    () => works.filter((w) => w.category === "short-story").length,
    [works]
  );
  const resourceCount = useMemo(
    () => works.filter((w) => w.category === "resource").length,
    [works]
  );

  return (
    <div className="admin-page-inner admin-page-inner--wide">
      <h1 className="admin-page-title">Dashboard</h1>
      <p className="admin-page-lead">
        Overview of the archive. Manage entries under Library.
      </p>
      <div className="admin-dash-grid">
        <div className="admin-dash-card">
          <i className="bx bx-book-heart admin-dash-icon" aria-hidden />
          <p className="admin-dash-value">{poetryCount}</p>
          <p className="admin-dash-label">Poetry</p>
        </div>
        <div className="admin-dash-card">
          <i className="bx bx-book-open admin-dash-icon" aria-hidden />
          <p className="admin-dash-value">{shortStoryCount}</p>
          <p className="admin-dash-label">Short stories</p>
        </div>
        <div className="admin-dash-card">
          <i className="bx bx-link-external admin-dash-icon" aria-hidden />
          <p className="admin-dash-value">{resourceCount}</p>
          <p className="admin-dash-label">Online resources</p>
        </div>
        <div className="admin-dash-card">
          <i className="bx bx-library admin-dash-icon" aria-hidden />
          <p className="admin-dash-value">{works.length}</p>
          <p className="admin-dash-label">Total entries</p>
        </div>
      </div>
      <div className="admin-dash-actions">
        <Link href="/admin/manage" className="btn-primary">
          <i className="bx bx-edit" aria-hidden />
          Open library
        </Link>
        <Link href="/" className="btn-secondary">
          <i className="bx bx-show" aria-hidden />
          View public site
        </Link>
      </div>

      <DashboardCharts works={works} isDark={isDarkTheme} />
    </div>
  );
}
