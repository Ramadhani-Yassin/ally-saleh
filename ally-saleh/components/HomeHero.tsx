"use client";

import Image from "next/image";
import { HeroTypingTitle, HERO_TYPING_FULL } from "@/components/HeroTypingTitle";
import { ScrollDownHint } from "@/components/ScrollDownHint";

type HomeHeroProps = {
  onScrollToArchive: () => void;
};

/** Intro: text | portrait, with centered scroll cue inside the hero card */
export function HomeHero({ onScrollToArchive }: HomeHeroProps) {
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
              Explore published manuscripts, essays, and interview resources —
              curated work spanning law, journalism, and civic life in Zanzibar.
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
            <div className="home-hero-media-frame">
              <Image
                src="/images/ally-saleh.jpg"
                alt="Ally Saleh — author and public figure"
                width={560}
                height={700}
                className="home-hero-image"
                priority
                sizes="(max-width: 900px) min(100vw, 520px), (max-width: 1400px) 38vw, 480px"
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
