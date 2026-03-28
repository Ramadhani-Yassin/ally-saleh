"use client";

import {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import Image from "next/image";
import { useArchiveWorks } from "@/hooks/useArchiveWorks";
import { shareOrCopyLink } from "@/lib/share-link";
import {
  STORAGE_THEME_KEY,
  type ArchiveWork,
  type WorkCategory,
} from "@/lib/archive-data";

import "@/app/style-html.css";

const TYPING_NAME = "Ally Saleh";

function TypingAllySalehLine() {
  const [text, setText] = useState("");
  const [reducedMotion, setReducedMotion] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const apply = () => setReducedMotion(mq.matches);
    apply();
    mq.addEventListener("change", apply);
    return () => mq.removeEventListener("change", apply);
  }, []);

  useEffect(() => {
    if (reducedMotion) {
      setText(TYPING_NAME);
      return;
    }
    let cancelled = false;
    let timerId: number | undefined;

    const typeForward = (i: number) => {
      if (cancelled) return;
      if (i > TYPING_NAME.length) {
        timerId = window.setTimeout(() => deleteBack(TYPING_NAME.length - 1), 2400) as number;
        return;
      }
      setText(TYPING_NAME.slice(0, i));
      const delay = i > 0 && TYPING_NAME[i - 1] === " " ? 200 : 95;
      timerId = window.setTimeout(() => typeForward(i + 1), delay) as number;
    };

    const deleteBack = (len: number) => {
      if (cancelled) return;
      if (len < 0) {
        timerId = window.setTimeout(() => typeForward(0), 500) as number;
        return;
      }
      setText(TYPING_NAME.slice(0, len));
      timerId = window.setTimeout(() => deleteBack(len - 1), 42) as number;
    };

    timerId = window.setTimeout(() => typeForward(0), 450) as number;
    return () => {
      cancelled = true;
      if (timerId !== undefined) window.clearTimeout(timerId);
    };
  }, [reducedMotion]);

  if (reducedMotion) {
    return <>{TYPING_NAME}</>;
  }

  return (
    <>
      {text}
      <span className="hero-type-cursor" aria-hidden>
        |
      </span>
    </>
  );
}

type NavFilter = "all" | "Poetry" | "Short stories" | "Online";

type DisplayCard = {
  id: string;
  type: Exclude<NavFilter, "all">;
  title: string;
  desc: string;
  badge: string;
  actionLabel: string;
  link: string;
};

function categoryToDisplayType(cat: WorkCategory): DisplayCard["type"] {
  if (cat === "poetry") return "Poetry";
  if (cat === "short-story") return "Short stories";
  return "Online";
}

function categoryToBadge(cat: WorkCategory): string {
  if (cat === "poetry") return "Diwani";
  if (cat === "short-story") return "Hadithi";
  return "External link";
}

function categoryToActionLabel(cat: WorkCategory): string {
  if (cat === "resource") return "Open link";
  return "Open book";
}

function workToCard(w: ArchiveWork): DisplayCard {
  const cat = w.category;
  return {
    id: w.id,
    type: categoryToDisplayType(cat),
    title: w.title,
    desc: w.description,
    badge: categoryToBadge(cat),
    actionLabel: categoryToActionLabel(cat),
    link: w.url,
  };
}

const HERO_SLIDES = [
  { src: "/images/Ally_saleh_.png", alt: "Ally Saleh portrait", variant: "" as const },
  { src: "/images/ally-saleh.jpg", alt: "Ally Saleh archive photo", variant: "variant-b" as const },
  { src: "/images/Ally.Saleh.jpg", alt: "Ally Saleh publication archive", variant: "variant-c" as const },
];

