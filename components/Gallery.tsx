"use client";

import { useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import ScrollReveal from "./ScrollReveal";
import StaggerContainer, { StaggerItem } from "./StaggerContainer";
import ImageModal from "./ImageModal";
import { useLang } from "@/context/LanguageContext";

const galleryImages = [
  { src: "/images/hero/Ally_saleh_.png", alt: "Ally Saleh Portrait" },
  { src: "/images/hero/ally-saleh.jpg", alt: "Ally Saleh" },
  { src: "/images/hero/Ally.Saleh.jpg", alt: "Ally Saleh" },
  { src: "/images/hero/Ally-saleh.jpeg", alt: "Ally Saleh" },
  { src: "/images/hero/Ally-saleh_.jpeg", alt: "Ally Saleh" },
];

export default function Gallery() {
  const [selected, setSelected] = useState<number | null>(null);
  const { tc } = useLang();

  const prev = () => setSelected((s) => s !== null ? (s - 1 + galleryImages.length) % galleryImages.length : null);
  const next = () => setSelected((s) => s !== null ? (s + 1) % galleryImages.length : null);

  return (
    <section id="gallery" className="relative py-32 lg:py-40 bg-deep-charcoal scroll-mt-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-5 lg:px-6">
        <ScrollReveal>
          <div className="text-center mb-16">
            <span className="text-copper text-sm tracking-[0.3em] uppercase font-medium">
              {tc("galleryLabel")}
            </span>
            <h2 className="font-heading text-4xl sm:text-5xl lg:text-6xl text-soft-white mt-6 leading-[1.15]">
              {tc("galleryHeading")}{" "}
              <span className="text-gradient">{tc("galleryHeadingHighlight")}</span>
            </h2>
          </div>
        </ScrollReveal>

        <div className="max-w-5xl mx-auto">
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 mb-4">
            {galleryImages.slice(0, 3).map((img, i) => (
              <StaggerItem key={i}>
                <motion.button
                  className="relative w-full aspect-[3/4] overflow-hidden group cursor-pointer bg-rich-black"
                  onClick={() => setSelected(i)}
                  whileHover={{ scale: 1.02 }}
                  transition={{ duration: 0.3 }}
                >
                  <Image
                    src={img.src}
                    alt={img.alt}
                    fill
                    className="object-contain transition-all duration-500 group-hover:scale-105"
                    sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-deep-charcoal/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-400" />
                  <div className="absolute bottom-0 left-0 right-0 p-4 translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-400">
                    <span className="text-soft-white text-xs font-medium">
                      {img.alt}
                    </span>
                  </div>
                </motion.button>
              </StaggerItem>
            ))}
          </div>

          <div className="flex justify-center gap-4">
            <div className="w-5/12 sm:w-4/12">
              {galleryImages.slice(3, 4).map((img, i) => (
                <StaggerItem key={i + 3}>
                  <motion.button
                    className="relative w-full aspect-[3/4] overflow-hidden group cursor-pointer bg-rich-black"
                    onClick={() => setSelected(i + 3)}
                    whileHover={{ scale: 1.02 }}
                    transition={{ duration: 0.3 }}
                  >
                    <Image
                      src={img.src}
                      alt={img.alt}
                      fill
                      className="object-contain transition-all duration-500 group-hover:scale-105"
                      sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-deep-charcoal/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-400" />
                    <div className="absolute bottom-0 left-0 right-0 p-4 translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-400">
                      <span className="text-soft-white text-xs font-medium">
                        {img.alt}
                      </span>
                    </div>
                  </motion.button>
                </StaggerItem>
              ))}
            </div>
            <div className="w-5/12 sm:w-4/12">
              {galleryImages.slice(4, 5).map((img, i) => (
                <StaggerItem key={i + 4}>
                  <motion.button
                    className="relative w-full aspect-[3/4] overflow-hidden group cursor-pointer bg-rich-black"
                    onClick={() => setSelected(i + 4)}
                    whileHover={{ scale: 1.02 }}
                    transition={{ duration: 0.3 }}
                  >
                    <Image
                      src={img.src}
                      alt={img.alt}
                      fill
                      className="object-contain transition-all duration-500 group-hover:scale-105"
                      sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-deep-charcoal/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-400" />
                    <div className="absolute bottom-0 left-0 right-0 p-4 translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-400">
                      <span className="text-soft-white text-xs font-medium">
                        {img.alt}
                      </span>
                    </div>
                  </motion.button>
                </StaggerItem>
              ))}
            </div>
          </div>
        </div>
      </div>

      <ImageModal
        src={selected !== null ? galleryImages[selected].src : ""}
        alt={selected !== null ? galleryImages[selected].alt : ""}
        isOpen={selected !== null}
        onClose={() => setSelected(null)}
        onPrev={prev}
        onNext={next}
      />
    </section>
  );
}
