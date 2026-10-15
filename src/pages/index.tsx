import React from "react";
import Link from "next/link";
import {
  Navigation,
  SmoothScroll,
  ProjectCard,
  CopyEmail,
} from "../components";

const EMAIL = "basimhussain001@gmail.com";

const featured = [
  {
    slug: "voice-agents",
    title: "Voice and chat agents for sales",
    text: "Agents answer inbound enquiries, qualify leads and write call summaries straight into the CRM. A WhatsApp automation cut routine replies from about 4 hours to under 30 seconds, and an LLM pipeline turns free-text requirements into structured quotations.",
    stack: "LLM and voice APIs, n8n, Node.js, MySQL",
    meta: "Basmat Alomran, 2026.",
    kind: "agents" as const,
    wide: true,
  },
  {
    slug: "amc-estimator",
    title: "Smart AMC Estimator",
    text: "A bilingual Arabic and English corporate platform with a live estimator that returns a quote in under 2 seconds.",
    stack: "Vue.js, Node.js, Express",
    meta: "Basmat Alomran, 2026.",
    kind: "estimator" as const,
    href: "https://bocsmart.com",
  },
  {
    slug: "erp",
    title: "Company ERP",
    text: "Built from scratch for HR, finance, procurement, projects and field operations. Live dashboards replaced manual daily reports across 3 active sites.",
    stack: "Vue.js, Node.js, Express, MySQL, Docker",
    meta: "Basmat Alomran, 2026.",
    kind: "erp" as const,
  },
  {
    slug: "voice-platform",
    title: "Voice AI platform",
    text: "A SaaS platform that orchestrates Vapi conversational agents, with a real-time React dashboard for live calls and sentiment. A RAGAS evaluation loop runs on every knowledge-base update, so hallucination regressions are caught before release.",
    stack: "Node.js, PostgreSQL, React 19, Socket.io, Docker",
    meta: "Agent Maven, 2025 to 2026.",
    kind: "voice" as const,
    wide: true,
    flip: true,
  },
  {
    slug: "arabic-sentiment",
    title: "Arabic sentiment model",
    text: "Llama 3 8B fine-tuned with QLoRA (4-bit NF4) on Arabic tweets, then served from a FastAPI endpoint on HuggingFace Spaces with latency and memory monitoring.",
    stack: "QLoRA, HuggingFace, FastAPI",
    meta: "Personal project.",
    kind: "sentiment" as const,
  },
  {
    slug: "scentwell",
    title: "ScentWell",
    text: "A recommendation engine: RAG over pgvector, with a GPT-4o agent grounded by live web search and Reddit data. Traced in Langfuse and evaluated with RAGAS.",
    stack: "React Native, Node.js, pgvector, OpenAI, Supabase",
    meta: "Personal project.",
    kind: "scentwell" as const,
  },
];

const more = [
  {
    slug: "athar",
    title: "Athar",
    text: "Bilingual platform connecting Saudi retail investors to Vision 2030 impact funding. Saudi-compliant KYC with SMS OTP, a Laravel Nova admin and full RTL support.",
    stack: "Laravel 10, Nuxt.js, Vuetify, AWS S3",
    meta: "Tamkeen Middle East, 2025",
  },
  {
    slug: "turf-booking",
    title: "Turf booking app",
    text: "About 5,000 active users, over 99% crash-free sessions, and zero double-bookings across 10,000+ transactions. A support chatbot took roughly 60% of queries off human agents.",
    stack: "React Native, Node.js, MongoDB, Firebase",
    meta: "Reshantech Sports, 2024 to 2025",
  },
  {
    slug: "saudi-research-agent",
    title: "Saudi Business Research Agent",
    text: "An autonomous five-tool agent with PostgreSQL memory that completes full company research in under 16 seconds.",
    stack: "Python, PostgreSQL",
    meta: "Personal project",
    href: "https://github.com/Basimhussain/saudi-research-agent",
  },
  {
    slug: "mri-to-ct",
    title: "MRI to CT image translation",
    text: "A pix2pix-style conditional GAN aimed at removing redundant scans in clinical workflows, validated with SSIM. Won 2nd Prize at the AMU ZHCET Project Exhibition.",
    stack: "PyTorch, computer vision",
    meta: "Final-year project, 2025",
  },
  {
    slug: "gesture-mouse",
    title: "AI gesture mouse for macOS",
    text: "Hand-gesture cursor control, built in the Research Experience for Undergraduates programme run by The Ohio State University and AMU.",
    stack: "Python, OpenCV, MediaPipe",
    meta: "Research project, 2024",
    href: "https://github.com/Basimhussain/ai-gesture-mouse-macos",
  },
  {
    slug: "mise",
    title: "Mise",
    text: "A multi-tenant restaurant operations platform.",
    stack: "Fastify, PostgreSQL, Redis",
    meta: "Personal project",
    href: "https://mise-beta-test.vercel.app/",
  },
];

