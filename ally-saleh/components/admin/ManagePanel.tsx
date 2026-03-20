"use client";

import { appendActivityLog } from "@/lib/activity-log";
import { useArchiveWorks } from "@/hooks/useArchiveWorks";
import { generateId } from "@/lib/archive-data";
import type { ArchiveWork, WorkCategory } from "@/lib/archive-data";
import { DEMO_WORKS } from "@/lib/archive-data";
import { useMemo, useState } from "react";

const PAGE_SIZE = 15;

type ListCategoryFilter = "all" | WorkCategory;

function filterWorksForList(
  list: ArchiveWork[],
  q: string,
  cat: ListCategoryFilter
): ArchiveWork[] {
  return list.filter((w) => {
    if (cat !== "all" && w.category !== cat) return false;
    const s = q.trim().toLowerCase();
    if (!s) return true;
    return (
      w.title.toLowerCase().includes(s) ||
      w.description.toLowerCase().includes(s) ||
      w.url.toLowerCase().includes(s)
    );
  });
}

export function ManagePanel() {
  const { works, persist } = useArchiveWorks();
  const [editId, setEditId] = useState<string | null>(null);
  const [category, setCategory] = useState<WorkCategory>("pdf");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [url, setUrl] = useState("");
  const [page, setPage] = useState(1);
  const [listSearch, setListSearch] = useState("");
  const [listCategory, setListCategory] = useState<ListCategoryFilter>("all");

  const filteredWorks = useMemo(
    () => filterWorksForList(works, listSearch, listCategory),
    [works, listSearch, listCategory]
  );

  const totalPages = Math.max(1, Math.ceil(filteredWorks.length / PAGE_SIZE));
  const safePage = Math.min(Math.max(1, page), totalPages);

  const pagedWorks = useMemo(() => {
    const start = (safePage - 1) * PAGE_SIZE;
    return filteredWorks.slice(start, start + PAGE_SIZE);
  }, [filteredWorks, safePage]);

  function editWork(id: string) {
    const work = works.find((w) => w.id === id);
    if (!work) return;
    setCategory(work.category);
    setTitle(work.title);
    setDescription(work.description);
    setUrl(work.url);
    setEditId(id);
    window.alert(`Editing "${work.title}". Save with Add / update.`);
  }

  function deleteWork(id: string) {
    if (!window.confirm("Delete this entry?")) return;
    const next = works.filter((w) => w.id !== id);
    if (editId === id) {
      setEditId(null);
      setTitle("");
      setDescription("");
      setUrl("");
      setCategory("pdf");
    }
    persist(next);
    appendActivityLog("Archive entry deleted", id);
    const filteredNext = filterWorksForList(next, listSearch, listCategory);
    const newTotal = Math.max(1, Math.ceil(filteredNext.length / PAGE_SIZE));
    setPage((p) => Math.min(p, newTotal));
  }

  function addOrUpdateWork() {
    const t = title.trim();
    const desc = description.trim();
    const u = url.trim();
    if (!t) {
      window.alert("Title required");
      return;
    }
    if (!u) {
      window.alert("URL required");
      return;
    }
    if (!u.startsWith("http://") && !u.startsWith("https://")) {
      window.alert("Valid URL required");
      return;
    }

    const wasEdit = Boolean(editId);
    let next = [...works];
    if (editId) {
      next = next.filter((w) => w.id !== editId);
      setEditId(null);
    }
    next.push({
      id: generateId(),
      category,
      title: t,
      description: desc || "No description",
      url: u,
    });
    setTitle("");
    setDescription("");
    setUrl("");
    setCategory("pdf");
    persist(next);
    appendActivityLog(
      wasEdit ? "Archive entry updated" : "Archive entry added",
      t
    );
    window.alert(`✓ "${t}" saved.`);
    const afterFilter = filterWorksForList(next, listSearch, listCategory);
    const lastPage = Math.max(1, Math.ceil(afterFilter.length / PAGE_SIZE));
    setPage(lastPage);
  }

  function resetDemo() {
    if (!window.confirm("Restore demo collection?")) return;
    setEditId(null);
    setTitle("");
    setDescription("");
    setUrl("");
    setCategory("pdf");
    persist([...DEMO_WORKS]);
    appendActivityLog("Archive restored to demo data");
    setPage(1);
  }

  const showingFrom =
    filteredWorks.length === 0 ? 0 : (safePage - 1) * PAGE_SIZE + 1;
  const showingTo = Math.min(safePage * PAGE_SIZE, filteredWorks.length);

  return (
    <div className="admin-page-inner admin-page-inner--wide">
      <h1 className="admin-page-title">Library management</h1>
      <p className="admin-page-lead">
        Add, edit, or remove PDF works and interview / external links. Changes
        sync to the public archive in this browser.
      </p>

      <div className="admin-panel">
        <div className="admin-panel-heading">
          <i className="bx bx-cog" aria-hidden />
          <h3>Content</h3>
        </div>
        <div className="form-row">
          <div className="form-group">
            <label>
              <i className="bx bx-category" aria-hidden /> Category
            </label>
            <select
              value={category}
              onChange={(e) =>
                setCategory(e.target.value as WorkCategory)
              }
            >
              <option value="pdf">📄 Readable PDF</option>
              <option value="interview">🎙️ Interview / External Resource</option>
            </select>
          </div>
          <div className="form-group">
            <label>
              <i className="bx bx-heading" aria-hidden /> Title
            </label>
            <input
              type="text"
              placeholder="Work title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>
        </div>
        <div className="form-row">
          <div className="form-group">
            <label>
              <i className="bx bx-align-left" aria-hidden /> Description
            </label>
            <textarea
              placeholder="Brief description..."
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              rows={4}
            />
          </div>
          <div className="form-group">
            <label>
              <i className="bx bx-link" aria-hidden /> URL (PDF or link)
            </label>
            <input
              type="text"
              placeholder="https://..."
              value={url}
              onChange={(e) => setUrl(e.target.value)}
            />
          </div>
        </div>
        <div className="admin-actions-bar">
          <button type="button" className="btn-primary" onClick={addOrUpdateWork}>
            <i className="bx bx-plus-circle" aria-hidden />
            {editId ? "Update entry" : "Add work"}
          </button>
          <button type="button" className="btn-secondary" onClick={resetDemo}>
            <i className="bx bx-refresh" aria-hidden />
            Restore demo
          </button>
        </div>
        <div style={{ marginTop: "1.2rem" }}>
          <div className="content-toolbar" role="search">
            <label className="content-toolbar-search">
              <i className="bx bx-search" aria-hidden />
              <input
                type="search"
                value={listSearch}
                onChange={(e) => {
                  setListSearch(e.target.value);
                  setPage(1);
                }}
                placeholder="Search title, description, URL…"
                autoComplete="off"
                aria-label="Search library entries"
              />
            </label>
            <div
              className="content-toolbar-filters"
              role="group"
              aria-label="Filter by type"
            >
              {(
                [
                  { id: "all" as const, label: "All" },
                  { id: "pdf" as const, label: "PDF" },
                  { id: "interview" as const, label: "Interviews" },
                ] as const
              ).map(({ id, label }) => (
                <button
                  key={id}
                  type="button"
                  className={`content-filter-btn ${listCategory === id ? "content-filter-btn--active" : ""}`}
                  onClick={() => {
                    setListCategory(id);
                    setPage(1);
                  }}
                >
                  {label}
                </button>
              ))}
            </div>
          </div>
          <div className="admin-items-label">
            <i className="bx bx-list-ul" aria-hidden /> Entries
            {filteredWorks.length > 0 ? (
              <span className="admin-entries-meta">
                {" "}
                · Showing {showingFrom}–{showingTo} of {filteredWorks.length}
                {listSearch.trim() || listCategory !== "all"
                  ? ` (${works.length} total)`
                  : ""}
              </span>
            ) : works.length > 0 ? (
              <span className="admin-entries-meta">
                {" "}
                · No matches ({works.length} total)
              </span>
            ) : null}
          </div>
          <div className="items-list-admin">
            {works.length === 0 ? (
              <div className="empty-state">No entries</div>
            ) : filteredWorks.length === 0 ? (
              <div className="empty-state">No entries match your filters.</div>
            ) : (
              pagedWorks.map((work: ArchiveWork) => (
                <div key={work.id} className="admin-item-row">
                  <div className="admin-item-info">
                    <i
                      className={
                        work.category === "pdf"
                          ? "bx bxs-file-pdf"
                          : "bx bx-microphone"
                      }
                      aria-hidden
                    />
                    <span>
                      <strong>{work.title}</strong>{" "}
                      <span className="category-badge">
                        {work.category === "pdf" ? "PDF" : "Interview"}
                      </span>
                    </span>
                  </div>
                  <div className="admin-item-actions">
                    <button
                      type="button"
                      className="icon-btn"
                      onClick={() => editWork(work.id)}
                      aria-label="Edit"
                    >
                      <i className="bx bx-edit-alt" aria-hidden />
                    </button>
                    <button
                      type="button"
                      className="icon-btn"
                      onClick={() => deleteWork(work.id)}
                      aria-label="Delete"
                    >
                      <i className="bx bx-trash" aria-hidden />
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>
          {totalPages > 1 ? (
            <div className="admin-pagination">
              <button
                type="button"
                className="btn-secondary admin-page-btn"
                disabled={safePage <= 1}
                onClick={() => setPage((p) => Math.max(1, p - 1))}
              >
                Previous
              </button>
              <span className="admin-pagination-info">
                Page {safePage} of {totalPages}
              </span>
              <button
                type="button"
                className="btn-secondary admin-page-btn"
                disabled={safePage >= totalPages}
                onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
              >
                Next
              </button>
            </div>
          ) : null}
        </div>
      </div>
    </div>
  );
}
