"use client";

import ScrollReveal from "./ScrollReveal";

export default function Footer() {
  return (
    <footer className="relative py-16 lg:py-20 bg-rich-black border-t border-gold/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-5 lg:px-6">
        <ScrollReveal>
          <div className="text-center">
            <a
              href="#home"
              className="text-xl tracking-[0.25em] font-heading font-bold text-soft-white hover:text-gold transition-colors duration-300"
            >
              ALLY SALEH
            </a>
            <p className="text-soft-white/60 text-sm mt-4 tracking-wider">
              Poet &bull; Author &bull; Lawyer &bull; Public Leader
            </p>

            <div className="gradient-divider my-8 max-w-xs mx-auto" />

            <p className="text-soft-white/50 text-xs tracking-wider">
              &copy; {new Date().getFullYear()} Ally Saleh. All rights reserved.
            </p>
            <p className="text-soft-white/70 text-[10px] tracking-wider mt-2 uppercase">
              Designed with excellence by{" "}
              <a
                href="https://www.ramadhaniyassin.space"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gold hover:text-soft-white transition-colors"
              >
                Ramadhani YASSIN
              </a>
            </p>
          </div>
        </ScrollReveal>
      </div>
    </footer>
  );
}
