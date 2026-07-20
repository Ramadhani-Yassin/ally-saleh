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
import { useLang } from "@/context/LanguageContext";

export default function Impact() {
  const { tc } = useLang();

  const milestones = [
    {
      icon: Scale,
      title: tc("impactMilestone1Title"),
      subtitle: tc("impactMilestone1Sub"),
      year: "",
    },
    {
      icon: BookOpen,
      title: tc("impactMilestone2Title"),
      subtitle: tc("impactMilestone2Sub"),
      year: "",
    },
    {
      icon: Mic,
      title: tc("impactMilestone3Title"),
      subtitle: tc("impactMilestone3Sub"),
      year: "",
    },
    {
      icon: Building2,
      title: tc("impactMilestone4Title"),
      subtitle: tc("impactMilestone4Sub"),
      year: "",
    },
    {
      icon: Briefcase,
      title: tc("impactMilestone5Title"),
      subtitle: tc("impactMilestone5Sub"),
      year: "",
    },
  ];

  return (
    <section id="impact" className="relative py-32 lg:py-40 bg-rich-black scroll-mt-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-5 lg:px-6">
        <ScrollReveal>
          <div className="text-center mb-20">
            <span className="text-copper text-sm tracking-[0.3em] uppercase font-medium">
              {tc("impactLabel")}
            </span>
            <h2 className="font-heading text-4xl sm:text-5xl lg:text-6xl text-soft-white mt-6 leading-[1.15]">
              {tc("impactHeading")}{" "}
              <span className="text-gradient">{tc("impactHeadingHighlight")}</span>
            </h2>
          </div>
        </ScrollReveal>

        <div className="relative max-w-3xl mx-auto">
          <div className="absolute left-8 top-0 bottom-0 w-px bg-gradient-to-b from-copper/30 via-copper/10 to-transparent" />

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
                    <div className="absolute left-4 top-1 w-9 h-9 rounded-full border border-copper/20 bg-rich-black flex items-center justify-center group-hover:border-copper/60 group-hover:bg-copper/10 transition-all duration-300 z-10">
                      <Icon
                        size={16}
                        className="text-copper/60 group-hover:text-copper transition-colors"
                      />
                    </div>

                    <div className="accent-card rounded-none p-6 sm:p-8">
                      <span className="text-copper/50 text-xs tracking-[0.2em] uppercase">
                        {milestone.year || `Milestone ${index + 1}`}
                      </span>
                      <h3 className="font-heading text-xl sm:text-2xl text-soft-white mt-2 group-hover:text-copper transition-colors">
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
