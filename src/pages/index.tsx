import React from "react";
import {
  Navigation,
  SmoothScroll,
  ProjectListing,
  CopyEmail,
} from "../components";

const EMAIL = "basimhussain001@gmail.com";

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
      </section>

      <ProjectListing />

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
