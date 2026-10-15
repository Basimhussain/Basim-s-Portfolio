import React from "react";
import { Section, Navigation, Reveal, SmoothScroll } from "../components";

const EMAIL = "basimhussain001@gmail.com";

const roles = [
  {
    title: "AI Software Engineer",
    company: "Basmat Alomran Co.",
    place: "Riyadh",
    period: "Mar 2026 to present",
    points: [
      "Built and deployed voice and chat AI agents that handle inbound enquiries and lead qualification, with call summaries written back to the CRM automatically. Around 70% of repetitive first-contact enquiries no longer reach the sales team.",
      "Developed an LLM pipeline that turns free-text customer requirements into structured, service-based quotations, and an n8n WhatsApp automation that brought routine response times down from roughly 4 hours to under 30 seconds.",
      "Shipped bocsmart.com, a bilingual Arabic and English corporate platform with a live Smart AMC Estimator that returns a quote in under 2 seconds.",
      "Designed and built a company-wide ERP from scratch covering HR, finance, procurement, projects and field operations, with role-based access, multi-stage approvals and real-time dashboards that replaced manual daily reports across 3 active sites.",
    ],
    stack:
      "Vue.js, Node.js, Express, MySQL, Docker, CI/CD, LLM and voice APIs, n8n",
  },
  {
    title: "Founding AI Engineer (Full-Stack)",
    company: "Agent Maven",
    place: "Riyadh",
    period: "Oct 2025 to Mar 2026",
    points: [
      "Architected a Voice AI SaaS platform that orchestrates conversational agents (Vapi) on a Node.js and PostgreSQL backend designed for 100K+ calls a day.",
      "Set up a RAGAS evaluation loop (faithfulness 0.93, answer relevancy 0.90) with automated regression tests on every knowledge-base update, so hallucination regressions were caught before they reached production.",
      "Built a real-time React 19 dashboard on Socket.io for live call streaming, sentiment visualisation and performance metrics.",
      "Containerised every service with Docker and built a multi-stage GitHub Actions pipeline with test gates. No failed production deployments through launch.",
    ],
    stack:
      "Node.js, Express, PostgreSQL, Supabase, React 19, Redux, Socket.io, Vapi, Docker",
  },
  {
    title: "Full-Stack Engineer (three-month MVP engagement)",
    company: "Tamkeen Middle East",
    place: "Riyadh",
    period: "Jul 2025 to Oct 2025",
    points: [
      "Led end-to-end delivery of Athar, a bilingual platform connecting Saudi retail investors to Vision 2030-aligned social impact funding, working directly with the product owner and design team to scope, prioritise and ship the MVP on schedule.",
      "Built Saudi-compliant KYC onboarding with multi-stage verification, SMS OTP, an AWS S3 document pipeline and a Laravel Nova admin console.",
      "Engineered the Laravel 10 REST API with Sanctum authentication and rate limiting, and the Vue.js and Nuxt.js frontend with full i18n and RTL support, with no layout breakage in either language.",
    ],
    stack:
      "Laravel 10, Vue.js, Nuxt.js, Vuetify, MySQL, AWS S3, Laravel Sanctum",
  },
  {
    title: "Software Engineer",
    company: "Reshantech Sports Pvt. Ltd.",
    place: "India (remote)",
    period: "Jul 2024 to Jul 2025",
    points: [
      "Shipped a greenfield React Native (Expo, TypeScript) turf-booking app with Firebase Auth and Sentry monitoring, reaching around 5,000 active users with over 99% crash-free sessions.",
      "Built an AI chatbot for customer support and booking assistance covering FAQs, slot availability and booking guidance, which took roughly 60% of support queries off human agents.",
      "Engineered the Node.js booking engine with optimistic locking. Zero double-bookings across 10,000+ transactions under concurrent load.",
    ],
    stack:
      "React Native, TypeScript, Node.js, Express, MongoDB, Firebase, Sentry",
  },
];

