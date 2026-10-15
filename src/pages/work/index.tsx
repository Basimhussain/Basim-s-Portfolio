import React from "react";
import Head from "next/head";
import Link from "next/link";
import { Navigation, SmoothScroll } from "../../components";
import { projects, hasScreens, cover } from "../../data/projects";

const WorkIndex = () => (
  <div className="min-h-screen bg-chalk text-ink">
    <Head>
      <title>All work | Basim Hussain</title>
      <meta
        name="description"
        content="Screens, diagrams and results for every project, from voice agents and an ERP to a fine-tuned Arabic model."
      />
    </Head>
    <SmoothScroll />
    <Navigation variant="sub" />

    <main className="mx-auto max-w-6xl px-5 md:px-8 pt-12 md:pt-20 pb-24">
      <h1 className="text-[clamp(2.6rem,7vw,5rem)] font-semibold tracking-[-0.035em] leading-[1]">
        All work
      </h1>
      <p className="mt-5 max-w-2xl text-lg md:text-xl text-ink/80 leading-snug">
        Every project has its own gallery. Live products show real screens.
        Systems that run inside a company show how they work and what changed.
      </p>

      <ul className="mt-12 md:mt-16 grid sm:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-14">
        {projects.map((p) => (
          <li key={p.slug}>
            <Link href={`/work/${p.slug}`} className="group block">
              <span className="block overflow-hidden rounded-md bg-night aspect-[16/10]">
                <img
                  src={cover(p)?.src}
                  alt={`${p.title} cover`}
                  width={cover(p)?.w}
                  height={cover(p)?.h}
                  loading="lazy"
                  className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.03]"
                />
              </span>
              <span className="mt-4 block text-xl font-semibold tracking-tight leading-snug">
                {p.title}
              </span>
              <span className="mt-1 block text-sm text-muted">{p.context}</span>
              <span className="mt-2 block text-sm text-ink/80">
                {p.items.length} images,{" "}
                {hasScreens(p) ? "real screens" : "overview and results"}
              </span>
            </Link>
          </li>
        ))}
      </ul>
    </main>
  </div>
);

export default WorkIndex;
