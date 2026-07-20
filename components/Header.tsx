"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Menu, X } from "lucide-react";
import { useLang } from "@/context/LanguageContext";

const navLinks = [
  { label: "Home", href: "#home", key: "navHome" as const },
  { label: "About", href: "#about" },
  { label: "Works", href: "#books" },
  { label: "Impact", href: "#impact" },
  { label: "Public Voice", href: "#speaking" },
  { label: "Gallery", href: "#gallery" },
  { label: "Testimonials", href: "#testimonials" },
  { label: "Contact", href: "#contact" },
];

export default function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("home");
  const { lang, toggleLang, t } = useLang();

  useEffect(() => {
    const onScroll = () => {
      const sections = navLinks.map((l) => l.href.slice(1));
      for (let i = sections.length - 1; i >= 0; i--) {
        const el = document.getElementById(sections[i]);
        if (el && el.getBoundingClientRect().top <= 150) {
          setActiveSection(sections[i]);
          break;
        }
      }
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const scrollTo = (id: string) => {
    setMobileOpen(false);
    const el = document.getElementById(id);
    if (el) {
      const top = el.getBoundingClientRect().top + window.scrollY - 100;
      window.scrollTo({ top, behavior: "smooth" });
    }
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 transition-all duration-500 bg-deep-charcoal/90 backdrop-blur-md border-b border-copper/10">
      <nav className="w-full px-4 sm:px-5 lg:px-6 flex items-center justify-between h-20">
        <button
          onClick={() => scrollTo("home")}
          className="text-lg tracking-[0.25em] font-heading font-bold transition-colors duration-300 cursor-pointer"
        >
          <span className="text-soft-white">ALLY</span>{" "}
          <span className="text-copper">SALEH</span>
        </button>

        <div className="hidden lg:flex items-center gap-8">
          {navLinks.map((link) => {
            const sectionId = link.href.slice(1);
            const isActive = activeSection === sectionId;
            return (
              <a
                key={link.href}
                href={link.href}
                onClick={() => scrollTo(sectionId)}
                className={`text-sm tracking-wider transition-all duration-300 relative py-1 cursor-pointer ${
                  isActive
                    ? "text-copper"
                    : "text-soft-white/70 hover:text-soft-white"
                }`}
              >
                {link.key ? t(link.key) : link.label}
                {isActive && (
                  <span className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-copper" />
                )}
              </a>
            );
          })}

          <button
            onClick={toggleLang}
            className="ml-4 px-3 py-1.5 text-xs tracking-wider uppercase border border-copper/30 text-copper hover:bg-copper/10 transition-all duration-300"
          >
            {lang === "en" ? "SW" : "EN"}
          </button>
        </div>

        <div className="flex items-center gap-3 lg:hidden">
          <button
            onClick={toggleLang}
            className="px-3 py-1.5 text-xs tracking-wider uppercase border border-copper/30 text-copper hover:bg-copper/10 transition-all duration-300"
          >
            {lang === "en" ? "SW" : "EN"}
          </button>
          <button
            className="text-soft-white p-2"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="Toggle menu"
          >
            {mobileOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </nav>

      {mobileOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="fixed inset-x-0 top-20 bottom-0 lg:hidden z-40"
        >
          <div
            className="absolute inset-0 bg-black/60"
            onClick={() => setMobileOpen(false)}
          />
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="relative bg-deep-charcoal/95 backdrop-blur-xl border-t border-copper/10 shadow-2xl"
          >
            <div className="px-4 sm:px-5 py-6 flex flex-col gap-2">
              {navLinks.map((link) => {
                const sectionId = link.href.slice(1);
                const isActive = activeSection === sectionId;
                return (
                  <button
                    key={link.href}
                    onClick={() => scrollTo(sectionId)}
                    className={`w-full text-left text-sm tracking-wider py-3 px-4 transition-colors ${
                      isActive
                        ? "text-copper bg-copper/5"
                        : "text-soft-white/70 hover:text-soft-white hover:bg-white/5"
                    }`}
                  >
                    {link.key ? t(link.key) : link.label}
                  </button>
                );
              })}
            </div>
          </motion.div>
        </motion.div>
      )}
    </header>
  );
}