const projects = [
  {
    title: "Arabic Sentiment Fine-Tune",
    stack: "Llama 3 8B, QLoRA, HuggingFace, FastAPI",
    text: "Fine-tuned Llama 3 8B with QLoRA (4-bit NF4) on 12K Arabic tweets, lifting 3-class sentiment F1 from 0.58 to 0.87 across 14 tracked training runs. Deployed the quantised model behind a FastAPI endpoint on HuggingFace Spaces with latency and memory monitoring.",
  },
  {
    title: "ScentWell, AI Recommendation Engine",
    stack: "React Native, Node.js, pgvector, OpenAI, Supabase",
    text: "A RAG recommendation engine over pgvector with a GPT-4o conversational agent grounded by live web search and Reddit data. Instrumented with Langfuse tracing and RAGAS evaluation (faithfulness 0.90, relevancy 0.88), cutting hallucinations by 35%.",
  },
  {
    title: "Saudi Business Research Agent",
    stack: "Python, PostgreSQL",
    text: "An autonomous five-tool agent with PostgreSQL memory that completes full company research in under 16 seconds.",
    href: "https://github.com/Basimhussain/saudi-research-agent",
  },
  {
    title: "Medical Image Translation using GANs",
    stack: "PyTorch, computer vision",
    text: "A pix2pix-style conditional GAN for MRI-to-CT translation, aimed at removing redundant scans in clinical workflows and validated with SSIM. 2nd Prize, AMU ZHCET Project Exhibition, 2025.",
  },
  {
    title: "AI Gesture Mouse for macOS",
    stack: "Python, OpenCV, MediaPipe",
    text: "Built during the Research Experience for Undergraduates programme run jointly by The Ohio State University and AMU, 2024.",
    href: "https://github.com/Basimhussain/ai-gesture-mouse-macos",
  },
  {
    title: "Mise",
    stack: "Fastify, PostgreSQL, Redis",
    text: "A multi-tenant restaurant operations platform.",
  },
];

const skills = [
  ["Languages", "Python, JavaScript, TypeScript, PHP, Java, SQL"],
  [
    "AI and ML",
    "LLM application development, RAG pipelines (LangChain, LlamaIndex, pgvector), fine-tuning (QLoRA, LoRA, PEFT), AI agents and function calling, prompt engineering, evaluation and observability (RAGAS, Langfuse), Arabic NLP, OpenAI API, HuggingFace, PyTorch, FastAPI",
  ],
  [
    "Backend and APIs",
    "Node.js, Express, Fastify, Laravel, Spring Boot, REST, WebSockets, Server-Sent Events",
  ],
  [
    "Web and mobile",
    "React 19, React Native (Expo), Vue.js, Nuxt.js, Tailwind CSS, Vuetify, i18n and RTL layouts",
  ],
  [
    "Databases",
    "PostgreSQL, MySQL, MongoDB, Redis, Supabase, pgvector, Firebase, Prisma",
  ],
  [
    "Infrastructure",
    "Docker, GitHub Actions CI/CD, AWS (S3, Lambda, CloudWatch), Git, Sentry, n8n",
  ],
  [
    "Enterprise",
    "Microsoft Power Platform (Power Apps, Power Automate, Dataverse, Power BI)",
  ],
];

const linkClass =
  "text-accent underline underline-offset-4 decoration-accent/40 hover:decoration-accent transition-colors";