const roles = [
  ["Mar 2026 to now", "AI Software Engineer", "Basmat Alomran Co."],
  ["Oct 2025 to Mar 2026", "Founding AI Engineer", "Agent Maven"],
  ["Jul 2025 to Oct 2025", "Full-Stack Engineer", "Tamkeen Middle East"],
  ["Jul 2024 to Jul 2025", "Software Engineer", "Reshantech Sports"],
];

const tools = [
  [
    "AI",
    "LLM apps, RAG (LangChain, LlamaIndex, pgvector), fine-tuning (QLoRA, LoRA, PEFT), agents and function calling, RAGAS, Langfuse, Arabic NLP, OpenAI API, HuggingFace, PyTorch",
  ],
  [
    "Backend",
    "Python, FastAPI, Node.js, Express, Fastify, Laravel, Spring Boot, REST, WebSockets",
  ],
  [
    "Frontend",
    "TypeScript, React 19, React Native (Expo), Vue.js, Nuxt.js, Tailwind CSS, i18n and RTL",
  ],
  [
    "Data and infrastructure",
    "PostgreSQL, MySQL, MongoDB, Redis, Supabase, Docker, GitHub Actions, AWS (S3, Lambda, CloudWatch), n8n",
  ],
  [
    "Enterprise",
    "Microsoft Power Platform: Power Apps, Power Automate, Dataverse, Power BI",
  ],
];

const linkClass =
  "underline underline-offset-4 decoration-ink/30 hover:decoration-ink transition-colors";

