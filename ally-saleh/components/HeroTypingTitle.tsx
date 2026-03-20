"use client";

import { useEffect, useState } from "react";

const ACCENT = "Ally Saleh";
export const HERO_TYPING_FULL = `${ACCENT} Publications Archive`;

const TYPE_MS = 52;
const PAUSE_MS = 2400;
const REPEAT_GAP_MS = 380;
const START_DELAY_MS = 450;

function renderVisible(visible: number) {
  if (visible <= ACCENT.length) {
    return (
      <span className="home-hero-name">{HERO_TYPING_FULL.slice(0, visible)}</span>
    );
  }
  return (
    <>
      <span className="home-hero-name">{ACCENT}</span>
      {HERO_TYPING_FULL.slice(ACCENT.length, visible)}
    </>
  );
}

export function HeroTypingTitle() {
  const [visible, setVisible] = useState(0);

  useEffect(() => {
    let cancelled = false;
    let n = 0;
    let tid: ReturnType<typeof setTimeout>;

    function schedule(ms: number, fn: () => void) {
      clearTimeout(tid);
      tid = setTimeout(() => {
        if (!cancelled) fn();
      }, ms);
    }

    function tick() {
      if (cancelled) return;
      if (n < HERO_TYPING_FULL.length) {
        n += 1;
        setVisible(n);
        schedule(TYPE_MS, tick);
      } else {
        schedule(PAUSE_MS, () => {
          if (cancelled) return;
          n = 0;
          setVisible(0);
          schedule(REPEAT_GAP_MS, tick);
        });
      }
    }

    schedule(START_DELAY_MS, tick);

    return () => {
      cancelled = true;
      clearTimeout(tid);
    };
  }, []);

  const typing = visible < HERO_TYPING_FULL.length;

  return (
    <span className="home-hero-typing-line">
      {renderVisible(visible)}
      {typing ? (
        <span className="home-hero-type-cursor" aria-hidden>
          |
        </span>
      ) : null}
    </span>
  );
}
