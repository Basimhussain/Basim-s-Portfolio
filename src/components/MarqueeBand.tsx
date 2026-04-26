import React from "react";

interface MarqueeBandProps {
  items: string[];
  reverse?: boolean;
}

const MarqueeBand: React.FC<MarqueeBandProps> = ({ items, reverse = false }) => {
  const doubled = [...items, ...items];
  return (
    <div className="relative w-full overflow-hidden py-6 border-y border-bone/10 bg-ink-900/40">
      <div
        className="marquee-track"
        style={{ animationDirection: reverse ? "reverse" : "normal" }}
      >
        {doubled.map((item, i) => (
          <span
            key={i}
            className="font-display text-3xl md:text-5xl text-bone/70 whitespace-nowrap"
          >
            {item}
            <span className="mx-8 text-gold/60">✦</span>
          </span>
        ))}
      </div>
    </div>
  );
};

export default MarqueeBand;
