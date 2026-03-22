"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { HeroTypingTitle, HERO_TYPING_FULL } from "@/components/HeroTypingTitle";
import { ScrollDownHint } from "@/components/ScrollDownHint";

type HomeHeroProps = {
  onScrollToArchive: () => void;
};

/** How long each portrait stays fully visible before crossfading to the other */
const HERO_IMAGE_INTERVAL_MS = 6500;

const HERO_PORTRAIT_NEW = "/images/Ally-Saleh.jpg";
const HERO_PORTRAIT_CLASSIC = "/images/ally-saleh.jpg";

/** Intro: text | portrait, with centered scroll cue inside the hero card */
export function HomeHero({ onScrollToArchive }: HomeHeroProps) {
  const [visibleLayer, setVisibleLayer] = useState(0);

  useEffect(() => {
    const id = window.setInterval(() => {
      setVisibleLayer((v) => (v === 0 ? 1 : 0));
    }, HERO_IMAGE_INTERVAL_MS);
    return () => window.clearInterval(id);
  }, []);

  return (
    <section
      id="hero"
      className="home-hero"
      aria-labelledby="hero-heading"
    >
      <div className="home-hero-board">
        <div className="home-hero-inner">
          <div className="home-hero-text">
            <p className="home-hero-eyebrow home-hero-animate home-hero-animate--0">
              Digital archive · Author & public voice
            </p>
            <h2
              id="hero-heading"
              className="home-hero-title home-hero-title--typing"
              aria-label={HERO_TYPING_FULL}
            >
              <HeroTypingTitle />
            </h2>
            <p className="home-hero-lead home-hero-animate home-hero-animate--2">
              Explore poetry, short stories, and online resources — videos,
              reviews, and articles open in a new tab.
            </p>
            <div className="home-hero-bio home-hero-animate home-hero-animate--3">
              <p>
                Ally Saleh is a prominent Zanzibari politician, lawyer, journalist,
                and poet, known for a long career in both the media and political
                landscapes of Zanzibar.
              </p>
              <p>
                He served as Member of Parliament for the Malindi constituency.
                Originally a high-profile member of the Civic United Front (CUF),
                he later joined ACT Wazalendo. He is a vocal advocate for Zanzibari
                autonomy and has spoken widely on Zanzibar identity and the nature
                of the Tanzanian Union.
              </p>
            </div>
          </div>

          <div className="home-hero-media home-hero-animate home-hero-animate--2">
            <div className="home-hero-media-frame home-hero-media-frame--crossfade">
              <Image
                src={HERO_PORTRAIT_NEW}
                alt={
                  visibleLayer === 0
                    ? "Ally Saleh — author and public figure"
                    : ""
                }
                fill
                className="home-hero-crossfade-layer home-hero-image home-hero-crossfade-layer--new"
                style={{ opacity: visibleLayer === 0 ? 1 : 0 }}
                sizes="(max-width: 900px) min(100vw, 520px), (max-width: 1400px) 38vw, 480px"
                priority
                aria-hidden={visibleLayer !== 0}
              />
              <Image
                src={HERO_PORTRAIT_CLASSIC}
                alt={
                  visibleLayer === 1
                    ? "Ally Saleh — author and public figure"
                    : ""
                }
                fill
                className="home-hero-crossfade-layer home-hero-image home-hero-crossfade-layer--classic"
                style={{ opacity: visibleLayer === 1 ? 1 : 0 }}
                sizes="(max-width: 900px) min(100vw, 520px), (max-width: 1400px) 38vw, 480px"
                aria-hidden={visibleLayer !== 1}
              />
            </div>
          </div>
        </div>

        <div className="home-hero-scroll">
          <div className="home-hero-scroll-inner home-hero-animate home-hero-animate--4">
            <ScrollDownHint onActivate={onScrollToArchive} />
          </div>
        </div>
      </div>
    </section>
  );
}
