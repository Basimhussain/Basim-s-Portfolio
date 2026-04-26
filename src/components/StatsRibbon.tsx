import React from "react";
import { motion } from "framer-motion";
import StatCounter from "./StatCounter";

interface Stat {
  value: number;
  prefix?: string;
  suffix?: string;
  decimals?: number;
  label: string;
  caption: string;
}

const stats: Stat[] = [
  {
    value: 100,
    suffix: "K+",
    label: "daily call throughput",
    caption: "Voice AI architecture · Agent Maven",
  },
  {
    value: 0.91,
    decimals: 2,
    label: "RAGAS faithfulness",
    caption: "Hallucination guardrail across KB updates",
  },
  {
    value: 35,
    suffix: "%",
    label: "hallucination reduction",
    caption: "ScentWell · Langfuse + RAGAS pipeline",
  },
  {
    value: 0.87,
    decimals: 2,
    prefix: "F1 ",
    label: "Arabic sentiment",
    caption: "QLoRA fine-tune of Llama-3 8B · 12K tweets",
  },
  {
    value: 16,
    suffix: "s",
    label: "Saudi research agent",
    caption: "vs 20 to 30 mins by hand · 5-tool agent",
  },
  {
    value: 200,
    suffix: "ms",
    label: "API response p50",
    caption: "RTRPlat · 100 concurrent connections",
  },
];

const StatsRibbon: React.FC = () => {
  return (
    <section className="relative py-24 md:py-32 overflow-hidden">
      <div className="absolute inset-0 surface-navy opacity-40" />
      <div className="absolute inset-0 bg-grid-faint bg-grid-32 opacity-20" />

      <div className="relative max-w-7xl mx-auto px-6">
        <div className="flex items-center gap-3 mb-10 md:mb-16">
          <span className="section-number">02</span>
          <span className="hairline w-12" />
          <span className="text-[10px] font-mono tracking-widest text-bone/50 uppercase">
            By the numbers
          </span>
        </div>

        <h2 className="font-display text-3xl md:text-5xl leading-[1.1] tracking-tight text-bone mb-16 max-w-3xl">
          Production code,{" "}
          <span className="italic-serif text-gradient-gold">measured</span> in
          tokens, latency, and trust.
        </h2>
        <p className="sr-only">Numbers from systems shipped to production.</p>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-px bg-bone/10 border border-bone/10 rounded-2xl overflow-hidden">
          {stats.map((s, i) => (
            <motion.div
              key={s.label}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-10%" }}
              transition={{
                duration: 0.7,
                delay: i * 0.06,
                ease: [0.22, 1, 0.36, 1],
              }}
              className="p-6 md:p-8 bg-ink-800 hover:bg-ink-700 transition-colors duration-500 group"
            >
              <div className="font-display text-4xl md:text-6xl text-bone group-hover:text-gradient-gold transition-all">
                <StatCounter
                  value={s.value}
                  prefix={s.prefix}
                  suffix={s.suffix}
                  decimals={s.decimals}
                />
              </div>
              <div className="mt-3 text-[11px] font-mono tracking-widest text-gold/70 uppercase">
                {s.label}
              </div>
              <div className="mt-2 text-sm text-bone/55 leading-relaxed">
                {s.caption}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default StatsRibbon;
