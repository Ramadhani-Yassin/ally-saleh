"use client";

import { motion } from "framer-motion";
import ScrollReveal from "./ScrollReveal";
import {
  Briefcase,
  BookOpen,
  Mic,
  Building2,
  Scale,
} from "lucide-react";

const milestones = [
  {
    icon: Scale,
    title: "Lawyer & Advocate",
    subtitle: "Practicing law in service of justice",
    year: "",
  },
  {
    icon: BookOpen,
    title: "Author & Poet",
    subtitle: "Published poetry and literary works",
    year: "",
  },
  {
    icon: Mic,
    title: "Public Leader",
    subtitle: "Political leadership across Zanzibar",
    year: "",
  },
  {
    icon: Building2,
    title: "Journalist",
    subtitle: "Voice in media and public discourse",
    year: "",
  },
  {
    icon: Briefcase,
    title: "Community Developer",
    subtitle: "Building a stronger Zanzibar",
    year: "",
  },
];

export default function Impact() {
  return (
    <section id="impact" className="relative py-32 lg:py-40 bg-rich-black scroll-mt-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-5 lg:px-6">
        <ScrollReveal>
          <div className="text-center mb-20">
            <span className="text-gold text-sm tracking-[0.3em] uppercase font-medium">
              Leadership & Impact
            </span>
            <h2 className="font-heading text-4xl sm:text-5xl lg:text-6xl text-soft-white mt-6 leading-[1.15]">
              A Journey of{" "}
              <span className="text-gradient">Service</span>
            </h2>
          </div>
        </ScrollReveal>

        <div className="relative max-w-3xl mx-auto">
          <div className="absolute left-8 top-0 bottom-0 w-px bg-gradient-to-b from-gold/30 via-gold/10 to-transparent" />

          <div className="space-y-16">
            {milestones.map((milestone, index) => {
              const Icon = milestone.icon;
              return (
                <ScrollReveal key={index} delay={index * 0.15}>
                  <motion.div
                    className="relative pl-20 group"
                    whileHover={{ x: 4 }}
                    transition={{ duration: 0.3 }}
                  >
                    <div className="absolute left-4 top-1 w-9 h-9 rounded-full border border-gold/20 bg-rich-black flex items-center justify-center group-hover:border-gold/60 group-hover:bg-gold/10 transition-all duration-300 z-10">
                      <Icon
                        size={16}
                        className="text-gold/60 group-hover:text-gold transition-colors"
                      />
                    </div>

                    <div className="glass-card rounded-none p-6 sm:p-8">
                      <span className="text-gold/50 text-xs tracking-[0.2em] uppercase">
                        {milestone.year || `Milestone ${index + 1}`}
                      </span>
                      <h3 className="font-heading text-xl sm:text-2xl text-soft-white mt-2 group-hover:text-gold transition-colors">
                        {milestone.title}
                      </h3>
                      <p className="text-soft-white/70 mt-2 text-sm leading-relaxed">
                        {milestone.subtitle}
                      </p>
                    </div>
                  </motion.div>
                </ScrollReveal>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
