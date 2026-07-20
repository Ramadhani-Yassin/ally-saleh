"use client";

import StaggerContainer, { StaggerItem } from "./StaggerContainer";
import Counter from "./Counter";
import { BookOpen, Users, Heart, Award } from "lucide-react";
import { useLang } from "@/context/LanguageContext";

export default function Stats() {
  const { tc } = useLang();

  const stats = [
    { icon: BookOpen, end: 3, suffix: "+", label: tc("statLabel1") },
    { icon: Users, end: 15, suffix: "+", label: tc("statLabel2") },
    { icon: Heart, end: 50, suffix: "+", label: tc("statLabel3") },
    { icon: Award, end: 10, suffix: "+", label: tc("statLabel4") },
  ];

  return (
    <section className="relative py-24 lg:py-32 bg-deep-charcoal">
      <div className="max-w-7xl mx-auto px-4 sm:px-5 lg:px-6">
        <StaggerContainer className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {stats.map((stat) => {
            const Icon = stat.icon;
            return (
              <StaggerItem key={stat.label}>
                <div className="accent-card rounded-none p-8 text-center group">
                  <div className="w-12 h-12 mx-auto mb-6 rounded-full border border-copper/10 flex items-center justify-center group-hover:border-copper/30 group-hover:bg-copper/5 transition-all">
                    <Icon
                      size={20}
                      className="text-copper/60 group-hover:text-copper transition-colors"
                    />
                  </div>
                  <div className="font-heading text-4xl lg:text-5xl text-gradient mb-2">
                    <Counter end={stat.end} suffix={stat.suffix} />
                  </div>
                  <p className="text-soft-white/70 text-sm tracking-wider uppercase">
                    {stat.label}
                  </p>
                </div>
              </StaggerItem>
            );
          })}
        </StaggerContainer>
      </div>
    </section>
  );
}
