"use client";

import Link from "next/link";
import {
  useCallback,
  useEffect,
  useLayoutEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { HomeHero } from "@/components/HomeHero";
import { useArchiveWorks } from "@/hooks/useArchiveWorks";
import { useSiteTheme } from "@/hooks/useSiteTheme";
import type { ArchiveWork } from "@/lib/archive-data";

type SectionFilter = "all" | "pdf" | "interview";

function matchesSearch(w: ArchiveWork, q: string): boolean {
  if (!q.trim()) return true;
  const s = q.trim().toLowerCase();
  return (
    w.title.toLowerCase().includes(s) ||
    w.description.toLowerCase().includes(s)
  );
}

export function ArchiveApp() {
  const { works } = useArchiveWorks();
  const { isDarkTheme, toggleTheme } = useSiteTheme();
  const headerWrapRef = useRef<HTMLDivElement>(null);
  const [spacerH, setSpacerH] = useState(96);
  const [search, setSearch] = useState("");
  const [sectionFilter, setSectionFilter] = useState<SectionFilter>("all");
  const [mobileNavOpen, setMobileNavOpen] = useState(false);

  useEffect(() => {
    document.body.classList.add("home-page");
    return () => document.body.classList.remove("home-page");
  }, []);

  useEffect(() => {
    const root = document.documentElement;
    if (mobileNavOpen) {
      root.classList.add("home-mobile-nav-open");
      document.body.classList.add("home-mobile-nav-open");
    } else {
      root.classList.remove("home-mobile-nav-open");
      document.body.classList.remove("home-mobile-nav-open");
    }
    return () => {
      root.classList.remove("home-mobile-nav-open");
      document.body.classList.remove("home-mobile-nav-open");
    };
  }, [mobileNavOpen]);

  useLayoutEffect(() => {
    const el = headerWrapRef.current;
    if (!el) return;
    const ro = new ResizeObserver(() => {
      setSpacerH(Math.ceil(el.getBoundingClientRect().height) + 4);
    });
    ro.observe(el);
    setSpacerH(Math.ceil(el.getBoundingClientRect().height) + 4);
    return () => ro.disconnect();
  }, []);

  const filteredWorks = useMemo(() => {
    return works.filter((w) => {
      if (!matchesSearch(w, search)) return false;
      if (sectionFilter === "all") return true;
      return w.category === sectionFilter;
    });
  }, [works, search, sectionFilter]);

  const pdfWorks = useMemo(
    () => filteredWorks.filter((w) => w.category === "pdf"),
    [filteredWorks]
  );
  const interviewWorks = useMemo(
    () => filteredWorks.filter((w) => w.category === "interview"),
    [filteredWorks]
  );

  const showPdfBlock = sectionFilter !== "interview";
  const showInterviewBlock = sectionFilter !== "pdf";

  const closeMobileNav = useCallback(() => setMobileNavOpen(false), []);

  const scrollToSection = useCallback((elementId: string) => {
    window.setTimeout(() => {
      document.getElementById(elementId)?.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }, 100);
  }, []);

  const goHome = useCallback(() => {
    closeMobileNav();
    scrollToSection("hero");
  }, [closeMobileNav, scrollToSection]);

  const goArchive = useCallback(() => {
    closeMobileNav();
    setSectionFilter("all");
    scrollToSection("archive-works");
  }, [closeMobileNav, scrollToSection]);

  const goPublishedPdf = useCallback(() => {
    closeMobileNav();
    setSectionFilter("pdf");
    scrollToSection("section-pdf");
  }, [closeMobileNav, scrollToSection]);

  const goInterviews = useCallback(() => {
    closeMobileNav();
    setSectionFilter("interview");
    scrollToSection("section-interviews");
  }, [closeMobileNav, scrollToSection]);

  const goFooter = useCallback(() => {
    closeMobileNav();
    scrollToSection("site-footer");
  }, [closeMobileNav, scrollToSection]);

  const exploreWorks = useCallback(() => {
    setSectionFilter("all");
    scrollToSection("archive-works");
  }, [scrollToSection]);

  const copyToClipboard = useCallback((link: string, t: string) => {
    navigator.clipboard
      .writeText(link)
      .then(() => {
        window.alert(`🔗 "${t}" link copied to clipboard!`);
      })
      .catch(() => {
        window.alert(`Share: ${link}`);
      });
  }, []);

  const shareWork = useCallback(
    (t: string, u: string) => {
      if (typeof navigator !== "undefined" && navigator.share) {
        navigator.share({ title: t, url: u }).catch(() => copyToClipboard(u, t));
      } else {
        copyToClipboard(u, t);
      }
    },
    [copyToClipboard]
  );

  return (
    <div className="app-container app-container--home">
      <div ref={headerWrapRef} className="home-header-fixed">
        <header className="header-subtle header-subtle--floating">
          <div className="header-main header-main--home">
            <button
              type="button"
              className="home-nav-toggle"
              aria-expanded={mobileNavOpen}
              aria-label="Open menu"
              onClick={() => setMobileNavOpen((o) => !o)}
            >
              <i className="bx bx-menu" aria-hidden />
            </button>
            <div className="brand">
              <h1>
                <i className="bx bx-book-open" aria-hidden />
                Ally Saleh
              </h1>
              <p>Documents archive · Published PDFs & Interview Resources</p>
            </div>
            <nav
              className="home-header-nav"
              aria-label="Page sections"
            >
              <button type="button" className="home-nav-link" onClick={goHome}>
                Home
              </button>
              <button
                type="button"
                className="home-nav-link"
                onClick={goPublishedPdf}
              >
                Published PDF
              </button>
              <button
                type="button"
                className="home-nav-link"
                onClick={goInterviews}
              >
                Interviews
              </button>
              <button
                type="button"
                className="home-nav-link"
                onClick={goArchive}
              >
                Archive
              </button>
              <button
                type="button"
                className="home-nav-link"
                onClick={goFooter}
              >
                Footer
              </button>
            </nav>
            <div className="header-actions">
              <button
                type="button"
                className="theme-header-btn"
                onClick={toggleTheme}
              >
                <i
                  className={isDarkTheme ? "bx bx-sun" : "bx bx-moon"}
                  aria-hidden
                />
                <span>{isDarkTheme ? "Light Mode" : "Dark Mode"}</span>
              </button>
              <Link href="/admin/login" className="admin-toggle-btn">
                <i className="bx bx-lock-alt" aria-hidden />
                <span>Admin Console</span>
              </Link>
            </div>
          </div>
        </header>
      </div>

      {mobileNavOpen ? (
        <button
          type="button"
          className="home-nav-backdrop"
          aria-label="Close menu"
          onClick={closeMobileNav}
        />
      ) : null}

      <aside
        className={`home-nav-drawer ${mobileNavOpen ? "home-nav-drawer--open" : ""}`}
        aria-hidden={!mobileNavOpen}
      >
        <div className="home-nav-drawer-panel">
          <div className="home-nav-drawer-head">
            <span className="home-nav-drawer-title">Menu</span>
            <button
              type="button"
              className="home-nav-drawer-close"
              aria-label="Close menu"
              onClick={closeMobileNav}
            >
              <i className="bx bx-x" aria-hidden />
            </button>
          </div>
          <div className="home-nav-drawer-links">
            <button type="button" className="home-drawer-link" onClick={goHome}>
              <i className="bx bx-home-alt" aria-hidden />
              Home
            </button>
            <button
              type="button"
              className="home-drawer-link"
              onClick={goPublishedPdf}
            >
              <i className="bx bxs-file-pdf" aria-hidden />
              Published PDF
            </button>
            <button
              type="button"
              className="home-drawer-link"
              onClick={goInterviews}
            >
              <i className="bx bx-microphone" aria-hidden />
              Interviews
            </button>
            <button
              type="button"
              className="home-drawer-link"
              onClick={goArchive}
            >
              <i className="bx bx-archive" aria-hidden />
              Archive
            </button>
            <button
              type="button"
              className="home-drawer-link"
              onClick={goFooter}
            >
              <i className="bx bx-chevrons-down" aria-hidden />
              Footer
            </button>
          </div>
          <div className="home-nav-drawer-divider" />
          <div className="home-nav-drawer-actions">
            <button
              type="button"
              className="home-drawer-action"
              onClick={() => {
                toggleTheme();
              }}
            >
              <i
                className={isDarkTheme ? "bx bx-sun" : "bx bx-moon"}
                aria-hidden
              />
              {isDarkTheme ? "Light mode" : "Dark mode"}
            </button>
            <Link
              href="/admin/login"
              className="home-drawer-action home-drawer-action--admin"
              onClick={closeMobileNav}
            >
              <i className="bx bx-lock-alt" aria-hidden />
              Admin console
            </Link>
          </div>
        </div>
      </aside>

      <div
        className="home-header-spacer"
        style={{ height: spacerH }}
        aria-hidden
      />

      <main className="home-main">
        <HomeHero onScrollToArchive={exploreWorks} />

        <div id="archive-works" className="content-toolbar" role="search">
          <label className="content-toolbar-search">
            <i className="bx bx-search" aria-hidden />
            <input
              type="search"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search titles & descriptions…"
              autoComplete="off"
              aria-label="Search archive"
            />
          </label>
          <div
            className="content-toolbar-filters"
            role="group"
            aria-label="Filter by section"
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
                className={`content-filter-btn ${sectionFilter === id ? "content-filter-btn--active" : ""}`}
                onClick={() => setSectionFilter(id)}
              >
                {label}
              </button>
            ))}
          </div>
        </div>

        {showPdfBlock ? (
          <>
            <div
              id="section-pdf"
              className="section-header section-header--first"
            >
              <i className="bx bx-file-pdf" aria-hidden />
              <h2>Published PDF Works</h2>
              <p>Readable manuscripts & essays</p>
            </div>
            <div id="pdfGallery" className="gallery-grid">
              {pdfWorks.length === 0 ? (
                <div className="empty-state">
                  <i className="bx bx-folder-open" aria-hidden />
                  <p>No PDF works match your filters.</p>
                </div>
              ) : (
                pdfWorks.map((work) => (
                  <div key={work.id} className="work-card">
                    <div className="card-icon pdf-icon">
                      <i className="bx bxs-file-pdf" aria-hidden />
                    </div>
                    <div className="card-title">{work.title}</div>
                    <div className="card-description">{work.description}</div>
                    <div className="card-actions">
                      <a
                        href={work.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="card-link pdf-link"
                      >
                        <i className="bx bx-file-pdf" aria-hidden />
                        Read PDF
                      </a>
                      <button
                        type="button"
                        className="card-link share-link"
                        onClick={() => shareWork(work.title, work.url)}
                      >
                        <i className="bx bx-share-alt" aria-hidden />
                        Share
                      </button>
                    </div>
                  </div>
                ))
              )}
            </div>
          </>
        ) : null}

        {showInterviewBlock ? (
          <>
            <div id="section-interviews" className="section-header">
              <i className="bx bx-microphone" aria-hidden />
              <h2>Interviews & External Resources</h2>
              <p>Conversations, podcasts & features</p>
            </div>
            <div id="interviewGallery" className="gallery-grid">
              {interviewWorks.length === 0 ? (
                <div className="empty-state">
                  <i className="bx bx-microphone-off" aria-hidden />
                  <p>No interview resources match your filters.</p>
                </div>
              ) : (
                interviewWorks.map((work) => (
                  <div key={work.id} className="work-card">
                    <div className="card-icon interview-icon">
                      <i className="bx bx-microphone" aria-hidden />
                    </div>
                    <div className="card-title">{work.title}</div>
                    <div className="card-description">{work.description}</div>
                    <div className="card-actions">
                      <a
                        href={work.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="card-link interview-link"
                      >
                        <i className="bx bx-link-external" aria-hidden />
                        View Resource
                      </a>
                      <button
                        type="button"
                        className="card-link share-link"
                        onClick={() => shareWork(work.title, work.url)}
                      >
                        <i className="bx bx-share-alt" aria-hidden />
                        Share
                      </button>
                    </div>
                  </div>
                ))
              )}
            </div>
          </>
        ) : null}
      </main>

      <footer id="site-footer">
        <div className="footer-primary">
          <i className="bx bx-copyright" aria-hidden /> Ally Saleh — Digital
          Archive · Documents by the author
        </div>
        <br />
        <p className="footer-powered">
          <strong>
            Proudly powered by{" "}
            <a
              href="https://www.chwakahouse.co.tz"
              target="_blank"
              rel="noopener noreferrer"
            >
              The Chwaka House
            </a>
          </strong>
        </p>
      </footer>
    </div>
  );
}
