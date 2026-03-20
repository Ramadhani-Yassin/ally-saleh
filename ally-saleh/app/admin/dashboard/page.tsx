"use client";

import Link from "next/link";
import { useMemo } from "react";
import { DashboardCharts } from "@/components/admin/DashboardCharts";
import { useArchiveWorks } from "@/hooks/useArchiveWorks";
import { useSiteTheme } from "@/hooks/useSiteTheme";

export default function AdminDashboardPage() {
  const { works } = useArchiveWorks();
  const { isDarkTheme } = useSiteTheme();
  const pdfCount = useMemo(
    () => works.filter((w) => w.category === "pdf").length,
    [works]
  );
  const interviewCount = useMemo(
    () => works.filter((w) => w.category === "interview").length,
    [works]
  );
  const pdfSharePct = useMemo(() => {
    if (works.length === 0) return 0;
    return Math.round((pdfCount / works.length) * 100);
  }, [works.length, pdfCount]);

  return (
    <div className="admin-page-inner admin-page-inner--wide">
      <h1 className="admin-page-title">Dashboard</h1>
      <p className="admin-page-lead">
        Overview of the archive. Manage entries under Library.
      </p>
      <div className="admin-dash-grid">
        <div className="admin-dash-card">
          <i className="bx bx-file-pdf admin-dash-icon" aria-hidden />
          <p className="admin-dash-value">{pdfCount}</p>
          <p className="admin-dash-label">PDF works</p>
        </div>
        <div className="admin-dash-card">
          <i className="bx bx-microphone admin-dash-icon" aria-hidden />
          <p className="admin-dash-value">{interviewCount}</p>
          <p className="admin-dash-label">Interviews & links</p>
        </div>
        <div className="admin-dash-card">
          <i className="bx bx-library admin-dash-icon" aria-hidden />
          <p className="admin-dash-value">{works.length}</p>
          <p className="admin-dash-label">Total entries</p>
        </div>
        <div className="admin-dash-card">
          <i className="bx bx-pie-chart-alt admin-dash-icon" aria-hidden />
          <p className="admin-dash-value">{pdfSharePct}%</p>
          <p className="admin-dash-label">PDF share of archive</p>
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
