import React, { useCallback, useEffect, useRef, useState } from "react";
import Head from "next/head";
import Link from "next/link";
import type { GetStaticPaths, GetStaticProps } from "next";
import { Navigation, SmoothScroll } from "../../components";
import { useReveal } from "@/hooks/useReveal";
import { projects, getProject, Project } from "@/data/projects";

const linkClass =
  "underline underline-offset-4 decoration-ink/30 hover:decoration-ink transition-colors";

const Chevron = ({ dir }: { dir: "left" | "right" }) => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
    <path d={dir === "left" ? "M15 5l-7 7 7 7" : "M9 5l7 7-7 7"} strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const SectionTitle = ({ children }: { children: React.ReactNode }) => (
  <h2 className="reveal text-3xl md:text-4xl font-semibold tracking-tight">{children}</h2>
);

/* ---------- gallery: featured image, thumbnail slider, lightbox ---------- */

const ThumbSlider = ({
  gallery,
  title,
  active,
  onSelect,
  onZoom,
}: {
  gallery: string[];
  title: string;
  active: number;
  onSelect: (i: number) => void;
  onZoom: (i: number) => void;
}) => {
  const scroller = useRef<HTMLDivElement>(null);
  const [canPrev, setCanPrev] = useState(false);
  const [canNext, setCanNext] = useState(false);

  const update = useCallback(() => {
    const el = scroller.current;
    if (!el) return;
    setCanPrev(el.scrollLeft > 4);
    setCanNext(el.scrollLeft + el.clientWidth < el.scrollWidth - 4);
  }, []);

  useEffect(() => {
    const el = scroller.current;
    if (!el) return;
    update();
    el.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
    return () => {
      el.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
    };
  }, [update, gallery.length]);

  const slide = (d: 1 | -1) => scroller.current?.scrollBy({ left: d * scroller.current.clientWidth * 0.9, behavior: "smooth" });

  const arrow =
    "hidden md:flex absolute top-1/2 -translate-y-1/2 z-10 h-10 w-10 items-center justify-center rounded-full bg-chalk/90 backdrop-blur border border-line text-ink hover:border-ink transition-all duration-300";

  return (
    <div className="relative mt-3 md:mt-4">
      <div
        ref={scroller}
        className="flex gap-2 md:gap-3 overflow-x-auto scroll-smooth snap-x snap-mandatory [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
      >
        {gallery.map((img, i) => (
          <button
            key={img}
            type="button"
            onClick={() => onSelect(i)}
            onDoubleClick={() => onZoom(i)}
            aria-label={`View image ${i + 1}`}
            aria-current={i === active}
            className={`snap-start shrink-0 overflow-hidden rounded-sm bg-night aspect-[4/3] w-[calc((100%-1.5rem)/4)] md:w-[calc((100%-3.75rem)/6)] transition-all duration-500 ${
              i === active ? "ring-2 ring-pine opacity-100" : "opacity-60 hover:opacity-100"
            }`}
          >
            <img src={img} alt={`${title} ${i + 1}`} loading="lazy" className="h-full w-full object-cover" />
          </button>
        ))}
      </div>
      <button type="button" onClick={() => slide(-1)} aria-label="Previous thumbnails" disabled={!canPrev}
        className={`${arrow} left-0 -translate-x-1/2 ${canPrev ? "opacity-100" : "opacity-0 pointer-events-none"}`}>
        <Chevron dir="left" />
      </button>
      <button type="button" onClick={() => slide(1)} aria-label="Next thumbnails" disabled={!canNext}
        className={`${arrow} right-0 translate-x-1/2 ${canNext ? "opacity-100" : "opacity-0 pointer-events-none"}`}>
        <Chevron dir="right" />
      </button>
    </div>
  );
};