const Home = () => (
  <div id="top" className="min-h-screen bg-paper text-ink">
    <SmoothScroll />
    <Navigation />

    <main className="mx-auto max-w-4xl px-5 md:px-8">
      {/* Intro */}
      <section className="intro pt-16 pb-14 md:pt-24 md:pb-20">
        <p className="text-sm text-muted mb-4">Riyadh, Saudi Arabia</p>
        <h1 className="font-serif text-4xl sm:text-5xl md:text-6xl font-semibold tracking-tight leading-[1.08]">
          Basim Hussain
        </h1>
        <p className="mt-3 text-xl md:text-2xl text-muted">
          AI Engineer and Software Engineer
        </p>
        <p className="mt-8 max-w-2xl text-lg leading-relaxed">
          I build and ship AI features inside customer-facing products: LLM chat
          and voice agents, RAG pipelines, a fine-tuned Arabic language model,
          and automation that removes repetitive work for sales and support
          teams. My background is full-stack, and most of my work is on
          bilingual Arabic and English products for the Saudi market.
        </p>
        <div className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-4">
          <a
            href={`mailto:${EMAIL}`}
            className="inline-block bg-accent text-white px-5 py-3 text-sm font-medium rounded hover:bg-ink transition-colors"
          >
            Email me
          </a>
          <a
            href="/Basim_Hussain_CV.pdf"
            className="inline-block border border-ink/30 px-5 py-3 text-sm font-medium rounded hover:border-ink transition-colors"
          >
            Download CV (PDF)
          </a>
        </div>
        <p className="mt-8 text-sm text-muted">
          Transferable Iqama. Available immediately. English (fluent), Arabic
          (professional working), Urdu and Hindi (native).
        </p>
      </section>

      <Section id="experience" title="Experience">
        <ol className="space-y-12">
          {roles.map((r) => (
            <Reveal as="li" key={r.company}>
              <div className="sm:flex sm:items-baseline sm:justify-between sm:gap-6">
                <h3 className="font-semibold text-lg">{r.title}</h3>
                <p className="text-sm text-muted shrink-0">{r.period}</p>
              </div>
              <p className="text-muted">
                {r.company}, {r.place}
              </p>
              <ul className="mt-4 space-y-3 list-disc pl-5 marker:text-muted leading-relaxed">
                {r.points.map((p) => (
                  <li key={p}>{p}</li>
                ))}
              </ul>
              <p className="mt-4 text-sm text-muted">
                <span className="font-medium text-ink">Stack:</span> {r.stack}
              </p>
            </Reveal>
          ))}
        </ol>
      </Section>

      <Section id="projects" title="Selected projects">
        <ul className="divide-y divide-line border-y border-line">
          {projects.map((p, i) => (
            <Reveal as="li" key={p.title} className="py-6" delay={(i % 3) * 70}>
              <h3 className="font-semibold text-lg">
                {p.href ? (
                  <a
                    href={p.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={linkClass}
                  >
                    {p.title}
                  </a>
                ) : (
                  p.title
                )}
              </h3>
              <p className="text-sm text-muted mt-1">{p.stack}</p>
              <p className="mt-3 leading-relaxed">{p.text}</p>
            </Reveal>
          ))}
        </ul>
        <p className="mt-6 text-sm text-muted">
          More on{" "}
          <a
            href="https://github.com/Basimhussain"
            target="_blank"
            rel="noopener noreferrer"
            className={linkClass}
          >
            GitHub
          </a>
          .
        </p>
      </Section>

      <Section id="skills" title="Skills">
        <dl className="divide-y divide-line border-y border-line">
          {skills.map(([label, items], i) => (
            <Reveal
              key={label}
              delay={i * 50}
              className="py-4 sm:grid sm:grid-cols-[10rem_1fr] sm:gap-6"
            >
              <dt className="font-medium">{label}</dt>
              <dd className="text-muted leading-relaxed mt-1 sm:mt-0">
                {items}
              </dd>
            </Reveal>
          ))}
        </dl>
      </Section>

      <Section id="education" title="Education">
        <Reveal>
          <h3 className="font-semibold text-lg">
            B.Tech. Computer Engineering
          </h3>
          <p className="text-muted">
            Aligarh Muslim University, May 2021 to May 2025
          </p>
          <ul className="mt-6 space-y-2 list-disc pl-5 marker:text-muted leading-relaxed">
            <li>AWS Certified Cloud Practitioner (CLF-C02), 2026</li>
            <li>
              Research Experience for Undergraduates, a joint programme of The
              Ohio State University and AMU, certificate of achievement, 2024
            </li>
            <li>
              2nd Prize, Project Exhibition (Medical GAN), ZHCET, Aligarh Muslim
              University, May 2025
            </li>
            <li>
              LinkedIn Learning: Prompt Engineering for Generative AI,
              Statistics Foundations, Data Analytics Career Skills, Excel
              Expert, 2025
            </li>
          </ul>
        </Reveal>
      </Section>

      <Section id="contact" title="Contact">
        <Reveal>
          <p className="max-w-xl leading-relaxed">
            The quickest way to reach me is by email. I am based in Riyadh and
            available to start immediately.
          </p>
          <ul className="mt-6 space-y-2">
            <li>
              <a href={`mailto:${EMAIL}`} className={linkClass}>
                {EMAIL}
              </a>
            </li>
            <li>
              <a
                href="https://www.linkedin.com/in/basim-hussain"
                target="_blank"
                rel="noopener noreferrer"
                className={linkClass}
              >
                LinkedIn
              </a>
            </li>
            <li>
              <a
                href="https://github.com/Basimhussain"
                target="_blank"
                rel="noopener noreferrer"
                className={linkClass}
              >
                GitHub
              </a>
            </li>
          </ul>
        </Reveal>
      </Section>
    </main>

    <footer className="border-t border-line">
      <p className="mx-auto max-w-4xl px-5 md:px-8 py-8 text-sm text-muted">
        Basim Hussain, 2026
      </p>
    </footer>
  </div>
);

export default Home;
