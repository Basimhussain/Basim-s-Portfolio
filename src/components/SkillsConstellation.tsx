import React, { useState } from "react";
import { motion } from "framer-motion";

interface SkillGroup {
  category: string;
  meta: string;
  items: string[];
}

const groups: SkillGroup[] = [
  {
    category: "AI / ML",
    meta: "MODELS · RETRIEVAL · OPS",
    items: [
      "LLM Fine-Tuning",
      "QLoRA",
      "LoRA",
      "PEFT",
      "RAG Pipelines",
      "LlamaIndex",
      "LangChain",
      "pgvector",
      "Langfuse",
      "RAGAS",
      "AI Agents",
      "Function Calling",
      "Arabic NLP",
      "OpenAI API",
      "HuggingFace",
      "PyTorch",
      "TensorFlow",
      "FastAPI",
    ],
  },
  {
    category: "Backend",
    meta: "APIs · REALTIME · PIPELINES",
    items: [
      "Node.js",
      "Express",
      "Fastify",
      "Laravel (PHP)",
      "Java / Spring Boot",
      "REST APIs",
      "WebSockets",
      "Server-Sent Events",
    ],
  },
  {
    category: "Frontend",
    meta: "REACT · BILINGUAL · MOTION",
    items: [
      "React 19",
      "React Native (Expo)",
      "Vue.js",
      "Nuxt.js",
      "TypeScript",
      "Tailwind CSS",
      "Vuetify",
      "i18n / RTL",
      "Framer Motion",
    ],
  },
  {
    category: "Data",
    meta: "RELATIONAL · VECTOR · CACHE",
    items: [
      "PostgreSQL",
      "MongoDB",
      "MySQL",
      "Redis",
      "Supabase",
      "pgvector",
      "Firebase",
    ],
  },
  {
    category: "Infrastructure",
    meta: "DEPLOY · OBSERVE · SHIP",
    items: [
      "Docker",
      "CI/CD",
      "GitHub Actions",
      "AWS (S3, Lambda)",
      "CloudWatch",
      "Sentry",
      "Winston",
      "Git",
    ],
  },
  {
    category: "Languages",
    meta: "BILINGUAL DELIVERY",
    items: [
      "English",
      "Arabic (written)",
      "Hindi",
      "Urdu",
    ],
  },
];

const SkillsConstellation: React.FC = () => {
  const [active, setActive] = useState(0);

  return (
    <section
      id="stack"
      className="relative py-24 md:py-32 overflow-hidden"
    >
      <div className="absolute inset-0 starfield opacity-50 pointer-events-none" />
      <div className="absolute top-0 left-0 right-0 h-96 bg-gradient-to-b from-ink to-transparent pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-6">
        <div className="flex items-center gap-3 mb-8">
          <span className="section-number">05</span>
          <span className="hairline w-12" />
          <span className="text-[10px] font-mono tracking-widest text-bone/50 uppercase">
            The stack
          </span>
        </div>

        <h2 className="font-display text-4xl md:text-6xl leading-[1.05] tracking-tight text-bone mb-3 max-w-3xl">
          Tools, sharpened on{" "}
          <span className="italic-serif text-gradient-gold">production.</span>
        </h2>
        <p className="text-bone/60 text-base md:text-lg max-w-2xl mb-12">
          Two years of shipping forces a strong opinion on what belongs in the
          stack and what doesn&apos;t. Here&apos;s what I reach for.
        </p>

        <div className="grid md:grid-cols-12 gap-6">
          {/* Tab list */}
          <div className="md:col-span-4 space-y-2">
            {groups.map((g, i) => (
              <button
                key={g.category}
                onMouseEnter={() => setActive(i)}
                onClick={() => setActive(i)}
                className={`w-full text-left px-5 py-4 rounded-xl border transition-all duration-300 ${
                  active === i
                    ? "border-gold/50 bg-gold/5"
                    : "border-bone/10 hover:border-bone/30"
                }`}
              >
                <div className="flex items-center justify-between">
                  <span
                    className={`font-display text-xl ${
                      active === i ? "text-gold-soft" : "text-bone"
                    }`}
                  >
                    {g.category}
                  </span>
                  <motion.span
                    animate={{ rotate: active === i ? 90 : 0 }}
                    className={`text-xs ${
                      active === i ? "text-gold" : "text-bone/40"
                    }`}
                  >
                    →
                  </motion.span>
                </div>
                <div className="text-[10px] font-mono tracking-widest text-bone/40 mt-1">
                  {g.meta}
                </div>
              </button>
            ))}
          </div>

          {/* Active panel */}
          <div className="md:col-span-8">
            <motion.div
              key={active}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
              className="glass-strong rounded-2xl p-8 md:p-10 min-h-[420px] relative overflow-hidden"
            >
              <div className="absolute -top-20 -right-20 w-64 h-64 rounded-full bg-radial-gold opacity-30 blur-2xl pointer-events-none" />

              <div className="text-[10px] font-mono tracking-widest text-gold/70 mb-3">
                {groups[active].meta}
              </div>
              <h3 className="font-display text-3xl md:text-4xl text-bone mb-8">
                {groups[active].category}
              </h3>

              <div className="flex flex-wrap gap-2.5 relative z-10">
                {groups[active].items.map((item, i) => (
                  <motion.span
                    key={item}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{
                      duration: 0.5,
                      delay: i * 0.025,
                      ease: [0.22, 1, 0.36, 1],
                    }}
                    className="px-4 py-2 rounded-full text-sm border border-bone/15 bg-bone/[0.03] text-bone/85 hover:border-gold/40 hover:text-gold-soft hover:bg-gold/5 transition-all duration-300 cursor-default"
                  >
                    {item}
                  </motion.span>
                ))}
              </div>

              <div className="absolute bottom-6 right-8 font-display text-7xl md:text-9xl text-bone/[0.04] select-none pointer-events-none leading-none">
                {String(active + 1).padStart(2, "0")}
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SkillsConstellation;
