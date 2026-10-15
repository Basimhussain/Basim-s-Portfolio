import { useMemo } from "react";
import Head from "next/head";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import CategoryBrowser from "@/components/CategoryBrowser";
import PortfolioHero from "@/components/PortfolioHero";
import LazyVisible from "@/components/LazyVisible";
import SphereMenu from "@/components/SphereMenu";
import CtaVision from "@/components/CtaVision";
import SmoothScroll from "@/components/SmoothScroll";
import { LineReveal } from "@/components/LineReveal";
import { projects } from "@/data/projects";
import { useReveal } from "@/hooks/useReveal";

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
  ["Backend", "Python, FastAPI, Node.js, Express, Fastify, Laravel, Spring Boot, REST, WebSockets"],
  ["Frontend", "TypeScript, React 19, React Native (Expo), Vue.js, Nuxt.js, Tailwind CSS, i18n and RTL"],
  [
    "Data and infrastructure",
    "PostgreSQL, MySQL, MongoDB, Redis, Supabase, Docker, GitHub Actions, AWS (S3, Lambda, CloudWatch), n8n",
  ],
  ["Enterprise", "Microsoft Power Platform: Power Apps, Power Automate, Dataverse, Power BI"],
];

const Home = () => {
  useReveal();

  const menuItems = useMemo(
    () =>
      projects.map((p) => ({
        image: p.img,
        link: `/work/${p.slug}`,
        title: p.title,
        description: p.category,
      })),
    []
  );

  return (
    <main className="bg-background text-foreground">
      <Head>
        <title>Basim Hussain | AI Engineer, Riyadh</title>
        <meta
          name="description"
          content="Basim Hussain is an AI engineer in Riyadh. Voice agents, RAG systems, a fine-tuned Arabic model and the full-stack products around them."
        />
      </Head>
      <SmoothScroll />
      <Nav />
      <PortfolioHero />
      <CategoryBrowser />

      <section className="py-24 md:py-32">
        <div className="container">
          <div className="mb-10 md:mb-14 flex flex-col md:flex-row md:items-end md:justify-between gap-6">
            <div>
              <p className="text-mustard text-[11px] tracking-luxury uppercase">Selected Works</p>
              <h2 className="mt-5 font-display text-3xl md:text-5xl leading-[1.05] font-light tracking-tight max-w-xl">
                <LineReveal text="EVERY PROJECT," inView duration={1} />
                <LineReveal text="ONE SPHERE." inView baseDelay={0.15} duration={1} />
              </h2>
            </div>
            <p className="text-soft-white/60 max-w-sm text-sm leading-relaxed">
              Drag the sphere to move through the work. Each surface opens a project.
            </p>
          </div>

          <div className="relative h-[560px] md:h-[680px] rounded-2xl border border-soft-white/10 bg-gradient-to-br from-soft-white/[0.03] to-transparent overflow-hidden">
            <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,hsl(var(--mustard)/0.08),transparent_60%)]" />
            <LazyVisible className="absolute inset-0" rootMargin="400px">
              <SphereMenu items={menuItems} />
            </LazyVisible>
          </div>
        </div>
      </section>

      <section id="experience" className="container border-t border-soft-white/15 py-20 md:py-28">
        <p className="text-mustard text-[11px] tracking-luxury uppercase">Experience</p>
        <h2 className="mt-5 font-display text-3xl md:text-5xl font-light leading-[1.05] max-w-2xl">
          Where I have worked.
        </h2>
        <ul className="mt-12 md:mt-16 border-t border-soft-white/10">
          {roles.map(([when, role, company]) => (
            <li
              key={company}
              className="reveal grid gap-2 border-b border-soft-white/10 py-6 md:grid-cols-12 md:gap-10"
            >
              <p className="text-[11px] tracking-luxury uppercase text-soft-white/55 md:col-span-4 md:pt-1">
                {when}
              </p>
              <p className="font-display text-2xl font-light text-soft-white md:col-span-4">{role}</p>
              <p className="text-soft-white/70 font-light md:col-span-4">{company}</p>
            </li>
          ))}
        </ul>
      </section>

      <section id="tools" className="container border-t border-soft-white/15 py-20 md:py-28">
        <p className="text-mustard text-[11px] tracking-luxury uppercase">Tools</p>
        <h2 className="mt-5 font-display text-3xl md:text-5xl font-light leading-[1.05] max-w-2xl">
          What I build with.
        </h2>
        <dl className="mt-12 md:mt-16 border-t border-soft-white/10">
          {tools.map(([label, items]) => (
            <div
              key={label}
              className="reveal grid gap-2 border-b border-soft-white/10 py-6 md:grid-cols-12 md:gap-10"
            >
              <dt className="font-display text-2xl font-light text-soft-white md:col-span-4">{label}</dt>
              <dd className="text-soft-white/70 font-light leading-relaxed md:col-span-8">{items}</dd>
            </div>
          ))}
        </dl>
      </section>

      <CtaVision />
      <Footer />
    </main>
  );
};

export default Home;
