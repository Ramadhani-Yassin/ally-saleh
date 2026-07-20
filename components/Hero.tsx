"use client";

import { useState, useEffect, useMemo } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowDown } from "lucide-react";
import FloatingBlob from "./FloatingBlob";
import ImageModal from "./ImageModal";

const HERO_IMAGES = [
  "/images/hero/Ally_saleh_.png",
  "/images/hero/ally-saleh.jpg",
  "/images/hero/Ally.Saleh.jpg",
  "/images/hero/Ally-saleh.jpeg",
  "/images/hero/Ally-saleh_.jpeg",
];

const phrases = [
  { prefix: "Words that", highlight: "Inspire" },
  { prefix: "Leadership that", highlight: "Serves" },
];

function shuffleArray<T>(arr: T[]): T[] {
  const shuffled = [...arr];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
}

export default function Hero() {
  const [phraseIndex, setPhraseIndex] = useState(0);
  const [imageIndex, setImageIndex] = useState(0);
  const [imageOpen, setImageOpen] = useState(false);

  const shuffledImages = useMemo(() => shuffleArray(HERO_IMAGES), []);

  useEffect(() => {
    const phraseInterval = setInterval(() => {
      setPhraseIndex((prev) => (prev + 1) % phrases.length);
    }, 4000);
    return () => clearInterval(phraseInterval);
  }, []);

  useEffect(() => {
    const imageInterval = setInterval(() => {
      setImageIndex((prev) => (prev + 1) % shuffledImages.length);
    }, 5000);
    return () => clearInterval(imageInterval);
  }, [shuffledImages.length]);

  const currentImage = shuffledImages[imageIndex];

  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center overflow-hidden bg-deep-charcoal scroll-mt-24"
    >
      <FloatingBlob
        className="absolute -top-1/3 -right-1/4"
        color="rgba(212, 175, 55, 0.04)"
        size={700}
      />
      <FloatingBlob
        className="absolute -bottom-1/3 -left-1/4"
        color="rgba(245, 233, 215, 0.03)"
        size={600}
        delay={5}
      />

      <div className="w-full max-w-7xl mx-auto px-4 sm:px-5 lg:px-6 relative z-10">
        <div className="grid lg:grid-cols-2 items-center min-h-screen py-24 sm:py-28 lg:py-0">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: [0.25, 0.46, 0.45, 0.94] }}
            className="order-1 text-center lg:text-left"
          >
            <div className="font-heading text-[clamp(2rem,5vw,5rem)] sm:text-[clamp(2.5rem,4.5vw,4.5rem)] lg:text-[clamp(3rem,4vw,4.5rem)] xl:text-[clamp(3.5rem,3.8vw,5rem)] leading-[1.15] text-soft-white mb-6 sm:mb-8 min-h-[3.5rem] sm:min-h-[4.5rem]">
              <AnimatePresence mode="wait">
                <motion.h1
                  key={phraseIndex}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -30 }}
                  transition={{ duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }}
                >
                  {phrases[phraseIndex].prefix}{" "}
                  <span className="text-gradient">{phrases[phraseIndex].highlight}</span>.
                </motion.h1>
              </AnimatePresence>
            </div>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.5 }}
              className="text-soft-white/60 text-base sm:text-lg lg:text-xl leading-relaxed max-w-lg mx-auto lg:mx-0 mb-8 sm:mb-12 font-light"
            >
              A Zanzibari poet, author, lawyer, journalist, and public leader
              dedicated to the intersection of literature, public service, and
              the empowerment of his community.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.7 }}
              className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center lg:justify-start"
            >
              <a
                href="#about"
                className="group inline-flex items-center justify-center gap-2 px-6 sm:px-8 py-3 sm:py-4 bg-gold text-rich-black font-medium text-xs sm:text-sm tracking-wider uppercase transition-all duration-300 hover:bg-soft-white hover:shadow-[0_0_40px_rgba(212,175,55,0.3)]"
              >
                Explore My Journey
                <ArrowDown size={16} className="group-hover:translate-y-1 transition-transform" />
              </a>
              <a
                href="#books"
                className="inline-flex items-center justify-center px-6 sm:px-8 py-3 sm:py-4 border border-gold/30 text-soft-white font-medium text-xs sm:text-sm tracking-wider uppercase transition-all duration-300 hover:bg-gold/10 hover:border-gold/60"
              >
                View My Works
              </a>
            </motion.div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.2, delay: 0.3, ease: [0.25, 0.46, 0.45, 0.94] }}
            className="order-2 flex justify-center lg:justify-end"
          >
            <motion.button
              onClick={() => setImageOpen(true)}
              whileHover={{ scale: 1.02 }}
              transition={{ duration: 0.3 }}
              className="relative w-[min(70vw,22rem)] h-[min(85vw,28rem)] sm:w-[min(55vw,24rem)] sm:h-[min(65vw,30rem)] lg:w-[min(38vw,22rem)] lg:h-[min(46vw,28rem)] xl:w-[min(32vw,26rem)] xl:h-[min(40vw,32rem)] cursor-pointer bg-deep-charcoal"
            >
              <AnimatePresence mode="wait">
                <motion.div
                  key={imageIndex}
                  initial={{ opacity: 0, scale: 1.1 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
                  className="absolute inset-0"
                >
                  <Image
                    src={currentImage}
                    alt="Ally Saleh"
                    fill
                    className="object-contain"
                    priority
                    sizes="(max-width: 640px) 70vw, (max-width: 1024px) 55vw, (max-width: 1280px) 38vw, 32vw"
                  />
                </motion.div>
              </AnimatePresence>
            </motion.button>
          </motion.div>
        </div>
      </div>

      <button
        onClick={() => {
          const el = document.getElementById("about");
          if (el) {
            const top = el.getBoundingClientRect().top + window.scrollY - 100;
            window.scrollTo({ top, behavior: "smooth" });
          }
        }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 z-20"
      >
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5 }}
        >
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            className="flex flex-col items-center gap-2 text-gold/40 hover:text-gold/70 transition-colors cursor-pointer"
          >
            <span className="text-[10px] tracking-[0.2em] uppercase">Scroll</span>
            <ArrowDown size={16} />
          </motion.div>
        </motion.div>
      </button>

      <ImageModal
        src={currentImage}
        alt="Ally Saleh"
        isOpen={imageOpen}
        onClose={() => setImageOpen(false)}
      />
    </section>
  );
}
