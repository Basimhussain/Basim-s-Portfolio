import React, { useMemo, useState } from "react";
import Link from "next/link";
import { projects, categories } from "@/data/projects";

const ALL = "all";

/**
 * Every project as an image card, filterable by type. Pattern borrowed from
 * the Archonomic portfolio page, in this site's own light styling.
 */
const ProjectListing = () => {
  const [active, setActive] = useState(ALL);

  const tabs = useMemo(
    () => [
      { key: ALL, label: "All", count: projects.length },
      ...categories.map((c) => ({
        key: c.key as string,
        label: c.label as string,
        count: projects.filter((p) => p.catKey === c.key).length,
      })),
    ],
    []
  );

  const visible = active === ALL ? projects : projects.filter((p) => p.catKey === active);

  return (
    <section id="work" className="pb-20 md:pb-28">
      <div className="flex flex-wrap items-baseline justify-between gap-x-8 gap-y-3 mb-8 md:mb-10">
        <h2 className="text-3xl md:text-4xl font-semibold tracking-tight">Selected work</h2>
        <p className="text-sm text-muted tabular-nums">
          {visible.length} {visible.length === 1 ? "project" : "projects"}
        </p>
      </div>

      <ul className="flex flex-wrap gap-x-7 gap-y-3 md:gap-x-9 border-b border-line pb-4" role="tablist" aria-label="Filter projects by type">
        {tabs.map((t) => {
          const on = t.key === active;
          return (
            <li key={t.key}>
              <button
                type="button"
                role="tab"
                aria-selected={on}
                onClick={() => setActive(t.key)}
                className={`group relative pb-1 text-[15px] transition-colors duration-300 ${
                  on ? "text-ink" : "text-muted hover:text-ink"
                }`}
              >
                {t.label}
                <span className="ml-1.5 align-super text-[10px] text-muted/70 tabular-nums">{t.count}</span>
                <span
                  className={`absolute bottom-0 left-0 h-px bg-pine transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] ${
                    on ? "w-full" : "w-0 group-hover:w-full"
                  }`}
                />
              </button>
            </li>
          );
        })}
      </ul>

      <ul key={active} className="mt-10 md:mt-14 grid sm:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-14">
        {visible.map((p) => (
          <li key={p.slug}>
            <Link href={`/work/${p.slug}`} className="group block">
              <span className="relative block aspect-[4/3] overflow-hidden rounded-md bg-night">
                <img
                  src={p.img}
                  alt={`${p.title}, ${p.category}`}
                  loading="lazy"
                  decoding="async"
                  className="h-full w-full object-cover transition-transform duration-[1400ms] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.04]"
                />
                <span className="pointer-events-none absolute inset-x-0 bottom-0 h-0.5 origin-left scale-x-0 bg-brass transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-x-100" />
              </span>
              <span className="mt-5 block text-sm text-pine">{p.category}</span>
              <span className="mt-1 block text-xl font-semibold tracking-tight leading-snug">{p.title}</span>
              <span className="mt-2 block text-[15px] leading-relaxed text-muted">{p.description}</span>
              <span className="mt-4 inline-block text-sm font-medium text-pine underline underline-offset-4 decoration-pine/30 group-hover:decoration-pine transition-colors">
                View project
              </span>
            </Link>
          </li>
        ))}
      </ul>
    </section>
  );
};

export default ProjectListing;
