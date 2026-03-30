"use client";

type NavLangToggleProps = {
  lang: "en" | "sw";
  onToggle: () => void;
  ariaLabel: string;
};

/** Tanzania 🇹🇿 + SW when UI is English (switch to Swahili); UK 🇬🇧 + EN when UI is Swahili. */
export function NavLangToggle({
  lang,
  onToggle,
  ariaLabel,
}: NavLangToggleProps) {
  const showSwOption = lang === "en";
  return (
    <button
      type="button"
      className="lang-toggle-btn"
      onClick={onToggle}
      aria-label={ariaLabel}
    >
      <span className="lang-toggle-btn__flag" aria-hidden>
        {showSwOption ? "🇹🇿" : "🇬🇧"}
      </span>
      <span className="lang-toggle-btn__code">{showSwOption ? "SW" : "EN"}</span>
    </button>
  );
}
