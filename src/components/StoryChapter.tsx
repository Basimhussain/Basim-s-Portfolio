import React, { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

interface StoryChapterProps {
  number: string;
  eyebrow: string;
  title: React.ReactNode;
  body: React.ReactNode;
  side?: React.ReactNode;
  align?: "left" | "right";
}

const StoryChapter: React.FC<StoryChapterProps> = ({
  number,
  eyebrow,
  title,
  body,
  side,
  align = "left",
}) => {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], [60, -60]);
  const opacity = useTransform(
    scrollYProgress,
    [0, 0.3, 0.7, 1],
    [0, 1, 1, 0.3]
  );

  return (
    <div
      ref={ref}
      className="relative grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-12 py-20 md:py-32"
    >
      <motion.div
        style={{ y, opacity }}
        className={`md:col-span-7 ${
          align === "right" ? "md:col-start-6" : ""
        }`}
      >
        <div className="flex items-center gap-3 mb-6">
          <span className="section-number">{number}</span>
          <span className="hairline w-12" />
          <span className="text-[10px] font-mono tracking-widest text-bone/50 uppercase">
            {eyebrow}
          </span>
        </div>
        <h2 className="font-display text-4xl md:text-6xl leading-[1.05] text-bone tracking-tight mb-8">
          {title}
        </h2>
        <div className="text-base md:text-lg text-bone/70 leading-relaxed space-y-4 max-w-xl">
          {body}
        </div>
      </motion.div>
      {side && (
        <motion.div
          style={{
            y: useTransform(scrollYProgress, [0, 1], [80, -80]),
          }}
          className={`md:col-span-5 ${
            align === "right" ? "md:col-start-1 md:row-start-1" : ""
          }`}
        >
          {side}
        </motion.div>
      )}
    </div>
  );
};

export default StoryChapter;
