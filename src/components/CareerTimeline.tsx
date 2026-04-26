import React, { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

export interface CareerEntry {
  company: string;
  role: string;
  period: string;
  location: string;
  tag: string;
  color: string;
  pitch: string;
  bullets: string[];
  stack: string[];
}

interface CareerTimelineProps {
  entries: CareerEntry[];
}

const CareerTimeline: React.FC<CareerTimelineProps> = ({ entries }) => {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const lineHeight = useTransform(scrollYProgress, [0, 0.95], ["0%", "100%"]);

  return (
    <div ref={ref} className="relative max-w-5xl mx-auto pl-6 md:pl-0">
      {/* Timeline rail */}
      <div className="absolute left-3 md:left-1/2 top-0 bottom-0 w-px bg-bone/10 -translate-x-px" />
      <motion.div
        style={{ height: lineHeight }}
        className="absolute left-3 md:left-1/2 top-0 w-px bg-gradient-to-b from-gold via-gold-soft to-transparent -translate-x-px origin-top"
      />

      <div className="space-y-12 md:space-y-24">
        {entries.map((entry, i) => (
          <CareerNode key={entry.company} entry={entry} index={i} />
        ))}
      </div>
    </div>
  );
};

const CareerNode: React.FC<{ entry: CareerEntry; index: number }> = ({
  entry,
  index,
}) => {
  const ref = useRef<HTMLDivElement>(null);
  const isLeft = index % 2 === 0;

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 60 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-15% 0px" }}
      transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
      className={`relative md:grid md:grid-cols-2 md:gap-16 items-start ${
        isLeft ? "" : "md:[direction:rtl]"
      }`}
    >
      {/* Node dot */}
      <div className="absolute left-3 md:left-1/2 top-2 -translate-x-1/2 z-10">
        <motion.div
          initial={{ scale: 0 }}
          whileInView={{ scale: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          className="relative"
        >
          <div className="w-3 h-3 rounded-full bg-gold shadow-[0_0_20px_rgba(212,164,74,0.7)]" />
          <div className="absolute inset-0 rounded-full bg-gold/40 animate-ping" />
        </motion.div>
      </div>

      {/* Spacer to push card to one side */}
      <div className={`hidden md:block ${isLeft ? "" : "md:col-start-2"}`} />

      <div
        className={`pl-10 md:pl-0 ${isLeft ? "md:col-start-1" : "md:col-start-1"} [direction:ltr]`}
      >
        <div className="glass card-lift rounded-2xl p-6 md:p-8 relative overflow-hidden">
          {/* Color accent corner */}
          <div
            className="absolute top-0 right-0 w-24 h-24 rounded-full blur-3xl opacity-30 pointer-events-none"
            style={{ background: entry.color }}
          />

          <div className="flex flex-wrap items-center gap-2 mb-4">
            <span
              className="text-[10px] font-mono tracking-widest px-2 py-1 rounded-full border"
              style={{
                color: entry.color,
                borderColor: `${entry.color}66`,
                backgroundColor: `${entry.color}10`,
              }}
            >
              {entry.tag}
            </span>
            <span className="text-[10px] font-mono tracking-widest text-bone/50">
              {entry.period}
            </span>
            <span className="text-[10px] font-mono tracking-widest text-bone/40">
              · {entry.location}
            </span>
          </div>

          <h3 className="font-display text-2xl md:text-3xl text-bone mb-1 tracking-tight">
            {entry.role}
          </h3>
          <p className="text-gold-soft text-sm tracking-wide mb-4 italic-serif">
            {entry.company}
          </p>

          <p className="text-bone/80 text-base leading-relaxed mb-5 italic-serif">
            &ldquo;{entry.pitch}&rdquo;
          </p>

          <ul className="space-y-2.5 mb-5">
            {entry.bullets.map((b, i) => (
              <li
                key={i}
                className="flex items-start gap-3 text-bone/70 text-sm leading-relaxed"
              >
                <span className="text-gold/60 mt-1.5 shrink-0 text-[10px]">
                  ◆
                </span>
                <span>{b}</span>
              </li>
            ))}
          </ul>

          <div className="pt-4 border-t border-bone/10 flex flex-wrap gap-1.5">
            {entry.stack.map((s) => (
              <span
                key={s}
                className="text-[10px] font-mono tracking-wide px-2 py-1 rounded-full bg-bone/[0.04] text-bone/60 border border-bone/10"
              >
                {s}
              </span>
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default CareerTimeline;