const Home = () => (
  <div id="top" className="min-h-screen bg-chalk text-ink">
    <SmoothScroll />
    <Navigation />

    <main className="mx-auto max-w-6xl px-5 md:px-8">
      {/* Intro */}
      <section className="intro pt-14 pb-16 md:pt-24 md:pb-24">
        <h1 className="text-[clamp(3.2rem,11vw,8rem)] font-semibold tracking-[-0.04em] leading-[0.92]">
          Basim Hussain
        </h1>
        <p
          lang="ar"
          dir="rtl"
          className="mt-3 font-arabic text-[clamp(1.8rem,5vw,3.4rem)] text-pine leading-tight text-right md:text-left"
        >
          باسم حسين
        </p>
        <p className="mt-8 max-w-2xl text-xl md:text-2xl leading-snug text-ink/90">
          AI engineer in Riyadh. I build voice agents, RAG systems and
          bilingual Arabic and English products.
        </p>
        <div className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-4">
          <a
            href="#work"
            className="bg-ink text-chalk px-5 py-3 text-sm font-medium rounded hover:bg-pine transition-colors"
          >
            See the work
          </a>
          <a href="/Basim_Hussain_CV.pdf" className={`text-sm ${linkClass}`}>
            Download CV
          </a>
        </div>
        <p className="mt-10 text-sm text-muted">
          Available immediately. Transferable Iqama.
        </p>
      </section>

      {/* Work */}
      <section id="work" className="pb-8">
        <div className="flex items-baseline justify-between gap-6 mb-10 md:mb-14">
          <h2 className="text-3xl md:text-4xl font-semibold tracking-tight">
            Selected work
          </h2>
          <Link href="/work" className={`text-sm font-medium text-pine ${linkClass}`}>
            See all work
          </Link>
        </div>
        <div className="space-y-16 md:space-y-24">
          <ProjectCard {...featured[0]} />
          <div className="grid md:grid-cols-2 gap-x-10 gap-y-16">
            <ProjectCard {...featured[1]} />
            <ProjectCard {...featured[2]} />
          </div>
          <ProjectCard {...featured[3]} />
          <div className="grid md:grid-cols-2 gap-x-10 gap-y-16">
            <ProjectCard {...featured[4]} />
            <ProjectCard {...featured[5]} />
          </div>
        </div>
      </section>

      {/* More projects */}
      <section className="py-20 md:py-28">
        <h2 className="text-3xl md:text-4xl font-semibold tracking-tight mb-10">
          More projects
        </h2>
        <ul className="border-t border-line">
          {more.map((p) => (
            <li
              key={p.title}
              className="py-7 border-b border-line md:grid md:grid-cols-12 md:gap-10"
            >
              <div className="md:col-span-4">
                <h3 className="text-lg font-semibold leading-snug">
                  <Link href={`/work/${p.slug}`} className={`text-pine ${linkClass}`}>
                    {p.title}
                  </Link>
                </h3>
                <p className="mt-1 text-sm text-muted">{p.meta}</p>
                {p.href && (
                  <a
                    href={p.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`mt-2 inline-block text-sm ${linkClass}`}
                  >
                    {p.href.includes("github.com") ? "GitHub" : "Live demo"}
                  </a>
                )}
              </div>
              <div className="mt-3 md:mt-0 md:col-span-8">
                <p className="leading-relaxed max-w-prose">{p.text}</p>
                <p className="mt-2 text-sm text-muted">{p.stack}</p>
              </div>
            </li>
          ))}
        </ul>
      </section>

      {/* Experience */}
      <section id="experience" className="pb-20 md:pb-28">
        <h2 className="text-3xl md:text-4xl font-semibold tracking-tight mb-10">
          Where I have worked
        </h2>
        <ul className="border-t border-line">
          {roles.map(([when, role, company]) => (
            <li
              key={company}
              className="py-5 border-b border-line sm:grid sm:grid-cols-12 sm:gap-10"
            >
              <p className="text-sm text-muted sm:col-span-4 sm:pt-1">{when}</p>
              <p className="sm:col-span-4 font-medium">{role}</p>
              <p className="sm:col-span-4 text-muted">{company}</p>
            </li>
          ))}
        </ul>
      </section>

      {/* Tools */}
      <section id="tools" className="pb-20 md:pb-28">
        <h2 className="text-3xl md:text-4xl font-semibold tracking-tight mb-10">
          Tools
        </h2>
        <dl className="border-t border-line">
          {tools.map(([label, items]) => (
            <div
              key={label}
              className="py-5 border-b border-line sm:grid sm:grid-cols-12 sm:gap-10"
            >
              <dt className="font-medium sm:col-span-4">{label}</dt>
              <dd className="text-muted leading-relaxed mt-1 sm:mt-0 sm:col-span-8">
                {items}
              </dd>
            </div>
          ))}
        </dl>
      </section>
    </main>

    {/* Contact */}
    <section id="contact" className="bg-night text-ivory">
      <div className="mx-auto max-w-6xl px-5 md:px-8 py-20 md:py-28">
        <h2 className="text-[clamp(2.4rem,7vw,5rem)] font-semibold tracking-[-0.03em] leading-[1]">
          Let&apos;s talk about
          <br />
          what you are building.
        </h2>
        <div className="mt-10 flex flex-wrap items-center gap-x-6 gap-y-4">
          <a
            href={`mailto:${EMAIL}`}
            className="text-xl md:text-2xl underline underline-offset-8 decoration-brass/60 hover:decoration-brass transition-colors"
          >
            {EMAIL}
          </a>
          <div className="[&_button]:text-ivory/70 [&_button]:border-ivory/25 [&_button:hover]:text-ivory [&_button:hover]:border-ivory/60">
            <CopyEmail email={EMAIL} />
          </div>
        </div>
        <ul className="mt-8 flex flex-wrap gap-x-8 gap-y-2 text-ivory/80">
          <li>
            <a
              href="https://www.linkedin.com/in/basim-hussain-097702354/"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-ivory underline underline-offset-4 decoration-ivory/30"
            >
              LinkedIn
            </a>
          </li>
          <li>
            <a
              href="https://github.com/Basimhussain"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-ivory underline underline-offset-4 decoration-ivory/30"
            >
              GitHub
            </a>
          </li>
          <li>
            <a
              href="/Basim_Hussain_CV.pdf"
              className="hover:text-ivory underline underline-offset-4 decoration-ivory/30"
            >
              CV (PDF)
            </a>
          </li>
        </ul>
        <p className="mt-16 text-sm text-ivory/55 max-w-xl leading-relaxed">
          B.Tech. Computer Engineering, Aligarh Muslim University, 2025. AWS
          Certified Cloud Practitioner, 2026. Based in Riyadh, working in
          English, Arabic, Urdu and Hindi.
        </p>
      </div>
    </section>
  </div>
);

export default Home;
