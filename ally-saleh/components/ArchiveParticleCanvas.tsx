"use client";

import { useEffect, useRef, useState } from "react";

const PARTICLE_COUNT = 26;
const LINK_DISTANCE = 62;
const MOUSE_RADIUS = 72;

type P = {
  x: number;
  y: number;
  size: number;
  speedX: number;
  speedY: number;
  color: string;
};

export function ArchiveParticleCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const rafRef = useRef<number>(0);
  const particlesRef = useRef<P[]>([]);
  const mouseRef = useRef({ x: 0, y: 0 });
  const [run, setRun] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const apply = () => setRun(!mq.matches);
    apply();
    mq.addEventListener("change", apply);
    return () => mq.removeEventListener("change", apply);
  }, []);

  useEffect(() => {
    if (!run) return;

    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    const initParticles = () => {
      const next: P[] = [];
      for (let i = 0; i < PARTICLE_COUNT; i++) {
        next.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          size: Math.random() * 0.85 + 0.35,
          speedX: (Math.random() - 0.5) * 0.32,
          speedY: (Math.random() - 0.5) * 0.32,
          color: `hsl(${Math.random() * 50 + 265}, 62%, 58%)`,
        });
      }
      particlesRef.current = next;
    };

    const onMouseMove = (e: MouseEvent) => {
      mouseRef.current = { x: e.clientX, y: e.clientY };
    };

    const update = (p: P) => {
      const { x: mx, y: my } = mouseRef.current;
      const dx = mx - p.x;
      const dy = my - p.y;
      const dist = Math.sqrt(dx * dx + dy * dy);
      if (dist < MOUSE_RADIUS && dist > 0.001) {
        const angle = Math.atan2(dy, dx);
        const force = (MOUSE_RADIUS - dist) / MOUSE_RADIUS;
        p.x -= Math.cos(angle) * force * 1.5;
        p.y -= Math.sin(angle) * force * 1.5;
      }
      p.x += p.speedX;
      p.y += p.speedY;
      if (p.x < 0) p.x = canvas.width;
      if (p.x > canvas.width) p.x = 0;
      if (p.y < 0) p.y = canvas.height;
      if (p.y > canvas.height) p.y = 0;
    };

    const frame = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      const particles = particlesRef.current;

      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const distance = Math.sqrt(dx * dx + dy * dy);
          if (distance < LINK_DISTANCE) {
            ctx.beginPath();
            ctx.strokeStyle = `rgba(108, 92, 231, ${0.09 * (1 - distance / LINK_DISTANCE)})`;
            ctx.lineWidth = 0.45;
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.stroke();
          }
        }
      }

      for (const p of particles) {
        update(p);
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = p.color;
        ctx.fill();
      }

      rafRef.current = requestAnimationFrame(frame);
    };

    const onResize = () => {
      resize();
      initParticles();
    };

    resize();
    initParticles();
    window.addEventListener("resize", onResize);
    window.addEventListener("mousemove", onMouseMove);
    rafRef.current = requestAnimationFrame(frame);

    return () => {
      window.removeEventListener("resize", onResize);
      window.removeEventListener("mousemove", onMouseMove);
      cancelAnimationFrame(rafRef.current);
    };
  }, [run]);

  if (!run) {
    return null;
  }

  return (
    <canvas ref={canvasRef} className="archive-particle-canvas" aria-hidden />
  );
}
