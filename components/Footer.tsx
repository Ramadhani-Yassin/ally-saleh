"use client";

import ScrollReveal from "./ScrollReveal";
import { useLang } from "@/context/LanguageContext";

export default function Footer() {
  const { tc } = useLang();

  return (
    <footer className="relative py-16 lg:py-20 bg-rich-black border-t border-copper/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-5 lg:px-6">
        <ScrollReveal>
          <div className="text-center">
            <a
              href="#home"
              className="text-xl tracking-[0.25em] font-heading font-bold text-soft-white hover:text-copper transition-colors duration-300"
            >
              {tc("footerName")}
            </a>
            <p className="text-soft-white/60 text-sm mt-4 tracking-wider">
              {tc("footerTagline")}
            </p>

            <div className="gradient-divider my-8 max-w-xs mx-auto" />

            <p className="text-soft-white/50 text-xs tracking-wider">
              &copy; {new Date().getFullYear()} Ally Saleh. All rights reserved.
            </p>
            <p className="text-soft-white/70 text-[10px] tracking-wider mt-2 uppercase">
              {tc("footerCredit")}{" "}
              <a
                href="https://www.ramadhaniyassin.space"
                target="_blank"
                rel="noopener noreferrer"
                className="text-copper hover:text-soft-white transition-colors"
              >
                {tc("footerCreditName")}
              </a>
            </p>
          </div>
        </ScrollReveal>
      </div>
    </footer>
  );
}
