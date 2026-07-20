"use client";

import StaggerContainer, { StaggerItem } from "./StaggerContainer";
import Counter from "./Counter";
import { BookOpen, Users, Heart, Award } from "lucide-react";

const stats = [
  {
    icon: BookOpen,
    end: 3,
    suffix: "+",
    label: "Published Works",
  },
  {
    icon: Users,
    end: 15,
    suffix: "+",
    label: "Years of Service",
  },
  {
    icon: Heart,
    end: 50,
    suffix: "+",
    label: "Community Initiatives",
  },
  {
    icon: Award,
    end: 10,
    suffix: "+",
    label: "Leadership Roles",
  },
];

export default function Stats() {
  return (
    <section className="relative py-24 lg:py-32 bg-deep-charcoal">
      <div className="max-w-7xl mx-auto px-4 sm:px-5 lg:px-6">
        <StaggerContainer className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {stats.map((stat) => {
            const Icon = stat.icon;
            return (
              <StaggerItem key={stat.label}>
                <div className="glass-card rounded-none p-8 text-center group">
                  <div className="w-12 h-12 mx-auto mb-6 rounded-full border border-gold/10 flex items-center justify-center group-hover:border-gold/30 group-hover:bg-gold/5 transition-all">
                    <Icon
                      size={20}
                      className="text-gold/60 group-hover:text-gold transition-colors"
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
