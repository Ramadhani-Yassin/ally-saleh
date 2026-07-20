"use client";

import ScrollReveal from "./ScrollReveal";
import StaggerContainer, { StaggerItem } from "./StaggerContainer";

const roles = [
  "Politician & Public Leader",
  "Lawyer & Advocate",
  "Poet & Author",
  "Journalist",
  "Community Developer",
];

export default function About() {
  return (
    <section id="about" className="relative py-32 lg:py-40 bg-rich-black scroll-mt-24">
      <div className="max-w-5xl mx-auto px-4 sm:px-5 lg:px-6">
        <ScrollReveal>
          <div className="text-center mb-16">
            <span className="text-gold text-sm tracking-[0.3em] uppercase font-medium">
              About
            </span>
            <div className="mt-8 relative">
              <span className="text-6xl sm:text-7xl lg:text-8xl font-heading text-gold/10 absolute -top-12 left-1/2 -translate-x-1/2 select-none pointer-events-none leading-none">
                &ldquo;
              </span>
              <h2 className="font-heading text-3xl sm:text-4xl lg:text-5xl text-soft-white leading-[1.3] italic max-w-3xl mx-auto">
                A Voice for{" "}
                <span className="text-gradient not-italic">Change</span>.
                <br />
                A Pen for{" "}
                <span className="text-gradient not-italic">Purpose</span>.
              </h2>
              <div className="w-16 h-0.5 bg-gold/40 mx-auto mt-8" />
            </div>
          </div>
        </ScrollReveal>

        <div className="max-w-4xl mx-auto">
          <ScrollReveal delay={0.2}>
            <p className="text-soft-white/70 text-lg lg:text-xl leading-relaxed font-light text-center">
              Ally Saleh is a distinguished Zanzibari figure — a politician,
              lawyer, journalist, poet, and author whose work spans the worlds
              of public service and creative expression. Through his writing and
              leadership, he continues to shape the cultural and political
              landscape of Zanzibar.
            </p>
          </ScrollReveal>

          <ScrollReveal delay={0.4}>
            <div className="mt-12 pt-8 border-t border-gold/10">
              <StaggerContainer className="flex flex-wrap justify-center gap-x-12 gap-y-3">
                {roles.map((role) => (
                  <StaggerItem key={role}>
                    <div className="flex items-center gap-2 group">
                      <span className="w-1.5 h-1.5 rounded-full bg-gold/40 group-hover:bg-gold transition-colors flex-shrink-0" />
                      <span className="text-soft-white/60 group-hover:text-soft-white transition-colors text-sm sm:text-base">
                        {role}
                      </span>
                    </div>
                  </StaggerItem>
                ))}
              </StaggerContainer>
            </div>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
}
