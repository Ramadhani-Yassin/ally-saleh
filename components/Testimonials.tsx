"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Quote } from "lucide-react";
import ScrollReveal from "./ScrollReveal";

const testimonials = [
  {
    quote:
      "Ally Saleh's writings capture the soul of Zanzibar. His poetry speaks to the heart of our shared humanity and struggle.",
    author: "Fatma A.",
    role: "Literary Critic, Zanzibar",
  },
  {
    quote:
      "His dedication to public service and the arts is truly inspiring. Ally is a voice that bridges tradition and modernity.",
    author: "Dr. Hussein M.",
    role: "Academic, University of Zanzibar",
  },
  {
    quote:
      "Working alongside Ally Saleh has been a privilege. His commitment to justice, culture, and community is unwavering.",
    author: "Mariam K.",
    role: "Community Leader, Dar es Salaam",
  },
];

export default function Testimonials() {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % testimonials.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section id="testimonials" className="relative py-32 lg:py-40 bg-rich-black overflow-hidden scroll-mt-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-5 lg:px-6">
        <ScrollReveal>
          <div className="text-center mb-16">
            <span className="text-gold text-sm tracking-[0.3em] uppercase font-medium">
              Testimonials
            </span>
            <h2 className="font-heading text-4xl sm:text-5xl lg:text-6xl text-soft-white mt-6 leading-[1.15]">
              Voices of{" "}
              <span className="text-gradient">Respect</span>
            </h2>
          </div>
        </ScrollReveal>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-5 lg:px-6">
        <ScrollReveal>
          <div className="relative min-h-[280px]">
            <AnimatePresence mode="wait">
              <motion.div
                key={current}
                initial={{ opacity: 0, x: 40 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -40 }}
                transition={{ duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] }}
                className="glass-card rounded-none p-8 sm:p-10"
              >
                <Quote size={24} className="text-gold/30 mb-6" />
                <p className="text-soft-white/70 leading-relaxed mb-8 text-sm sm:text-base">
                  &ldquo;{testimonials[current].quote}&rdquo;
                </p>
                <div className="border-t border-gold/10 pt-4">
                  <p className="text-soft-white font-medium text-sm">
                    {testimonials[current].author}
                  </p>
                  <p className="text-soft-white/60 text-xs mt-1">{testimonials[current].role}</p>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          <div className="flex justify-center gap-3 mt-8">
            {testimonials.map((_, i) => (
              <button
                key={i}
                onClick={() => setCurrent(i)}
                className={`w-2.5 h-2.5 rounded-full transition-all duration-300 ${
                  i === current
                    ? "bg-gold w-6"
                    : "bg-gold/20 hover:bg-gold/40"
                }`}
                aria-label={`Go to testimonial ${i + 1}`}
              />
            ))}
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
