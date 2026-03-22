"use client";

// import Link from "next/link";
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

type SectionFilter = "all" | "poetry" | "short-story" | "resource";

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

  const poetryWorks = useMemo(
    () => filteredWorks.filter((w) => w.category === "poetry"),
    [filteredWorks]
  );
  const shortStoryWorks = useMemo(
    () => filteredWorks.filter((w) => w.category === "short-story"),
    [filteredWorks]
  );
  const resourceWorks = useMemo(
    () => filteredWorks.filter((w) => w.category === "resource"),
    [filteredWorks]
  );

  const showPoetryBlock =
    sectionFilter === "all" || sectionFilter === "poetry";
  const showShortStoryBlock =
    sectionFilter === "all" || sectionFilter === "short-story";
  const showResourceBlock =
    sectionFilter === "all" || sectionFilter === "resource";

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

  const goPoetry = useCallback(() => {
    closeMobileNav();
    setSectionFilter("poetry");
    scrollToSection("section-poetry");
  }, [closeMobileNav, scrollToSection]);

  const goShortStories = useCallback(() => {
    closeMobileNav();
    setSectionFilter("short-story");
    scrollToSection("section-short-stories");
  }, [closeMobileNav, scrollToSection]);

  const goOnlineResources = useCallback(() => {
    closeMobileNav();
    setSectionFilter("resource");
    scrollToSection("section-online-resources");
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
              <p>Documents archive · Poetry, short stories & online resources</p>
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
                onClick={goPoetry}
              >
                Poetry
              </button>
              <button
                type="button"
                className="home-nav-link"
                onClick={goShortStories}
              >
                Short stories
              </button>
              <button
                type="button"
                className="home-nav-link"
                onClick={goOnlineResources}
              >
                Online
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
              {/* Admin login hidden — restore by uncommenting Link import and this block
              <Link href="/admin/login" className="admin-toggle-btn">
                <i className="bx bx-lock-alt" aria-hidden />
                <span>Admin Console</span>
              </Link>
              */}
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
              onClick={goPoetry}
            >
              <i className="bx bx-book-heart" aria-hidden />
              Poetry
            </button>
            <button
              type="button"
              className="home-drawer-link"
              onClick={goShortStories}
            >
              <i className="bx bx-book-open" aria-hidden />
              Short stories
            </button>
            <button
              type="button"
              className="home-drawer-link"
              onClick={goOnlineResources}
            >
              <i className="bx bx-link-external" aria-hidden />
              Online resources
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
            {/* Admin login hidden — restore by uncommenting Link import and this block
            <Link
              href="/admin/login"
              className="home-drawer-action home-drawer-action--admin"
              onClick={closeMobileNav}
            >
              <i className="bx bx-lock-alt" aria-hidden />
              Admin console
            </Link>
            */}
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
                { id: "poetry" as const, label: "Poetry" },
                { id: "short-story" as const, label: "Short stories" },
                { id: "resource" as const, label: "Online" },
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

        {showPoetryBlock ? (
          <>
            <div
              id="section-poetry"
              className="section-header section-header--first"
            >
              <i className="bx bx-book-heart" aria-hidden />
              <h2>Poetry</h2>
              <p>Vitabu vya mashairi — bofya kufungua kila kitabu</p>
            </div>
            <div id="poetryGallery" className="gallery-grid">
              {poetryWorks.length === 0 ? (
                <div className="empty-state">
                  <i className="bx bx-folder-open" aria-hidden />
                  <p>No poetry works match your filters.</p>
                </div>
              ) : (
                poetryWorks.map((work) => (
                  <div key={work.id} className="work-card">
                    <div className="card-icon interview-icon">
                      <i className="bx bx-book-heart" aria-hidden />
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
                        Open book
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

        {showShortStoryBlock ? (
          <>
            <div id="section-short-stories" className="section-header">
              <i className="bx bx-book-open" aria-hidden />
              <h2>Short stories</h2>
              <p>Hadithi fupi — bofya kufungua kila kitabu</p>
            </div>
            <div id="shortStoriesGallery" className="gallery-grid">
              {shortStoryWorks.length === 0 ? (
                <div className="empty-state">
                  <i className="bx bx-book-open" aria-hidden />
                  <p>No short stories match your filters.</p>
                </div>
              ) : (
                shortStoryWorks.map((work) => (
                  <div key={work.id} className="work-card">
                    <div className="card-icon pdf-icon">
                      <i className="bx bx-book-open" aria-hidden />
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
                        <i className="bx bx-link-external" aria-hidden />
                        Open book
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

        {showResourceBlock ? (
          <>
            <div id="section-online-resources" className="section-header">
              <i className="bx bx-globe" aria-hidden />
              <h2>Online resources & links</h2>
              <p>Video, uhakiki, na makala — viungo vya nje</p>
            </div>
            <div id="onlineResourcesGallery" className="gallery-grid">
              {resourceWorks.length === 0 ? (
                <div className="empty-state">
                  <i className="bx bx-link" aria-hidden />
                  <p>No online resources match your filters.</p>
                </div>
              ) : (
                resourceWorks.map((work) => (
                  <div key={work.id} className="work-card">
                    <div className="card-icon interview-icon">
                      <i className="bx bx-link-external" aria-hidden />
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
                        Open link
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
