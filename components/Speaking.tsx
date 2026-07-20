"use client";

import { Mic, ArrowRight, Lightbulb, Target, Globe, Users as UsersIcon, BookOpen, Heart, Zap, MessageCircle } from "lucide-react";
import ScrollReveal from "./ScrollReveal";
import StaggerContainer, { StaggerItem } from "./StaggerContainer";
import { useLang } from "@/context/LanguageContext";

export default function Speaking() {
  const { tc } = useLang();

  const topics = [
    { icon: Lightbulb, label: tc("speakingTopic1") },
    { icon: Target, label: tc("speakingTopic2") },
    { icon: Globe, label: tc("speakingTopic3") },
    { icon: UsersIcon, label: tc("speakingTopic4") },
    { icon: BookOpen, label: tc("speakingTopic5") },
    { icon: Heart, label: tc("speakingTopic6") },
    { icon: Zap, label: tc("speakingTopic7") },
    { icon: MessageCircle, label: tc("speakingTopic8") },
  ];

  return (
    <section id="speaking" className="relative py-32 lg:py-40 bg-rich-black scroll-mt-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-5 lg:px-6">
        <div className="grid lg:grid-cols-2 gap-16 lg:gap-24 items-center">
          <ScrollReveal>
            <span className="text-copper text-sm tracking-[0.3em] uppercase font-medium">
              {tc("speakingLabel")}
            </span>
            <h2 className="font-heading text-4xl sm:text-5xl lg:text-6xl text-soft-white mt-6 leading-[1.15]">
              {tc("speakingHeading")}{" "}
              <span className="text-gradient">{tc("speakingHeadingHighlight")}</span>
            </h2>
            <p className="text-soft-white/70 mt-6 leading-relaxed max-w-lg">
              {tc("speakingDescription")}
            </p>

            <div className="mt-10">
              <StaggerContainer className="flex flex-wrap gap-3">
                {topics.map((topic) => {
                  const Icon = topic.icon;
                  return (
                    <StaggerItem key={topic.label}>
                      <div className="group flex items-center gap-2 px-4 py-2.5 border border-copper/10 hover:border-copper/30 bg-rich-black hover:bg-copper/5 transition-all duration-300">
                        <Icon
                          size={14}
                          className="text-copper/60 group-hover:text-copper transition-colors"
                        />
                        <span className="text-soft-white/60 group-hover:text-soft-white text-sm transition-colors">
                          {topic.label}
                        </span>
                      </div>
                    </StaggerItem>
                  );
                })}
              </StaggerContainer>
            </div>

            <ScrollReveal delay={0.5}>
              <a
                href="#contact"
                className="group inline-flex items-center gap-2 mt-10 px-8 py-4 bg-copper text-rich-black font-medium text-sm tracking-wider uppercase transition-all duration-300 hover:bg-soft-white hover:shadow-[0_0_40px_rgba(212,175,55,0.3)]"
              >
                <Mic size={16} />
                {tc("speakingBtn")}
                <ArrowRight
                  size={16}
                  className="group-hover:translate-x-1 transition-transform"
                />
              </a>
            </ScrollReveal>
          </ScrollReveal>

          <ScrollReveal direction="right" delay={0.2}>
            <div className="relative">
              <div className="absolute -inset-4 bg-gradient-to-br from-copper/5 to-transparent" />
              <div className="accent-card rounded-none p-10 sm:p-12 lg:p-14 relative">
                <div className="flex items-center gap-4 mb-8">
                  <div className="w-16 h-16 rounded-full border border-copper/20 flex items-center justify-center bg-rich-black">
                    <Mic size={28} className="text-copper" />
                  </div>
                  <div>
                    <h3 className="font-heading text-2xl text-soft-white">
                      {tc("speakingProfileHeading")}
                    </h3>
                    <p className="text-soft-white/60 text-sm">
                      {tc("speakingProfileSub")}
                    </p>
                  </div>
                </div>

                <div className="space-y-4">
                  {[
                    { label: tc("speakingDetail1Label"), value: tc("speakingDetail1Value") },
                    { label: tc("speakingDetail2Label"), value: tc("speakingDetail2Value") },
                    { label: tc("speakingDetail3Label"), value: tc("speakingDetail3Value") },
                  ].map((item) => (
                    <div
                      key={item.label}
                      className="flex justify-between items-center py-3 border-b border-copper/5"
                    >
                      <span className="text-soft-white/60 text-sm">
                        {item.label}
                      </span>
                      <span className="text-soft-white/80 text-sm font-medium">
                        {item.value}
                      </span>
                    </div>
                  ))}
                </div>

                <p className="mt-8 text-soft-white/70 text-sm leading-relaxed italic">
                  &ldquo;{tc("speakingQuote")}&rdquo;
                </p>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
}
