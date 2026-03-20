"use client";

type ScrollDownHintProps = {
  onActivate: () => void;
};

/**
 * Animated scroll cue: mouse outline + wheel motion + label (tap still jumps to archive).
 */
export function ScrollDownHint({ onActivate }: ScrollDownHintProps) {
  return (
    <button
      type="button"
      className="scroll-hint"
      onClick={onActivate}
      aria-label="Scroll to archive"
    >
      <span className="scroll-hint-mouse" aria-hidden>
        <span className="scroll-hint-wheel" />
      </span>
      <span className="scroll-hint-label">Scroll</span>
    </button>
  );
}
