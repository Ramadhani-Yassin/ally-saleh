"use client";

import { useState, useMemo } from "react";
import {
  Book,
  BookOpen,
  Globe,
  ExternalLink,
  Share2,
  FileText,
  CheckCircle,
} from "lucide-react";
import ScrollReveal from "./ScrollReveal";
import StaggerContainer, { StaggerItem } from "./StaggerContainer";
import {
  DEMO_WORKS,
  resolveUhakikiUrl,
  type ArchiveWork,
  type WorkCategory,
} from "@/lib/archive-data";
import { useLang } from "@/context/LanguageContext";

type NavFilter = "all" | "Poetry" | "Short stories" | "Online";

type DisplayCard = {
  id: string;
  type: Exclude<NavFilter, "all">;
  title: string;
  desc: string;
  link: string;
  uhakikiUrl?: string;
};

function categoryToDisplayType(cat: WorkCategory): DisplayCard["type"] {
  if (cat === "poetry") return "Poetry";
  if (cat === "short-story") return "Short stories";
  return "Online";
}

function workToCard(w: ArchiveWork, allWorks: ArchiveWork[]): DisplayCard {
  return {
    id: w.id,
    type: categoryToDisplayType(w.category),
    title: w.title,
    desc: w.description,
    link: w.url,
    uhakikiUrl: resolveUhakikiUrl(w, allWorks),
  };
}

const typeIcon = {
  Poetry: Book,
  "Short stories": BookOpen,
  Online: Globe,
};

export default function Books() {
  const [activeFilter, setActiveFilter] = useState<NavFilter>("all");
  const [searchQuery, setSearchQuery] = useState("");
  const { t, tc } = useLang();

  const cards = useMemo(() => DEMO_WORKS.map((w) => workToCard(w, DEMO_WORKS)), []);

  const filters: NavFilter[] = ["all", "Poetry", "Short stories", "Online"];

  const badgeLabel: Record<DisplayCard["type"], string> = {
    Poetry: t("badgePoetry"),
    "Short stories": t("badgeShortStory"),
    Online: t("badgeOnline"),
  };

  const actionLabel: Record<DisplayCard["type"], string> = {
    Poetry: t("actionOpenBook"),
    "Short stories": t("actionOpenBook"),
    Online: t("actionOpenLink"),
  };

  const filterLabel: Record<NavFilter, string> = {
    all: t("filterAll"),
    Poetry: t("filterPoetry"),
    "Short stories": t("filterShortStories"),
    Online: t("filterOnline"),
  };

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

  const handleOpen = (item: DisplayCard) => {
    window.open(item.link, "_blank", "noopener,noreferrer");
  };

  const handleShare = async (item: DisplayCard) => {
    const url = item.link;
    try {
      await navigator.share({ title: item.title, url });
    } catch {
      try {
        await navigator.clipboard.writeText(url);
      } catch {
        // fallback
      }
    }
  };

  return (
    <section id="books" className="relative py-32 lg:py-40 bg-deep-charcoal scroll-mt-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-5 lg:px-6">
        <ScrollReveal>
          <div className="text-center mb-16">
            <span className="text-copper text-sm tracking-[0.3em] uppercase font-medium">
              {tc("worksLabel")}
            </span>
            <h2 className="font-heading text-4xl sm:text-5xl lg:text-6xl text-soft-white mt-6 leading-[1.15]">
              {tc("worksHeading")}{" "}
              <span className="text-gradient">{tc("worksHeadingHighlight")}</span>
            </h2>
          </div>
        </ScrollReveal>

        <ScrollReveal delay={0.1}>
          <div className="max-w-md mx-auto mb-8">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder={t("searchPlaceholder")}
              className="w-full bg-transparent border border-copper/10 px-4 py-3 text-soft-white text-sm outline-none transition-all focus:border-copper/40 focus:bg-copper/5 placeholder:text-soft-white/30"
            />
          </div>

          <div className="flex flex-wrap justify-center gap-2 mb-12">
            {filters.map((filter) => (
              <button
                key={filter}
                onClick={() => setActiveFilter(filter)}
                className={`px-5 py-2.5 text-xs tracking-wider uppercase transition-all duration-300 ${
                  activeFilter === filter
                    ? "bg-copper text-rich-black font-medium"
                    : "border border-copper/20 text-soft-white/70 hover:border-copper/40 hover:text-soft-white"
                }`}
              >
                {filterLabel[filter]}
              </button>
            ))}
          </div>
        </ScrollReveal>

        {filteredCards.length === 0 ? (
          <p className="text-center text-soft-white/50 text-sm">{t("noResults")}</p>
        ) : (
          <StaggerContainer className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {filteredCards.map((item) => {
              const Icon = typeIcon[item.type];
              return (
                <StaggerItem key={item.id}>
                  <div className="group accent-card rounded-none p-6 flex flex-col h-full">
                    <div className="flex items-start justify-between mb-4">
                      <div className="w-10 h-10 rounded-full border border-copper/10 flex items-center justify-center flex-shrink-0">
                        <Icon size={18} className="text-copper/60" />
                      </div>
                      {item.uhakikiUrl && (
                        <button
                          onClick={() =>
                            window.open(item.uhakikiUrl, "_blank", "noopener,noreferrer")
                          }
                          className="inline-flex items-center gap-1.5 text-xs text-copper/70 hover:text-copper transition-colors"
                        >
                          <CheckCircle size={12} />
                          {tc("worksReview")}
                        </button>
                      )}
                    </div>

                    <h3 className="font-heading text-lg text-soft-white mb-1.5 group-hover:text-copper transition-colors">
                      {item.title}
                    </h3>
                    <p className="text-soft-white/60 text-sm leading-relaxed mb-4 line-clamp-2">
                      {item.desc}
                    </p>

                    <div className="mt-auto">
                      <span className="inline-flex items-center gap-1.5 text-[10px] tracking-wider uppercase text-soft-white/40 border border-copper/10 px-2.5 py-1 mb-4">
                        <FileText size={10} />
                        {badgeLabel[item.type]}
                      </span>

                      <div className="flex gap-2">
                        <button
                          onClick={() => handleOpen(item)}
                          className="flex-1 inline-flex items-center justify-center gap-2 px-3 py-2.5 bg-copper/10 border border-copper/20 text-copper text-xs tracking-wider uppercase font-medium hover:bg-copper hover:text-rich-black transition-all duration-300"
                        >
                          {item.type === "Online" ? (
                            <ExternalLink size={12} />
                          ) : (
                            <BookOpen size={12} />
                          )}
                          {actionLabel[item.type]}
                        </button>
                        <button
                          onClick={() => handleShare(item)}
                          className="inline-flex items-center justify-center px-3 py-2.5 border border-copper/10 text-soft-white/60 hover:border-copper/30 hover:text-copper transition-all duration-300"
                        >
                          <Share2 size={12} />
                        </button>
                      </div>
                    </div>
                  </div>
                </StaggerItem>
              );
            })}
          </StaggerContainer>
        )}
      </div>
    </section>
  );
}
