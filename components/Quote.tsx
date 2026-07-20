"use client";

import ScrollReveal from "./ScrollReveal";

export default function QuoteSection() {
  return (
    <section className="relative py-32 lg:py-44 bg-deep-charcoal overflow-hidden">
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="w-[800px] h-[800px] rounded-full bg-gradient-radial from-gold/[0.02] to-transparent" />
      </div>

      <div className="relative max-w-4xl mx-auto px-4 sm:px-5 lg:px-6 text-center">
        <ScrollReveal>
          <span className="text-gold/30 font-heading text-8xl leading-none block mb-8">
            &ldquo;
          </span>
        </ScrollReveal>

        <ScrollReveal delay={0.2}>
          <blockquote className="font-heading text-2xl sm:text-3xl lg:text-4xl xl:text-5xl text-soft-white leading-[1.3] tracking-tight">
            The pen and the voice are instruments of change — wield them with
            courage, purpose, and an unwavering love for your people.
          </blockquote>
        </ScrollReveal>

        <ScrollReveal delay={0.4}>
          <div className="mt-10">
            <p className="text-gold text-sm tracking-[0.3em] uppercase font-medium">
              — Ally Saleh
            </p>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
