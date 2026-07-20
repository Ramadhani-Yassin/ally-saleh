"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { X, ChevronLeft, ChevronRight } from "lucide-react";

interface ImageModalProps {
  src: string;
  alt: string;
  isOpen: boolean;
  onClose: () => void;
  onPrev?: () => void;
  onNext?: () => void;
}

export default function ImageModal({ src, alt, isOpen, onClose, onPrev, onNext }: ImageModalProps) {
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowLeft" && onPrev) onPrev();
      if (e.key === "ArrowRight" && onNext) onNext();
    };
    if (isOpen) {
      document.addEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "hidden";
    }
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "";
    };
  }, [isOpen, onClose, onPrev, onNext]);

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          className="fixed inset-0 z-[70] flex items-center justify-center bg-black/40 backdrop-blur-sm"
          onClick={onClose}
        >
          <button
            className="absolute top-6 right-6 text-soft-white/70 hover:text-soft-white z-10 p-2 rounded-full bg-black/20 hover:bg-black/40 transition-all"
            onClick={onClose}
            aria-label="Close"
          >
            <X size={24} />
          </button>

          {onPrev && (
            <button
              className="absolute left-4 top-1/2 -translate-y-1/2 text-soft-white/60 hover:text-soft-white z-10 p-3 bg-black/30 hover:bg-black/50 rounded-full transition-all"
              onClick={(e) => { e.stopPropagation(); onPrev(); }}
              aria-label="Previous image"
            >
              <ChevronLeft size={28} />
            </button>
          )}
          {onNext && (
            <button
              className="absolute right-4 top-1/2 -translate-y-1/2 text-soft-white/60 hover:text-soft-white z-10 p-3 bg-black/30 hover:bg-black/50 rounded-full transition-all"
              onClick={(e) => { e.stopPropagation(); onNext(); }}
              aria-label="Next image"
            >
              <ChevronRight size={28} />
            </button>
          )}

          <motion.div
            key={src}
            initial={{ scale: 0.92, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.92, opacity: 0 }}
            transition={{ duration: 0.25, ease: [0.25, 0.46, 0.45, 0.94] }}
            className="relative w-full h-full flex items-center justify-center p-4 sm:p-8"
            onClick={(e) => e.stopPropagation()}
          >
            {!loaded && (
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="flex flex-col items-center gap-4">
                  <div className="w-8 h-8 border-2 border-gold/30 border-t-gold rounded-full animate-spin" />
                  <span className="text-soft-white/50 text-sm tracking-wider uppercase">
                    Loading
                  </span>
                </div>
              </div>
            )}

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: loaded ? 1 : 0 }}
              transition={{ duration: 0.3 }}
              className="relative w-full h-full max-w-5xl max-h-[85vh]"
            >
              <Image
                src={src}
                alt={alt}
                fill
                className="object-contain"
                sizes="(max-width: 1280px) 100vw, 1200px"
                onLoad={() => setLoaded(true)}
                priority
              />
            </motion.div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