export function ArchiveApp() {
  const { works } = useArchiveWorks();
  const [activeFilter, setActiveFilter] = useState<NavFilter>("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [mobileNavOpen, setMobileNavOpen] = useState(false);
  const [isDark, setIsDark] = useState(true);
  const [hydrated, setHydrated] = useState(false);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [autoPlay, setAutoPlay] = useState(true);

  const headerRef = useRef<HTMLElement | null>(null);
  const progressRef = useRef<HTMLDivElement | null>(null);
  const slideElsRef = useRef<Array<HTMLElement | null>>([]);

  const cards = useMemo(() => works.map(workToCard), [works]);

  const filteredCards = useMemo(() => {
    const q = searchQuery.trim().toLowerCase();
    return cards.filter((item) => {
      const matchesFilter = activeFilter === "all" || item.type === activeFilter;
      const matchesSearch =
        !q ||
        item.title.toLowerCase().includes(q) ||
        item.desc.toLowerCase().includes(q);
      return matchesFilter && matchesSearch;
    });
  }, [cards, activeFilter, searchQuery]);

  useEffect(() => {
    document.documentElement.classList.add("archive-shell");
    document.body.classList.add("archive-shell");
    return () => {
      document.documentElement.classList.remove(
        "archive-shell",
        "archive-shell--dark"
      );
      document.body.classList.remove("archive-shell", "archive-shell--dark");
    };
  }, []);

  useEffect(() => {
    const raw =
      typeof window !== "undefined"
        ? window.localStorage.getItem(STORAGE_THEME_KEY) ??
          window.localStorage.getItem("allyTheme")
        : null;
    setIsDark(raw ? raw === "dark" : true);
    setHydrated(true);
  }, []);

  useEffect(() => {
    if (!hydrated) return;
    document.documentElement.classList.toggle("archive-shell--dark", isDark);
    document.body.classList.toggle("archive-shell--dark", isDark);
    window.localStorage.setItem(STORAGE_THEME_KEY, isDark ? "dark" : "light");
  }, [isDark, hydrated]);

  const applyTheme = useCallback((dark: boolean) => {
    setIsDark(dark);
  }, []);

  const setMenuOpen = useCallback((open: boolean) => {
    setMobileNavOpen(open);
  }, []);

  useEffect(() => {
    if (!autoPlay) return;
    const id = window.setInterval(() => {
      setCurrentSlide((s) => (s + 1) % HERO_SLIDES.length);
    }, 4500);
    return () => window.clearInterval(id);
  }, [autoPlay]);

  useEffect(() => {
    const onScroll = () => {
      const scrollTop = window.scrollY || 0;
      const docHeight =
        document.documentElement.scrollHeight - window.innerHeight;
      const progress = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
      if (progressRef.current) progressRef.current.style.width = `${progress}%`;
      const bar = headerRef.current?.querySelector<HTMLElement>(".glass-nav");
      if (bar) {
        bar.classList.toggle("scrolled", scrollTop > 14);
      }
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (!("IntersectionObserver" in window)) {
      slideElsRef.current.forEach((el) => el?.classList.add("show"));
      return;
    }
    const els = slideElsRef.current.filter(Boolean) as HTMLElement[];
    const obs = new IntersectionObserver(
      (entries, o) => {
        entries.forEach((entry, idx) => {
          if (entry.isIntersecting) {
            (entry.target as HTMLElement).style.transitionDelay = `${Math.min(idx, 4) * 0.07}s`;
            entry.target.classList.add("show");
            o.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.15, rootMargin: "0px 0px -40px 0px" }
    );
    els.forEach((el) => obs.observe(el));
    return () => obs.disconnect();
  }, []);

  useEffect(() => {
    const cardsEls = document.querySelectorAll<HTMLElement>(".style-html-root .card");
    if (!("IntersectionObserver" in window)) {
      cardsEls.forEach((c) => c.classList.add("reveal"));
      return;
    }
    const obs = new IntersectionObserver(
      (entries, o) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add("reveal");
            o.unobserve(e.target);
          }
        });
      },
      { threshold: 0.1, rootMargin: "0px 0px -30px 0px" }
    );
    cardsEls.forEach((c) => {
      c.classList.remove("reveal");
      obs.observe(c);
    });
    return () => obs.disconnect();
  }, [filteredCards]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setMenuOpen(false);
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [setMenuOpen]);

  useEffect(() => {
    const onResize = () => {
      if (window.innerWidth > 860) setMenuOpen(false);
    };
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, [setMenuOpen]);

  useEffect(() => {
    const onDocClick = (e: MouseEvent) => {
      if (window.innerWidth > 860) return;
      if (!mobileNavOpen) return;
      const wrap = headerRef.current;
      if (wrap && !wrap.contains(e.target as Node)) {
        setMenuOpen(false);
      }
    };
    document.addEventListener("click", onDocClick);
    return () => document.removeEventListener("click", onDocClick);
  }, [mobileNavOpen, setMenuOpen]);

  const scrollToArchive = useCallback(() => {
    document.getElementById("archive-works")?.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
  }, []);

  const goFilterAndArchive = useCallback(
    (cat: NavFilter) => {
      setActiveFilter(cat);
      setMenuOpen(false);
      window.setTimeout(scrollToArchive, 100);
    },
    [scrollToArchive, setMenuOpen]
  );

  const onOpenCard = useCallback((item: DisplayCard) => {
    if (item.link && item.link !== "#") {
      window.open(item.link, "_blank", "noopener,noreferrer");
    } else {
      window.alert(
        `✨ "${item.title}" — preview mode. Full content available in archive.`
      );
    }
  }, []);

  const onShareCard = useCallback((item: DisplayCard) => {
    void shareOrCopyLink(item.title, item.link).catch(() => {
      window.alert(
        "Sharing failed. Open the work’s button and copy the URL from the browser."
      );
    });
  }, []);

  const goSlide = useCallback((index: number) => {
    setCurrentSlide((index + HERO_SLIDES.length) % HERO_SLIDES.length);
  }, []);

  const bumpSlide = useCallback(
    (delta: number) => {
      setAutoPlay(false);
      goSlide(currentSlide + delta);
      window.setTimeout(() => setAutoPlay(true), 50);
    },
    [currentSlide, goSlide]
  );

  const rootClass =
    `style-html-root ${isDark ? "style-dark" : ""} ${mobileNavOpen ? "mobile-nav-open" : ""}`.trim();

  const registerSlideRef = (i: number) => (el: HTMLElement | null) => {
    slideElsRef.current[i] = el;
  };

  return (
    <div className={rootClass}>
      <div ref={progressRef} className="progress-line" style={{ width: "0%" }} />
      <button
        type="button"
        className="menu-backdrop"
        aria-label="Close navigation menu"
        onClick={() => setMenuOpen(false)}
      />
      <div className="floating-bg" aria-hidden>
        <span
          className="star-particle tiny"
          style={{
            top: "8%",
            left: "10%",
            ["--drift" as string]: "10.2s",
            ["--flash" as string]: "2.3s",
            ["--hue" as string]: "4.3s",
            ["--delay" as string]: "-0.8s",
          }}
        />
        <span
          className="star-particle small"
          style={{
            top: "14%",
            left: "22%",
            ["--drift" as string]: "12.4s",
            ["--flash" as string]: "2.7s",
            ["--hue" as string]: "5.2s",
            ["--delay" as string]: "-2.2s",
          }}
        />
        <span
          className="star-particle medium"
          style={{
            top: "22%",
            left: "78%",
            ["--drift" as string]: "11.7s",
            ["--flash" as string]: "2.4s",
            ["--hue" as string]: "4.7s",
            ["--delay" as string]: "-1.9s",
          }}
        />
        <span
          className="star-particle tiny"
          style={{
            top: "30%",
            left: "64%",
            ["--drift" as string]: "13.6s",
            ["--flash" as string]: "2.6s",
            ["--hue" as string]: "5.9s",
            ["--delay" as string]: "-4.2s",
          }}
        />
        <span
          className="star-particle small"
          style={{
            top: "38%",
            left: "16%",
            ["--drift" as string]: "9.8s",
            ["--flash" as string]: "1.8s",
            ["--hue" as string]: "4.1s",
            ["--delay" as string]: "-3.4s",
          }}
        />
        <span
          className="star-particle medium"
          style={{
            top: "46%",
            left: "86%",
            ["--drift" as string]: "12.9s",
            ["--flash" as string]: "2.5s",
            ["--hue" as string]: "6.2s",
            ["--delay" as string]: "-1.1s",
          }}
        />
        <span
          className="star-particle tiny"
          style={{
            top: "54%",
            left: "42%",
            ["--drift" as string]: "11.4s",
            ["--flash" as string]: "2.1s",
            ["--hue" as string]: "5.5s",
            ["--delay" as string]: "-5.6s",
          }}
        />
        <span
          className="star-particle small"
          style={{
            top: "62%",
            left: "72%",
            ["--drift" as string]: "14.1s",
            ["--flash" as string]: "2.8s",
            ["--hue" as string]: "4.8s",
            ["--delay" as string]: "-2.9s",
          }}
        />
        <span
          className="star-particle medium"
          style={{
            top: "69%",
            left: "26%",
            ["--drift" as string]: "10.8s",
            ["--flash" as string]: "2.2s",
            ["--hue" as string]: "5.1s",
            ["--delay" as string]: "-4.6s",
          }}
        />
        <span
          className="star-particle tiny"
          style={{
            top: "76%",
            left: "58%",
            ["--drift" as string]: "12.2s",
            ["--flash" as string]: "2.3s",
            ["--hue" as string]: "4.9s",
            ["--delay" as string]: "-1.7s",
          }}
        />
        <span
          className="star-particle small"
          style={{
            top: "84%",
            left: "88%",
            ["--drift" as string]: "9.9s",
            ["--flash" as string]: "1.9s",
            ["--hue" as string]: "4.2s",
            ["--delay" as string]: "-6.1s",
          }}
        />
        <span
          className="star-particle medium"
          style={{
            top: "90%",
            left: "8%",
            ["--drift" as string]: "13.1s",
            ["--flash" as string]: "2.7s",
            ["--hue" as string]: "6s",
            ["--delay" as string]: "-3.8s",
          }}
        />
      </div>

      <header ref={headerRef} className="archive-header">
        <nav className="glass-nav">
          <div className="container nav-wrapper">
            <div className="logo-area">
              <h2>✧ Ally Saleh</h2>
              <div className="header-description">
                <span
                  className="header-description--desktop"
                  style={{
                    fontSize: "0.7rem",
                    letterSpacing: "1px",
                    opacity: 0.7,
                  }}
                >
                  Publications archive · Poetry, short stories & online
                </span>
                <span
                  className="header-description--mobile"
                  style={{
                    fontSize: "0.7rem",
                    letterSpacing: "1px",
                    opacity: 0.7,
                  }}
                >
                  Publications archive
                </span>
              </div>
            </div>
            <button
              type="button"
              className="menu-toggle"
              aria-label="Toggle navigation menu"
              aria-controls="mainNavLinks"
              aria-expanded={mobileNavOpen}
              onClick={() => setMenuOpen(!mobileNavOpen)}
            >
              <i className={mobileNavOpen ? "fas fa-times" : "fas fa-bars"} />
            </button>
            <button
              type="button"
              className="dark-mode-toggle dark-mode-toggle-mobile"
              aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
              onClick={() => applyTheme(!isDark)}
            >
              <i className={isDark ? "fas fa-sun" : "fas fa-moon"} />
              <span className="theme-toggle-label">Theme</span>
            </button>
            <div className="nav-links nav-links--desktop" aria-label="Primary navigation">
              <a
                href="#hero"
                onClick={(e) => {
                  e.preventDefault();
                  setMenuOpen(false);
                  document.getElementById("hero")?.scrollIntoView({
                    behavior: "smooth",
                  });
                }}
              >
                Home
              </a>
              <a
                href="#archive-works"
                onClick={(e) => {
                  e.preventDefault();
                  goFilterAndArchive("Poetry");
                }}
              >
                Poetry
              </a>
              <a
                href="#archive-works"
                onClick={(e) => {
                  e.preventDefault();
                  goFilterAndArchive("Short stories");
                }}
              >
                Short stories
              </a>
              <a
                href="#archive-works"
                onClick={(e) => {
                  e.preventDefault();
                  goFilterAndArchive("Online");
                }}
              >
                Online
              </a>
              <a
                href="#archive-works"
                onClick={(e) => {
                  e.preventDefault();
                  goFilterAndArchive("all");
                }}
              >
                Archive
              </a>
              <a
                href="#site-footer"
                onClick={(e) => {
                  e.preventDefault();
                  setMenuOpen(false);
                  document.getElementById("site-footer")?.scrollIntoView({
                    behavior: "smooth",
                  });
                }}
              >
                Footer
              </a>
              <div className="nav-controls">
              <button
                type="button"
                  className="dark-mode-toggle"
                  aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
                  onClick={() => applyTheme(!isDark)}
                >
                  <i className={isDark ? "fas fa-sun" : "fas fa-moon"} />
                  <span className="theme-toggle-label">Theme</span>
              </button>
                <span style={{ fontWeight: 500, cursor: "default" }}>Menu</span>
              </div>
            </div>
          </div>
        </nav>
        <div
          className={`nav-links nav-links--drawer${mobileNavOpen ? " open" : ""}`}
          id="mainNavLinks"
          role="dialog"
          aria-modal="true"
          aria-label="Site menu"
        >
          <a
            href="#hero"
            onClick={(e) => {
              e.preventDefault();
              setMenuOpen(false);
              document.getElementById("hero")?.scrollIntoView({
                behavior: "smooth",
              });
            }}
          >
            Home
          </a>
          <a
            href="#archive-works"
            onClick={(e) => {
              e.preventDefault();
              goFilterAndArchive("Poetry");
            }}
          >
              Poetry
          </a>
          <a
            href="#archive-works"
            onClick={(e) => {
              e.preventDefault();
              goFilterAndArchive("Short stories");
            }}
          >
              Short stories
          </a>
          <a
            href="#archive-works"
            onClick={(e) => {
              e.preventDefault();
              goFilterAndArchive("Online");
            }}
          >
            Online
          </a>
          <a
            href="#archive-works"
            onClick={(e) => {
              e.preventDefault();
              goFilterAndArchive("all");
            }}
          >
            Archive
          </a>
          <a
            href="#site-footer"
            onClick={(e) => {
              e.preventDefault();
              setMenuOpen(false);
              document.getElementById("site-footer")?.scrollIntoView({
                behavior: "smooth",
              });
            }}
          >
            Footer
          </a>
          <div className="nav-controls">
            <button
              type="button"
              className="dark-mode-toggle"
              aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
              onClick={() => applyTheme(!isDark)}
            >
              <i className={isDark ? "fas fa-sun" : "fas fa-moon"} />
              <span className="theme-toggle-label">Theme</span>
            </button>
            <span style={{ fontWeight: 500, cursor: "default" }}>Menu</span>
          </div>
        </div>
      </header>

      <main className="container">
        <div id="hero" className="hero slide-enter" ref={registerSlideRef(0)}>
          <div className="hero-particles" aria-hidden>
            {(
              [
                ["tiny", "10%", "8%", "10.2s", "2.3s", "4.3s", "-0.8s"],
                ["small", "18%", "72%", "12.4s", "2.7s", "5.2s", "-2.2s"],
                ["medium", "42%", "12%", "11.7s", "2.4s", "4.7s", "-1.9s"],
                ["tiny", "55%", "82%", "13.6s", "2.6s", "5.9s", "-4.2s"],
                ["small", "78%", "22%", "9.8s", "1.8s", "4.1s", "-3.4s"],
                ["medium", "28%", "48%", "12.9s", "2.5s", "6.2s", "-1.1s"],
                ["tiny", "65%", "58%", "11.4s", "2.1s", "5.5s", "-5.6s"],
                ["small", "88%", "68%", "10.8s", "2.2s", "5.1s", "-4.6s"],
              ] as const
            ).map(([size, top, left, drift, flash, hue, delay], i) => (
              <span
                key={i}
                className={`star-particle ${size}`}
                style={{
                  top,
                  left,
                  ["--drift" as string]: drift,
                  ["--flash" as string]: flash,
                  ["--hue" as string]: hue,
                  ["--delay" as string]: delay,
                }}
              />
            ))}
          </div>
          <div className="hero-grid">
            <div className="hero-text slide-enter" ref={registerSlideRef(1)}>
              <div className="hero-eyebrow">Digital archive · Author & public voice</div>
              <h1>
                <TypingAllySalehLine />
                <br />
                Publications Archive
              </h1>
              <div className="bio">
                Explore poetry, short stories, and online resources — videos, reviews,
                and articles open in a new tab.
                <br />
                <br />
                Ally Saleh is a prominent Zanzibari politician, lawyer, journalist,
                and poet, known for a long career in both the media and political
                landscapes of Zanzibar. He served as Member of Parliament for the
                Malindi constituency. Originally a high-profile member of the Civic
                United Front (CUF), he later joined ACT Wazalendo. He is a vocal
                advocate for Zanzibari autonomy and has spoken widely on Zanzibar
                identity and the nature of the Tanzanian Union.
              </div>
            </div>
            <div className="hero-image-frame slide-enter" ref={registerSlideRef(2)}>
              <div className="carousel-container">
                <div
                  className="carousel-bg-blur"
                  aria-hidden
                  style={{
                    backgroundImage: `url(${HERO_SLIDES[currentSlide].src})`,
                  }}
                />
                <div className="carousel-slides">
                  {HERO_SLIDES.map((slide, idx) => (
                    <Image
                      key={slide.src}
                      src={slide.src}
                      alt={slide.alt}
                      fill
                      className={`carousel-slide ${slide.variant} ${idx === currentSlide ? "active" : ""}`.trim()}
                      sizes="(max-width: 860px) 90vw, 420px"
                      priority={idx === 0}
                    />
                  ))}
                </div>
            <button
              type="button"
                  className="carousel-btn prev"
                  aria-label="Previous slide"
                  onClick={() => bumpSlide(-1)}
            >
                  <i className="fas fa-chevron-left" />
            </button>
            <button
              type="button"
                  className="carousel-btn next"
                  aria-label="Next slide"
                  onClick={() => bumpSlide(1)}
            >
                  <i className="fas fa-chevron-right" />
            </button>
                <div className="carousel-dots">
                  {HERO_SLIDES.map((_, idx) => (
                    <button
                      key={idx}
                      type="button"
                      className={`dot${idx === currentSlide ? " active" : ""}`}
                      aria-label={`Go to slide ${idx + 1}`}
                      onClick={() => {
                        setAutoPlay(false);
                        goSlide(idx);
                        window.setTimeout(() => setAutoPlay(true), 50);
                      }}
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="scroll-cue-below-hero">
            <button
              type="button"
            className="scroll-hint"
            aria-label="Scroll to archive"
              onClick={() => {
              document.getElementById("archive-works")?.scrollIntoView({
                behavior: "smooth",
                block: "start",
              });
            }}
          >
            <span className="scroll-hint-mouse" aria-hidden>
              <span className="scroll-hint-wheel" />
            </span>
            <span className="scroll-hint-label" aria-hidden>
              Scroll
            </span>
            </button>
        </div>

        <div className="search-section slide-enter" ref={registerSlideRef(3)}>
            <input
            type="text"
            className="search-bar"
            placeholder="🔍 Search titles & descriptions…"
              autoComplete="off"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <div className="filter-tabs">
            {(
              [
                ["all", "All"],
                ["Poetry", "Poetry"],
                ["Short stories", "Short stories"],
                ["Online", "Online"],
              ] as const
            ).map(([cat, label]) => (
              <button
                key={cat}
                type="button"
                data-cat={cat}
                className={`filter-btn${activeFilter === cat ? " active" : ""}`}
                onClick={() => setActiveFilter(cat)}
              >
                {label}
              </button>
            ))}
          </div>
        </div>

        <div
          id="archive-works"
          className="cards-grid slide-enter"
          ref={registerSlideRef(4)}
        >
          {filteredCards.length === 0 ? (
            <div className="no-results">
              <i className="fas fa-search" style={{ marginRight: 10 }} />
              No matching publications — try other keywords
                </div>
              ) : (
            filteredCards.map((item) => {
              const iconClass =
                item.type === "Poetry"
                  ? "fa-feather-alt"
                  : item.type === "Short stories"
                    ? "fa-book-open"
                    : "fa-globe";
              return (
                <div key={item.id} className="card" data-type={item.type}>
                  <div className="card-icon">
                    <i className={`fas ${iconClass}`} />
                  </div>
                  <div className="card-title">{item.title}</div>
                  <div className="card-desc">{item.desc}</div>
                  <div className="card-badge">
                    <i className="fas fa-tag" /> {item.badge}
                    </div>
                    <div className="card-actions">
                      <button
                        type="button"
                      className="action-open"
                      onClick={() => onOpenCard(item)}
                    >
                      <i
                        className={`fas ${item.type === "Online" ? "fa-external-link-alt" : "fa-book-open"}`}
                      />{" "}
                      {item.actionLabel}
                      </button>
                      <button
                        type="button"
                      className="share-btn"
                      onClick={() => onShareCard(item)}
                      >
                      <i className="fas fa-share-alt" /> Share
                      </button>
                    </div>
                  </div>
              );
            })
              )}
            </div>
      </main>

      <footer className="footer" id="site-footer">
        <div className="container footer-content">
          <div>
            <i className="fas fa-feather-alt" /> Ally Saleh — Digital Archive ·
            Documents by the author
        </div>
          <div>
            <i className="fas fa-book-open" /> Proudly powered by{" "}
            <a
              href="https://www.chwakahouse.co.tz"
              className="footer-chwaka-link"
              target="_blank"
              rel="noopener noreferrer"
            >
              The Chwaka House
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}
