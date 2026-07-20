"use client";

import ScrollReveal from "./ScrollReveal";
import { useLang } from "@/context/LanguageContext";

export default function QuoteSection() {
  const { tc } = useLang();

  return (
    <section className="relative py-32 lg:py-44 bg-deep-charcoal overflow-hidden">
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="w-[800px] h-[800px] rounded-full bg-gradient-radial from-copper/[0.02] to-transparent" />
      </div>

      <div className="relative max-w-4xl mx-auto px-4 sm:px-5 lg:px-6 text-center">
        <ScrollReveal>
          <span className="text-copper/30 font-heading text-8xl leading-none block mb-8">
            &ldquo;
          </span>
        </ScrollReveal>

        <ScrollReveal delay={0.2}>
          <blockquote className="font-heading text-2xl sm:text-3xl lg:text-4xl xl:text-5xl text-soft-white leading-[1.3] tracking-tight">
            {tc("quoteText")}
          </blockquote>
        </ScrollReveal>

        <ScrollReveal delay={0.4}>
          <div className="mt-10">
            <p className="text-copper text-sm tracking-[0.3em] uppercase font-medium">
              — {tc("quoteAuthor")}
            </p>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
