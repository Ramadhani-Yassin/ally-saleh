"use client";

import { motion } from "framer-motion";

interface FloatingBlobProps {
  className?: string;
  color?: string;
  size?: number;
  delay?: number;
}

export default function FloatingBlob({
  className = "",
  color = "rgba(184, 115, 51, 0.03)",
  size = 600,
  delay = 0,
}: FloatingBlobProps) {
  return (
    <motion.div
      className={`absolute rounded-full pointer-events-none ${className}`}
      style={{
        width: size,
        height: size,
        background: `radial-gradient(circle at center, ${color}, transparent 70%)`,
      }}
      animate={{
        x: [0, 100, -50, 80, 0],
        y: [0, -80, 60, -40, 0],
        scale: [1, 1.1, 0.95, 1.05, 1],
      }}
      transition={{
        duration: 20,
        delay,
        repeat: Infinity,
        ease: "easeInOut",
      }}
    />
  );
}
