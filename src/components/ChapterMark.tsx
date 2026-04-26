import React, { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

interface ChapterMarkProps {
  number: string;
  arabic: string;
  word: string;
  reverse?: boolean;
}

const ChapterMark: React.FC<ChapterMarkProps> = ({
  number,
  arabic,
  word,
  reverse = false,
}) => {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const x = useTransform(
    scrollYProgress,
    [0, 1],
    reverse ? ["20%", "-30%"] : ["-30%", "20%"]
  );
  const arabicX = useTransform(
    scrollYProgress,
    [0, 1],
    reverse ? ["-20%", "30%"] : ["30%", "-20%"]
  );
  const opacity = useTransform(
    scrollYProgress,
    [0, 0.3, 0.7, 1],
    [0, 1, 1, 0]
  );
  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [0.9, 1.05, 0.9]);

  return (
    <div
      ref={ref}
      aria-hidden="true"
      className="relative h-[24vh] md:h-[30vh] overflow-hidden flex items-center pointer-events-none select-none"
    >
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <motion.div
          style={{ x, opacity, scale }}
          className="font-display whitespace-nowrap text-bone/[0.05] leading-none text-[26vw] tracking-tighter"
        >
          {word}
        </motion.div>
        <motion.div
          style={{ x: arabicX, opacity }}
          className="absolute inset-0 flex items-center justify-center text-gold/[0.07] leading-none text-[24vw]"
          dir="rtl"
        >
          {arabic}
        </motion.div>
        <div className="absolute bottom-4 left-0 right-0 flex items-center justify-center gap-3">
          <span className="hairline w-16" />
          <span className="text-[10px] font-mono tracking-[0.4em] text-gold/70">
            CHAPTER {number}
          </span>
          <span className="hairline w-16" />
        </div>
      </div>
    </div>
  );
};

export default ChapterMark;
