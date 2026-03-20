"use client";

type ExploreAllButtonProps = {
  onClick: () => void;
};

export function ExploreAllButton({ onClick }: ExploreAllButtonProps) {
  return (
    <div className="hero-explore-wrap">
      <button
        type="button"
        className="hero-explore-btn"
        onClick={onClick}
      >
        <span className="hero-explore-btn__icon-wrap" aria-hidden>
          <svg
            viewBox="0 0 14 15"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="hero-explore-btn__icon"
            width={10}
            height={11}
          >
            <path
              d="M13.376 11.552l-.264-10.44-10.44-.24.024 2.28 6.96-.048L.2 12.56l1.488 1.488 9.432-9.432-.048 6.912 2.304.024z"
              fill="currentColor"
            />
          </svg>
          <svg
            viewBox="0 0 14 15"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="hero-explore-btn__icon hero-explore-btn__icon--copy"
            width={10}
            height={11}
          >
            <path
              d="M13.376 11.552l-.264-10.44-10.44-.24.024 2.28 6.96-.048L.2 12.56l1.488 1.488 9.432-9.432-.048 6.912 2.304.024z"
              fill="currentColor"
            />
          </svg>
        </span>
        Explore All
      </button>
    </div>
  );
}
