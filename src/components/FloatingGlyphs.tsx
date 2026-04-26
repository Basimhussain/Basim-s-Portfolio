import React, { useRef } from "react";
import { motion, useScroll, useTransform, MotionValue } from "framer-motion";

interface Glyph {
  ch: string;
  left: string;
  size: string;
  rate: number;
  rotate: number;
  delay: number;
  color: string;
}

const glyphs: Glyph[] = [
  { ch: "✦", left: "8%", size: "clamp(2rem,4vw,4rem)", rate: -0.6, rotate: 90, delay: 0, color: "rgba(232,194,112,0.18)" },
  { ch: "◆", left: "92%", size: "clamp(1rem,1.5vw,2rem)", rate: 0.3, rotate: -45, delay: 0.1, color: "rgba(244,235,216,0.12)" },
  { ch: "✶", left: "82%", size: "clamp(2.5rem,5vw,5rem)", rate: -0.8, rotate: 180, delay: 0.2, color: "rgba(212,164,74,0.15)" },
  { ch: "ع", left: "5%", size: "clamp(4rem,9vw,9rem)", rate: 0.4, rotate: 0, delay: 0.05, color: "rgba(244,235,216,0.04)" },
  { ch: "✦", left: "45%", size: "clamp(0.8rem,1vw,1.2rem)", rate: -0.5, rotate: 0, delay: 0.3, color: "rgba(232,194,112,0.3)" },
  { ch: "◇", left: "70%", size: "clamp(1.5rem,2.5vw,3rem)", rate: 0.6, rotate: 45, delay: 0.15, color: "rgba(244,235,216,0.1)" },
  { ch: "ب", left: "88%", size: "clamp(5rem,10vw,11rem)", rate: -0.3, rotate: 0, delay: 0.25, color: "rgba(232,194,112,0.05)" },
  { ch: "·", left: "30%", size: "clamp(3rem,5vw,5rem)", rate: 0.5, rotate: 0, delay: 0.4, color: "rgba(232,194,112,0.4)" },
  { ch: "✦", left: "60%", size: "clamp(1rem,1.5vw,1.5rem)", rate: -0.4, rotate: 0, delay: 0.5, color: "rgba(244,235,216,0.18)" },
  { ch: "◇", left: "15%", size: "clamp(0.8rem,1vw,1rem)", rate: 0.7, rotate: 0, delay: 0.6, color: "rgba(232,194,112,0.25)" },
];

interface FloatingGlyphsProps {
  scrollProgress: MotionValue<number>;
}

const FloatingGlyphs: React.FC<FloatingGlyphsProps> = ({ scrollProgress }) => {
  return (
    <div
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 z-[3] overflow-hidden"
    >
      {glyphs.map((g, i) => (
        <Glyph key={i} g={g} scrollProgress={scrollProgress} />
      ))}
    </div>
  );
};

const Glyph: React.FC<{ g: Glyph; scrollProgress: MotionValue<number> }> = ({
  g,
  scrollProgress,
}) => {
  // Each glyph travels at its own rate as user scrolls
  const y = useTransform(scrollProgress, [0, 1], [`${g.delay * 100}vh`, `${g.delay * 100 + g.rate * 250}vh`]);
  const rotate = useTransform(scrollProgress, [0, 1], [0, g.rotate]);
  const opacity = useTransform(scrollProgress, [0, 0.05, 0.95, 1], [0, 1, 1, 0]);

  return (
    <motion.span
      style={{
        left: g.left,
        fontSize: g.size,
        color: g.color,
        y,
        rotate,
        opacity,
      }}
      className="absolute font-display select-none top-[10vh] will-change-transform"
    >
      {g.ch}
    </motion.span>
  );
};

export default FloatingGlyphs;