const GallerySection = ({
  title,
  gallery,
  projectTitle,
  active,
  onSelect,
  onZoom,
}: {
  title: string;
  gallery: string[];
  projectTitle: string;
  active: number;
  onSelect: (i: number) => void;
  onZoom: (i: number) => void;
}) => (
  <div>
    <SectionTitle>{title}</SectionTitle>
    <div className="reveal mt-8">
      <button
        type="button"
        onClick={() => onZoom(active)}
        className="group block w-full overflow-hidden rounded-md bg-night cursor-zoom-in aspect-[16/10]"
      >
        <img
          src={gallery[active] ?? gallery[0]}
          alt={`${projectTitle}, ${title.toLowerCase()}, image ${active + 1}`}
          className="h-full w-full object-cover transition-transform duration-[1400ms] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.02]"
        />
      </button>
      <ThumbSlider gallery={gallery} title={`${projectTitle} ${title}`} active={active} onSelect={onSelect} onZoom={onZoom} />
    </div>
  </div>
);

/* ---------- silent walkthrough video ---------- */

const Walkthrough = ({ video }: { video: Project["videos"][number] }) => {
  const ref = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const io = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) el.play().catch(() => {});
        else el.pause();
      },
      { threshold: 0.5 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <div>
      <SectionTitle>{video.title}</SectionTitle>
      <div className="reveal mt-8 overflow-hidden rounded-md bg-night aspect-[16/10]">
        <video
          ref={ref}
          src={video.src}
          poster={video.poster}
          muted
          loop
          playsInline
          controls
          preload="none"
          aria-label={video.title}
          className={`h-full w-full ${video.h > video.w ? "object-contain" : "object-cover"}`}
        />
      </div>
      {video.caption && <p className="mt-4 text-sm text-muted max-w-xl">{video.caption}</p>}
    </div>
  );
};

/* ---------- page ---------- */

interface Props {
  project: Project;
  next: { slug: string; title: string; category: string };
}

