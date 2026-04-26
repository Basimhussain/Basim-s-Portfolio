import React, { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import {
  Navigation,
  HeroScene,
  StatsRibbon,
  CareerTimeline,
  SkillsConstellation,
  ProjectShowcase,
  MarqueeBand,
  Section,
  AnimatedHeading,
  MagneticButton,
  GlassCard,
  ScrollRail,
  ChapterMark,
} from "../components";
import type { CareerEntry } from "../components/CareerTimeline";
import type { ShowcaseProject } from "../components/ProjectShowcase";

const careerEntries: CareerEntry[] = [
  {
    company: "Agent Maven",
    role: "Founding AI Engineer · Full-Stack",
    period: "Mar 2026 — Present",
    location: "Riyadh, KSA",
    tag: "FOUNDING · VOICE AI",
    color: "#e8c270",
    pitch:
      "Architecting a Voice AI SaaS built for 100K+ daily calls. Vapi orchestration, real-time React 19 dashboards, and a RAGAS guardrail that catches hallucinations before they reach production.",
    bullets: [
      "Architected Voice AI orchestration on Vapi with a Node.js / PostgreSQL backend sized for 100K+ daily call throughput.",
      "Wired a real-time React 19 dashboard through Socket.io. Live call streaming, sentiment, and dynamic performance metrics.",
      "Containerised every microservice in Docker. Multi-stage GitHub Actions CI/CD with automated test gates. Zero failed deploys at launch.",
      "Designed a RAGAS evaluation loop (faithfulness 0.91, relevancy 0.88) that regressions every Knowledge Base update before it ships.",
    ],
    stack: [
      "Node.js",
      "Express",
      "PostgreSQL",
      "Supabase",
      "React 19",
      "Tailwind v4",
      "Redux",
      "Socket.io",
      "Vapi AI",
      "Docker",
    ],
  },
  {
    company: "Basmat Alomran Co.",
    role: "Full-Stack Engineer",
    period: "Oct 2025 to Mar 2026",
    location: "Riyadh, KSA",
    tag: "FINTECH · CONSTRUCTION",
    color: "#5dd6a8",
    pitch:
      "Shipped bocsmart.com, a production bilingual (AR/EN) corporate site for an Aramco-approved MEP contractor. Built a live Smart AMC Estimator and ops dashboards across HQ and remote sites.",
    bullets: [
      "Built bocsmart.com end-to-end. Bilingual marketing site with a live Smart AMC Estimator tool wired to live pricing logic.",
      "Digitised core operations. Real-time dashboards for workforce attendance, site activity, and resource allocation across HQ and remote sites.",
    ],
    stack: ["Vue.js", "Node.js / Express", "MySQL", "Docker", "CI/CD"],
  },
  {
    company: "Tamkeen Middle East",
    role: "Full-Stack Engineer",
    period: "Jul 2025 to Oct 2025",
    location: "Riyadh, KSA",
    tag: "FINTECH · VISION 2030",
    color: "#9c8cff",
    pitch:
      "Led the MVP of Athar, a bilingual platform connecting Saudi retail investors to Vision 2030-aligned social impact funding. Zero-breakage RTL, brute-force-proof auth, and Saudi-compliant KYC.",
    bullets: [
      "Led MVP of Athar from architecture to deployment. Bilingual investment platform for Vision 2030-aligned social impact funding.",
      "Vue.js / Nuxt.js UI with full i18n, Vuetify RTL mode, and zero-breakage cross-language layouts.",
      "Laravel 10 REST API with Sanctum auth and endpoint rate-limiting that blocks brute-force attacks at the perimeter.",
      "Saudi-compliant KYC onboarding. Multi-stage verification, SMS OTP, AWS S3 document pipeline, Laravel Nova admin dashboard.",
    ],
    stack: [
      "Laravel 10",
      "Vue.js 2",
      "Nuxt.js",
      "Vuetify",
      "MySQL",
      "AWS S3",
      "Laravel Sanctum",
    ],
  },
  {
    company: "Reshantech Sports Pvt. Ltd.",
    role: "Software Engineer",
    period: "Jul 2024 to Jul 2025",
    location: "India",
    tag: "MOBILE · MARKETPLACE",
    color: "#f472b6",
    pitch:
      "Greenfield turf booking app from zero. React Native and Firebase Auth on the front, optimistic locking on the back. Zero double-bookings under concurrent load.",
    bullets: [
      "Greenfield React Native (Expo / TypeScript) turf booking app with Firebase Auth.",
      "Node.js booking engine with optimistic locking. Zero double-bookings under concurrent loads.",
    ],
    stack: [
      "React Native",
      "TypeScript",
      "Node.js",
      "Express",
      "MongoDB",
      "Firebase",
      "Sentry",
    ],
  },
];

const projects: ShowcaseProject[] = [
  {
    index: "P · 01",
    title: "Medical Image Translation with GANs",
    subtitle: "Computer Vision · pix2pix · 2nd Prize AMU 2025",
    glyph: "✚",
    accent: "#e8c270",
    body: "A pix2pix-style conditional GAN in PyTorch that translates MRI to CT, cutting out redundant scans in clinical workflows. 2nd Prize at the ZHCET Project Exhibition, AMU.",
    bullets: [
      "Designed a conditional GAN architecture, tuning the generator/discriminator loss balance for clinical fidelity.",
      "Validated output on medical imaging datasets using SSIM as the structural metric.",
      "Picked from every final-year project for 2nd Prize. Judged on clinical relevance and novelty.",
    ],
    tags: ["PyTorch", "GAN", "Medical Imaging", "SSIM"],
    metric: { value: "SSIM", label: "structural fidelity" },
  },
  {
    index: "P · 02",
    title: "ScentWell — AI Perfume Sommelier",
    subtitle: "RAG · pgvector · GPT-4o · React Native",
    glyph: "✦",
    accent: "#9c8cff",
    body: "RAG and pgvector recommendation engine with a GPT-4o sommelier grounded by live Reddit scraping and Tavily / Perplexity web search. LLMOps wired through Langfuse and RAGAS. 35% hallucination drop shipped.",
    bullets: [
      "OpenAI embeddings plus cosine-similarity recommender with K-means-inspired taste steering.",
      "AI Sommelier built on Tavily, Perplexity, and live Reddit scraping for real-time dupe grounding.",
      "Langfuse tracing and RAGAS evaluation. Faithfulness 0.91, relevancy 0.88, 35% fewer hallucinations.",
    ],
    tags: [
      "React Native",
      "Node.js",
      "pgvector",
      "OpenAI",
      "Supabase",
      "Docker",
    ],
    metric: { value: "−35%", label: "hallucination delta" },
  },
  {
    index: "P · 03",
    title: "Arabic Sentiment Fine-Tune",
    subtitle: "QLoRA · Llama-3 8B · Arabic NLP",
    glyph: "ع",
    accent: "#5dd6a8",
    body: "Fine-tuned Llama-3 8B with QLoRA (4-bit NF4) on 12K Arabic tweets. Sentiment F1 climbed from 0.58 to 0.87 across 3-class classification. Deployed to HuggingFace Spaces with a FastAPI inference endpoint.",
    bullets: [
      "14 training runs tracked end-to-end. Hyperparams, loss curves, per-class F1, all to find optimal LoRA rank and alpha.",
      "4-bit NF4 quantisation kept memory low while preserving downstream accuracy.",
      "Deployed the quantised model with latency and memory monitoring under concurrent load.",
    ],
    tags: ["Python", "QLoRA", "HuggingFace", "FastAPI"],
    metric: { value: "0.58 → 0.87", label: "F1 jump" },
  },
  {
    index: "P · 04",
    title: "Saudi Business Research Agent",
    subtitle: "AI Agent · Function Calling · PostgreSQL",
    glyph: "ث",
    accent: "#f472b6",
    body: "Autonomous agent with 5 tools. Web search, CR lookup, Vision 2030 alignment, report generation, and PostgreSQL conversation memory. End-to-end Saudi company research in under 16 seconds, against 20 to 30 minutes by hand.",
    bullets: [
      "5-tool function-calling agent with persistent PostgreSQL conversation memory.",
      "10 test queries averaged under 16s end-to-end with self-rated output accuracy of 4.2/5.",
      "Vision 2030 alignment scoring built straight into the report generation tool.",
    ],
    tags: ["Python", "PostgreSQL", "Function Calling", "Agents"],
    metric: { value: "16s", label: "vs 20 to 30 min manual" },
  },
  {
    index: "P · 05",
    title: "DeeniSOJ — Trilingual Fatwa Platform",
    subtitle: "Next.js 14 · TypeScript · Supabase",
    glyph: "❖",
    accent: "#e8c270",
    body: "EN/AR/UR fatwa platform with scholar review workflow, full-text search, and RTL-aware navigation. Server-side PDF export via Puppeteer + pdf-lib with base64-embedded Arabic/Urdu fonts and QR codes.",
    bullets: [
      "Trilingual UI with admin dashboard, scholar review workflow, and full-text search.",
      "Solved Vercel-serverless tofu-box rendering for Arabic and Urdu PDFs via base64 font embedding.",
      "Framer Motion throughout. Every transition tuned for RTL cohesion.",
    ],
    tags: ["Next.js 14", "Supabase", "Puppeteer", "Framer Motion"],
    href: "https://deenisoj.com",
    metric: { value: "EN · AR · UR", label: "trilingual delivery" },
  },
  {
    index: "P · 06",
    title: "RTRPlat — Restaurant Operations",
    subtitle: "Vue · Fastify · Redis · Docker",
    glyph: "▤",
    accent: "#9c8cff",
    body: "Real-time order management SPA. Sub-200ms API responses under 100 concurrent connections, with Redis pub/sub keeping kitchen, staff, and admin synchronised in under 500ms.",
    bullets: [
      "Vue.js / Vuex SPA with Fastify backend and MongoDB for menu and orders.",
      "Server-Sent Events plus Redis pub/sub for cross-display order sync under 500ms.",
      "Containerised on Netlify and Render. 99.5% uptime measured over 6 months.",
    ],
    tags: ["Vue.js", "Fastify", "MongoDB", "Redis", "Docker"],
    metric: { value: "<500ms", label: "real-time order sync" },
  },
];

const Home: React.FC = () => {
  const aboutRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress: aboutProgress } = useScroll({
    target: aboutRef,
    offset: ["start end", "end start"],
  });
  const aboutImgY = useTransform(aboutProgress, [0, 1], ["10%", "-10%"]);

  return (
    <div className="relative min-h-screen overflow-hidden surface-ink">
      <Navigation />
      <ScrollRail />
      <HeroScene />

      <ChapterMark number="II" arabic="٠٢" word="numbers" />

      {/* === STATS RIBBON === */}
      <StatsRibbon />

      {/* === CHAPTER 1 — WHO === */}
      <section
        id="story"
        ref={aboutRef}
        className="relative py-24 md:py-40 px-6 overflow-hidden"
      >
        <div className="absolute inset-0 bg-grid-faint bg-grid-32 opacity-20" />
        <div className="relative max-w-7xl mx-auto">
          <div className="flex items-center gap-3 mb-12">
            <span className="section-number">03</span>
            <span className="hairline w-12" />
            <span className="text-[10px] font-mono tracking-widest text-bone/50 uppercase">
              The Origin
            </span>
          </div>

          <div className="grid lg:grid-cols-12 gap-10 items-start">
            <motion.div
              style={{ y: aboutImgY }}
              className="lg:col-span-5 lg:sticky lg:top-32"
            >
              <GlassCard variant="strong" className="p-8 relative overflow-hidden">
                <div className="absolute -top-32 -right-32 w-72 h-72 rounded-full bg-radial-gold opacity-50 blur-2xl" />
                <div className="relative">
                  <div className="text-[10px] font-mono tracking-widest text-gold/70 mb-3">
                    QUICK FACTS
                  </div>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between border-b border-bone/10 pb-3">
                      <span className="text-bone/60 text-sm">Based</span>
                      <span className="text-bone italic-serif text-lg">
                        Riyadh, KSA
                      </span>
                    </div>
                    <div className="flex items-center justify-between border-b border-bone/10 pb-3">
                      <span className="text-bone/60 text-sm">Role</span>
                      <span className="text-bone italic-serif text-lg">
                        AI Software Engineer
                      </span>
                    </div>
                    <div className="flex items-center justify-between border-b border-bone/10 pb-3">
                      <span className="text-bone/60 text-sm">Experience</span>
                      <span className="text-bone italic-serif text-lg">2+ years</span>
                    </div>
                    <div className="flex items-center justify-between border-b border-bone/10 pb-3">
                      <span className="text-bone/60 text-sm">Education</span>
                      <span className="text-bone italic-serif text-lg">
                        AMU · B.Tech CE
                      </span>
                    </div>
                    <div className="flex items-center justify-between border-b border-bone/10 pb-3">
                      <span className="text-bone/60 text-sm">Languages</span>
                      <span className="text-bone italic-serif text-lg">
                        EN · AR · HI · UR
                      </span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-bone/60 text-sm">Currently</span>
                      <span className="text-gold-soft italic-serif text-lg">
                        Agent Maven
                      </span>
                    </div>
                  </div>

                  <div className="mt-8 pt-6 border-t border-bone/10">
                    <div className="text-[10px] font-mono tracking-widest text-gold/70 mb-3">
                      RECOGNITION
                    </div>
                    <ul className="space-y-2 text-sm text-bone/70">
                      <li className="flex items-start gap-2">
                        <span className="text-gold mt-1.5 text-[10px]">◆</span>
                        <span>
                          REU Indo-US Collaboration — The Ohio State University
                          × AMU, 2024
                        </span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-gold mt-1.5 text-[10px]">◆</span>
                        <span>
                          2nd Prize · Project Exhibition (Medical GAN) · ZHCET,
                          AMU 2025
                        </span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-gold mt-1.5 text-[10px]">◆</span>
                        <span>
                          AWS Certified Cloud Practitioner (CLF-C02) · in
                          progress 2026
                        </span>
                      </li>
                    </ul>
                  </div>
                </div>
              </GlassCard>
            </motion.div>

            <div className="lg:col-span-7 space-y-12">
              <AnimatedHeading
                as="h2"
                text="From Aligarh to Riyadh, building bilingual AI for Saudi Vision 2030."
                className="font-display text-4xl md:text-6xl leading-[1.05] tracking-tight text-bone"
              />

              <div className="space-y-6 text-base md:text-lg text-bone/75 leading-relaxed max-w-2xl">
                <motion.p
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-15%" }}
                  transition={{ duration: 0.8, delay: 0.1 }}
                >
                  I&apos;m an{" "}
                  <span className="italic-serif text-gold-soft">
                    AI Software Engineer
                  </span>{" "}
                  with two years of production delivery in the Kingdom. RAG
                  pipelines, voice agents, fine-tuned LLMs, and bilingual SaaS
                  across fintech, construction, and edtech.
                </motion.p>
                <motion.p
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-15%" }}
                  transition={{ duration: 0.8, delay: 0.2 }}
                >
                  Right now I&apos;m the founding AI engineer at{" "}
                  <span className="text-bone">Agent Maven</span>. I&apos;m
                  architecting a Voice AI SaaS for 100K+ daily calls, pairing
                  Vapi orchestration with a RAGAS evaluation loop that catches
                  hallucination regressions before they ship.
                </motion.p>
                <motion.p
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-15%" }}
                  transition={{ duration: 0.8, delay: 0.3 }}
                >
                  Before that, Athar at{" "}
                  <span className="text-bone">Tamkeen Middle East</span>,
                  bocsmart.com at <span className="text-bone">Basmat Alomran</span>,
                  and a turf-booking marketplace at{" "}
                  <span className="text-bone">Reshantech</span>. Different
                  industries, same job. Zero to deployment, end to end.
                </motion.p>
                <motion.p
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-15%" }}
                  transition={{ duration: 0.8, delay: 0.4 }}
                  className="italic-serif text-bone text-xl md:text-2xl pt-4 border-l-2 border-gold/40 pl-6"
                >
                  &ldquo;The work I take is the work most devs skip. Messy,
                  cross-domain, bilingual, and there&apos;s no tutorial for
                  it.&rdquo;
                </motion.p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Marquee — what I do */}
      <MarqueeBand
        items={[
          "RAG Pipelines",
          "Voice AI",
          "Arabic NLP",
          "QLoRA Fine-Tuning",
          "Bilingual SaaS",
          "RAGAS Evaluation",
          "Vision 2030",
          "Agentic Systems",
        ]}
      />

      <ChapterMark number="IV" arabic="٠٤" word="trajectory" reverse />

      {/* === CHAPTER 2 — WORK / TIMELINE === */}
      <Section
        id="work"
        number="04"
        eyebrow="The Trajectory"
        title="Four chapters, one through-line. Ship real things, end to end."
        subtitle="A turf-booking app in India. A bilingual investment MVP and a contractor's digital backbone in Riyadh. Founding AI engineering at Agent Maven."
      >
        <CareerTimeline entries={careerEntries} />
      </Section>

      <ChapterMark number="V" arabic="٠٥" word="projects" />

      {/* === CHAPTER 3 — PROJECTS === */}
      <Section
        id="projects"
        number="05"
        eyebrow="Featured Work"
        title="Projects, in their own words."
        subtitle="Six artefacts from the lab and the field. Each one earned its place by teaching me something I still carry forward."
      >
        <ProjectShowcase projects={projects} />
      </Section>

      <ChapterMark number="VI" arabic="٠٦" word="stack" reverse />

      {/* === CHAPTER 4 — STACK === */}
      <SkillsConstellation />

      {/* === CHAPTER 5 — CONTACT === */}
      <section
        id="contact"
        className="relative py-32 md:py-40 px-6 overflow-hidden"
      >
        <div className="absolute inset-0 surface-navy opacity-50" />
        <div className="absolute inset-0 starfield opacity-60" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80vw] h-[80vw] max-w-[800px] max-h-[800px] rounded-full bg-radial-gold opacity-30 blur-3xl pointer-events-none" />

        <div className="relative max-w-5xl mx-auto text-center">
          <div className="flex items-center justify-center gap-3 mb-10">
            <span className="section-number">06</span>
            <span className="hairline w-12" />
            <span className="text-[10px] font-mono tracking-widest text-bone/50 uppercase">
              The Invitation
            </span>
          </div>

          <AnimatedHeading
            as="h2"
            text="Building something"
            className="font-display text-5xl md:text-8xl leading-[0.95] tracking-tight text-bone"
          />
          <AnimatedHeading
            as="h2"
            text="Arabic, AI-shaped, or"
            className="font-display text-5xl md:text-8xl leading-[0.95] tracking-tight text-bone mt-2"
            delay={0.2}
          />
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1, delay: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className="font-display text-5xl md:text-8xl leading-[0.95] tracking-tight italic-serif text-gradient-gold mt-2"
          >
            both? Let&apos;s talk.
          </motion.p>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="mt-10 text-base md:text-lg text-bone/65 max-w-2xl mx-auto"
          >
            I&apos;m open to full-time, founding, and high-leverage contract
            work. Especially anything that ships in Arabic, runs through an
            LLM, or aligns with Vision 2030.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.7 }}
            className="mt-12 flex flex-wrap justify-center gap-4"
          >
            <MagneticButton
              href="mailto:basimhussain001@gmail.com"
              variant="primary"
            >
              <span>Send an email</span>
              <span aria-hidden>↗</span>
            </MagneticButton>
            <MagneticButton
              href="https://www.linkedin.com/in/basim-hussain-097702354/"
              variant="ghost"
              external
            >
              <span>LinkedIn</span>
            </MagneticButton>
            <MagneticButton
              href="https://github.com/Basimhussain"
              variant="ghost"
              external
            >
              <span>GitHub</span>
            </MagneticButton>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1, delay: 0.9 }}
            className="mt-20 grid sm:grid-cols-3 gap-px bg-bone/10 border border-bone/10 rounded-2xl overflow-hidden text-left"
          >
            <div className="p-6 bg-ink-800">
              <div className="text-[10px] font-mono tracking-widest text-gold/70 mb-2">
                EMAIL
              </div>
              <a
                href="mailto:basimhussain001@gmail.com"
                className="text-bone link-underline italic-serif text-lg"
              >
                basimhussain001@gmail.com
              </a>
            </div>
            <div className="p-6 bg-ink-800">
              <div className="text-[10px] font-mono tracking-widest text-gold/70 mb-2">
                PHONE
              </div>
              <a
                href="tel:+966557336403"
                className="text-bone link-underline italic-serif text-lg"
              >
                +966 55 733 6403
              </a>
            </div>
            <div className="p-6 bg-ink-800">
              <div className="text-[10px] font-mono tracking-widest text-gold/70 mb-2">
                LOCATION
              </div>
              <div className="text-bone italic-serif text-lg">
                Riyadh · Saudi Arabia
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="relative py-12 px-6 border-t border-bone/10">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-6">
          <div className="flex items-center gap-4">
            <span className="ticker-dot animate-shimmer" />
            <span className="text-[11px] font-mono tracking-widest text-bone/55">
              © 2026 BASIM HUSSAIN · BUILT WITH NEXT.JS · FRAMER MOTION ·
              LENIS · TAILWIND
            </span>
          </div>
          <div className="flex items-center gap-6 text-[11px] font-mono tracking-widest text-bone/50">
            <a href="#hero" className="link-underline hover:text-gold-soft">
              ↑ TOP
            </a>
            <span className="hairline w-12" />
            <span>RIYADH · 24°43&apos;N</span>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Home;
