import { useMemo, useState } from "react";
import { Link } from "@/lib/router";
import { ArrowUpRight } from "lucide-react";
import { groupedCategories as categories } from "@/data/projects";

/**
 * Every project as a card, filterable by category.
 *
 * This used to be a category column, a plain text list of titles and one
 * preview image that swapped on hover, with the homepage's Featured Projects
 * block repeated underneath. So "All Projects" led to a page showing the same
 * four projects you had just clicked away from, plus its own "All Projects"
 * link pointing back at itself.
 */

const ALL = "all";

const CategoryBrowser = () => {
  const [activeCat, setActiveCat] = useState(ALL);

  const allProjects = useMemo(
    () =>
      categories.flatMap((cat) =>
        cat.projects.map((p) => ({ ...p, catKey: cat.key, catLabel: cat.label })),
      ),
    [],
  );

  const visible =
    activeCat === ALL ? allProjects : allProjects.filter((p) => p.catKey === activeCat);

  const tabs = [
    { key: ALL, label: "All", count: allProjects.length },
    ...categories.map((c) => ({ key: c.key, label: c.label, count: c.projects.length })),
  ];

  return (
    <section id="work" className="container border-t border-soft-white/15 py-12 md:py-16">
      <div className="flex flex-wrap items-baseline justify-between gap-x-8 gap-y-4">
        <p className="text-mustard text-[11px] tracking-luxury uppercase">Browse by type</p>
        <p className="text-soft-white/55 text-[11px] tracking-luxury uppercase">
          {visible.length} {visible.length === 1 ? "project" : "projects"}
        </p>
      </div>

      {/* Filters */}
      <ul className="mt-6 flex flex-wrap gap-x-7 gap-y-3 md:gap-x-9">
        {tabs.map((tab) => {
          const active = tab.key === activeCat;
          return (
            <li key={tab.key}>
              <button
                type="button"
                onClick={() => setActiveCat(tab.key)}
                aria-pressed={active}
                className={`group/tab relative text-left font-body text-sm transition-colors duration-500 md:text-[15px] ${
                  active ? "text-soft-white" : "text-soft-white/55 hover:text-soft-white/85"
                }`}
              >
                <span className="relative inline-block pb-1">
                  {tab.label}
                  <span className="ml-2 align-super text-[10px] text-soft-white/40">
                    {tab.count}
                  </span>
                  <span
                    className={`absolute bottom-0 left-0 h-px bg-mustard transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] ${
                      active ? "w-full" : "w-0 group-hover/tab:w-full"
                    }`}
                  />
                </span>
              </button>
            </li>
          );
        })}
      </ul>

      {/* Cards. Keyed by category so switching filters remounts and replays the
          reveal, rather than leaving stale tiles in place. */}
      <div
        key={activeCat}
        className="mt-10 grid grid-cols-1 gap-5 sm:grid-cols-2 md:mt-14 md:gap-6 lg:grid-cols-3"
      >
        {visible.map((p, i) => {
          const description = p.description;
          return (
            <Link
              key={p.slug}
              to={`/work/${p.slug}`}
              className="glow-card reveal group relative flex flex-col overflow-hidden rounded-xl border border-soft-white/10 bg-soft-white/[0.02] transition-colors duration-500 hover:border-mustard/30"
              style={{ transitionDelay: `${Math.min(i, 8) * 70}ms` }}
            >
              <div className="relative aspect-[4/3] overflow-hidden bg-secondary">
                <img
                  src={p.img}
                  alt={p.title}
                  loading="lazy"
                  decoding="async"
                  className="h-full w-full object-cover transition-transform duration-[1600ms] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.06]"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-transparent to-transparent opacity-80 transition-opacity duration-700 group-hover:opacity-95" />
                <div className="absolute right-4 top-4 flex h-10 w-10 translate-y-2 items-center justify-center rounded-full border border-mustard/70 bg-background/70 text-mustard opacity-0 backdrop-blur-md transition-all duration-500 group-hover:translate-y-0 group-hover:opacity-100">
                  <ArrowUpRight className="h-4 w-4" />
                </div>
              </div>

              <div className="flex flex-1 flex-col p-5 md:p-6">
                <p className="text-[10px] uppercase tracking-luxury text-mustard/85">
                  {p.catLabel}
                </p>
                <h3 className="mt-3 font-display text-xl font-light leading-tight text-soft-white md:text-2xl">
                  {p.title}
                </h3>
                {/* No line-clamp. Descriptions now run two sentences and the
                    clamp was cutting the second one mid-word; grid rows already
                    equalise card height, so letting it run costs nothing. */}
                {description && (
                  <p className="mt-3 text-sm font-light leading-relaxed text-soft-white/60">
                    {description}
                  </p>
                )}
                <span className="mt-auto pt-5 text-[10px] uppercase tracking-luxury text-soft-white/45 transition-colors duration-500 group-hover:text-mustard">
                  View project
                </span>
              </div>

              <span className="absolute inset-x-0 bottom-0 h-[2px] origin-left scale-x-0 bg-mustard transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-x-100" />
            </Link>
          );
        })}
      </div>
    </section>
  );
};

export default CategoryBrowser;