const ProjectPage = ({ project, next }: Props) => {
  useReveal();

  const stage = project.items.filter((i) => !i.illustration && !i.phone && !i.tall).map((i) => i.src);
  const overview = project.items.filter((i) => i.illustration).map((i) => i.src);
  const sections = [
    ...(stage.length ? [{ title: "Screens", gallery: stage }] : []),
    ...(overview.length ? [{ title: "Overview", gallery: overview }] : []),
  ];

  const [active, setActive] = useState<number[]>(() => sections.map(() => 0));
  const [lightbox, setLightbox] = useState<{ gallery: string[]; index: number } | null>(null);
  const closeBtn = useRef<HTMLButtonElement>(null);
  const opener = useRef<HTMLElement | null>(null);

  const close = useCallback(() => {
    setLightbox(null);
    opener.current?.focus();
  }, []);
  const prev = useCallback(
    () => setLightbox((l) => (l ? { ...l, index: (l.index - 1 + l.gallery.length) % l.gallery.length } : l)),
    []
  );
  const nextImg = useCallback(
    () => setLightbox((l) => (l ? { ...l, index: (l.index + 1) % l.gallery.length } : l)),
    []
  );

  useEffect(() => {
    if (!lightbox) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
      if (e.key === "ArrowLeft") prev();
      if (e.key === "ArrowRight") nextImg();
    };
    document.addEventListener("keydown", onKey);
    const before = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    closeBtn.current?.focus();
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = before;
    };
  }, [lightbox !== null, close, prev, nextImg]); // eslint-disable-line react-hooks/exhaustive-deps

  // swipe on touch screens
  const imgRef = useRef<HTMLImageElement>(null);
  const activeThumb = useRef<HTMLButtonElement>(null);
  const start = useRef<{ x: number; y: number } | null>(null);
  const dx = useRef(0);
  const horizontal = useRef(false);

  const onTouchStart = (e: React.TouchEvent) => {
    start.current = { x: e.touches[0].clientX, y: e.touches[0].clientY };
    dx.current = 0;
    horizontal.current = false;
    if (imgRef.current) imgRef.current.style.transition = "none";
  };
  const onTouchMove = (e: React.TouchEvent) => {
    if (!start.current) return;
    const x = e.touches[0].clientX - start.current.x;
    const y = e.touches[0].clientY - start.current.y;
    if (!horizontal.current && Math.abs(x) > Math.abs(y) && Math.abs(x) > 8) horizontal.current = true;
    if (horizontal.current) {
      dx.current = x;
      if (imgRef.current) imgRef.current.style.transform = `translateX(${x}px)`;
    }
  };
  const onTouchEnd = () => {
    const d = dx.current;
    start.current = null;
    if (imgRef.current) {
      imgRef.current.style.transition = "transform 300ms cubic-bezier(0.22,1,0.36,1)";
      imgRef.current.style.transform = "translateX(0)";
    }
    if (!horizontal.current) return;
    if (d <= -50) nextImg();
    else if (d >= 50) prev();
  };

  useEffect(() => {
    activeThumb.current?.scrollIntoView({ behavior: "smooth", inline: "center", block: "nearest" });
  }, [lightbox?.index]);

  const meta: [string, string][] = [
    ["Where", project.location],
    ["Year", project.year ?? ""],
    ["Built with", project.scope],
  ];

  return (
    <div className="min-h-screen bg-chalk text-ink">
      <Head>
        <title>{`${project.title} | Basim Hussain`}</title>
        <meta name="description" content={project.description} />
        <meta property="og:title" content={`${project.title} | Basim Hussain`} />
        <meta property="og:description" content={project.description} />
        <meta property="og:image" content={project.hero} />
      </Head>
      <SmoothScroll />
      <Navigation variant="sub" />

      <main>
        {/* Title */}
        <section className="mx-auto max-w-6xl px-5 md:px-8 pt-10 md:pt-16">
          <Link href="/#work" className={`text-sm text-muted ${linkClass}`}>
            All work
          </Link>
          <p className="mt-8 text-sm text-pine">{project.category}</p>
          <h1 className="mt-2 text-[clamp(2.4rem,6vw,4.6rem)] font-semibold tracking-[-0.035em] leading-[1.02] max-w-4xl">
            {project.title}
          </h1>
          <p className="mt-5 max-w-xl text-lg text-muted leading-relaxed">{project.description}</p>
        </section>

        {/* Hero image */}
        <section className="mx-auto max-w-6xl px-5 md:px-8 mt-10 md:mt-14">
          <div className="overflow-hidden rounded-md bg-night aspect-[16/9]">
            <img src={project.hero} alt={project.title} className="h-full w-full object-cover" />
          </div>
        </section>

        {/* Facts on the left, the story on the right */}
        <section className="mx-auto max-w-6xl px-5 md:px-8 py-16 md:py-24 grid grid-cols-1 md:grid-cols-12 gap-10">
          <dl className="reveal md:col-span-4 space-y-6 text-sm">
            {meta
              .filter(([, v]) => v)
              .map(([label, value]) => (
                <div key={label}>
                  <dt className="text-muted">{label}</dt>
                  <dd className="mt-1 text-base leading-snug">{value}</dd>
                </div>
              ))}
            {project.links.length > 0 && (
              <div>
                <dt className="text-muted">Links</dt>
                <dd className="mt-1 space-y-1">
                  {project.links.map((l) => (
                    <a key={l.href} href={l.href} target="_blank" rel="noopener noreferrer" className={`block text-base text-pine ${linkClass}`}>
                      {l.label}
                    </a>
                  ))}
                </dd>
              </div>
            )}
          </dl>
          <div className="reveal md:col-span-8">
            <p className="text-2xl md:text-4xl font-semibold tracking-tight leading-[1.15]">{project.lead}</p>
            {project.intro && <p className="mt-8 max-w-2xl text-muted leading-relaxed">{project.intro}</p>}
            {project.details.length > 0 && (
              <>
                <div className="mt-10 h-px w-16 bg-pine" />
                <ul className="mt-10 space-y-5 leading-relaxed">
                  {project.details.map((d) => (
                    <li key={d} className="flex gap-4">
                      <span className="mt-3 h-px w-6 shrink-0 bg-pine" />
                      <span>{d}</span>
                    </li>
                  ))}
                </ul>
              </>
            )}
          </div>
        </section>

        {/* Facts strip */}
        {project.facts.length > 0 && (
          <section className="mx-auto max-w-6xl px-5 md:px-8 pb-16 md:pb-24">
            <dl className="reveal grid divide-y divide-line border-y border-line sm:grid-cols-3 sm:divide-x sm:divide-y-0">
              {project.facts.map((f) => (
                <div key={f.label} className="px-4 py-8 text-center md:py-10">
                  <dd>
                    <span className="block text-3xl md:text-4xl font-semibold tracking-tight">{f.value}</span>
                    <span className="mt-3 block text-sm text-muted">{f.label}</span>
                  </dd>
                </div>
              ))}
            </dl>
          </section>
        )}

        {/* How it works */}
        {project.process && project.process.length > 0 && (
          <section className="mx-auto max-w-6xl px-5 md:px-8 pb-16 md:pb-24">
            <SectionTitle>How it works</SectionTitle>
            <ol className="mt-10 grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
              {project.process.map((s, i) => (
                <li key={s.title} className="reveal max-w-sm border-t border-line pt-5">
                  <p className="text-sm text-pine tabular-nums">{String(i + 1).padStart(2, "0")}</p>
                  <h3 className="mt-3 text-lg font-semibold">{s.title}</h3>
                  <p className="mt-2 text-muted leading-relaxed">{s.text}</p>
                </li>
              ))}
            </ol>
          </section>
        )}

        {/* Challenges and solutions */}
        {project.challenges && project.challenges.length > 0 && (
          <section className="mx-auto max-w-6xl px-5 md:px-8 pb-16 md:pb-24">
            <SectionTitle>Challenges and solutions</SectionTitle>
            <ul className="mt-10 grid gap-6 md:grid-cols-2">
              {project.challenges.map((c) => (
                <li key={c.challenge} className="reveal rounded-md border border-line bg-white/40 p-6 md:p-8">
                  <p className="leading-relaxed">{c.challenge}</p>
                  <p className="mt-6 text-sm text-pine">Solution</p>
                  <p className="mt-2 text-muted leading-relaxed">{c.solution}</p>
                </li>
              ))}
            </ul>
          </section>
        )}

        {/* Video */}
        {project.videos.length > 0 && (
          <section className="mx-auto max-w-6xl px-5 md:px-8 pb-16 md:pb-24 space-y-14">
            {project.videos.map((v) => (
              <Walkthrough key={v.src} video={v} />
            ))}
          </section>
        )}

        {/* Galleries */}
        {sections.map((s, idx) => (
          <section key={s.title} className="mx-auto max-w-6xl px-5 md:px-8 pb-16 md:pb-24">
            <GallerySection
              title={s.title}
              gallery={s.gallery}
              projectTitle={project.title}
              active={active[idx] ?? 0}
              onSelect={(i) => setActive((a) => a.map((v, k) => (k === idx ? i : v)))}
              onZoom={(i) => {
                opener.current = document.activeElement as HTMLElement;
                setLightbox({ gallery: s.gallery, index: i });
              }}
            />
          </section>
        ))}

        {/* Next project */}
        <section className="border-t border-line">
          <Link
            href={`/work/${next.slug}`}
            className="group mx-auto max-w-6xl px-5 md:px-8 py-16 md:py-24 flex flex-col md:flex-row md:items-end justify-between gap-6"
          >
            <div>
              <p className="text-sm text-muted">Next project</p>
              <h3 className="mt-3 text-3xl md:text-5xl font-semibold tracking-tight group-hover:text-pine transition-colors">
                {next.title}
              </h3>
              <p className="mt-2 text-sm text-muted">{next.category}</p>
            </div>
            <span className={`text-sm font-medium text-pine ${linkClass}`}>View project</span>
          </Link>
        </section>
      </main>

      <footer className="border-t border-line">
        <p className="mx-auto max-w-6xl px-5 md:px-8 py-8 text-sm text-muted">
          <Link href="/#contact" className={linkClass}>
            Get in touch
          </Link>
          <span className="mx-3">Basim Hussain, 2026</span>
        </p>
      </footer>

      {lightbox && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label={`${project.title} gallery`}
          onClick={close}
          className="fixed inset-0 z-50 flex flex-col bg-[#0b1011] text-ivory"
        >
          <div className="flex items-center justify-between px-5 md:px-8 h-14 shrink-0 text-ivory/80">
            <span className="text-sm tabular-nums">
              {String(lightbox.index + 1).padStart(2, "0")} / {String(lightbox.gallery.length).padStart(2, "0")}
            </span>
            <button
              ref={closeBtn}
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                close();
              }}
              className="text-sm px-3 py-1.5 border border-ivory/30 rounded hover:border-ivory transition-colors"
            >
              Close
            </button>
          </div>

          <div
            className="relative flex-1 min-h-0 flex items-center justify-center px-4 md:px-20 pb-4"
            onTouchStart={onTouchStart}
            onTouchMove={onTouchMove}
            onTouchEnd={onTouchEnd}
          >
            <button type="button" aria-label="Previous image" onClick={(e) => { e.stopPropagation(); prev(); }}
              className="absolute left-3 md:left-8 top-1/2 -translate-y-1/2 p-2 text-ivory/70 hover:text-ivory transition-colors z-10">
              <Chevron dir="left" />
            </button>
            <img
              ref={imgRef}
              src={lightbox.gallery[lightbox.index]}
              alt={`${project.title}, image ${lightbox.index + 1}`}
              onClick={(e) => e.stopPropagation()}
              draggable={false}
              className="max-h-[72vh] max-w-[80vw] object-contain shadow-2xl select-none rounded-sm"
            />
            <button type="button" aria-label="Next image" onClick={(e) => { e.stopPropagation(); nextImg(); }}
              className="absolute right-3 md:right-8 top-1/2 -translate-y-1/2 p-2 text-ivory/70 hover:text-ivory transition-colors z-10">
              <Chevron dir="right" />
            </button>
          </div>

          <div onClick={(e) => e.stopPropagation()} className="px-4 md:px-10 pb-6 md:pb-8 flex gap-2 md:gap-3 justify-center overflow-x-auto">
            {lightbox.gallery.map((img, i) => (
              <button
                key={img}
                ref={i === lightbox.index ? activeThumb : undefined}
                type="button"
                aria-label={`Go to image ${i + 1}`}
                onClick={() => setLightbox({ gallery: lightbox.gallery, index: i })}
                className={`shrink-0 overflow-hidden rounded-sm bg-night h-16 md:h-20 aspect-[4/3] transition-all ${
                  i === lightbox.index ? "ring-2 ring-brass opacity-100" : "opacity-50 hover:opacity-90"
                }`}
              >
                <img src={img} alt="" loading="lazy" decoding="async" className="h-full w-full object-cover" />
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export const getStaticPaths: GetStaticPaths = async () => ({
  paths: projects.map((p) => ({ params: { slug: p.slug } })),
  fallback: false,
});

export const getStaticProps: GetStaticProps<Props> = async ({ params }) => {
  const project = getProject(params!.slug as string)!;
  const i = projects.indexOf(project);
  const n = projects[(i + 1) % projects.length];
  return { props: { project, next: { slug: n.slug, title: n.title, category: n.category } } };
};

export default ProjectPage;
