import { useCallback, useEffect, useRef, useState } from "react";
import Head from "next/head";
import type { GetStaticPaths, GetStaticProps } from "next";
import { Link } from "@/lib/router";
import { ChevronLeft, ChevronRight, X } from "lucide-react";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import ThumbnailSlider from "@/components/ThumbnailSlider";
import SmoothScroll from "@/components/SmoothScroll";
import { useReveal } from "@/hooks/useReveal";
import { useInView, LineReveal } from "@/components/LineReveal";
import { projects, getProject, Project } from "@/data/projects";

const HeroIntro = ({
  category,
  title,
  tagline,
}: {
  category: string;
  title: string;
  tagline?: string;
}) => {
  const v = useInView<HTMLDivElement>(0.2);
  return (
    <div ref={v.ref} className="absolute inset-x-0 bottom-0 container pb-16 md:pb-24">
      <p className="text-mustard text-[11px] tracking-luxury uppercase">
        <LineReveal text={category} inView={v.inView} duration={0.8} />
      </p>
      <h1 className="mt-4 font-display text-4xl md:text-7xl font-light leading-tight max-w-4xl">
        <LineReveal text={title} inView={v.inView} baseDelay={0.15} step={0.1} duration={1} />
      </h1>
      {tagline && (
        <p className="mt-4 max-w-xl text-sm font-light leading-relaxed text-soft-white/75 md:text-[15px]">
          <LineReveal text={tagline} inView={v.inView} baseDelay={0.3} duration={0.9} />
        </p>
      )}
    </div>
  );
};

const DescriptionBlock = ({ description }: { description: string }) => {
  const v = useInView<HTMLHeadingElement>(0.2);
  return (
    <h2 ref={v.ref} className="font-display text-2xl md:text-4xl font-light leading-snug">
      <LineReveal text={description} inView={v.inView} step={0.09} duration={0.95} />
    </h2>
  );
};

const SectionHead = ({ eyebrow, title }: { eyebrow?: string; title: string }) => {
  const v = useInView<HTMLDivElement>(0.25);
  return (
    <div ref={v.ref}>
      {eyebrow && <p className="text-mustard text-[11px] tracking-luxury uppercase">{eyebrow}</p>}
      <h2 className="mt-5 font-display text-3xl md:text-5xl font-light leading-[1.05] max-w-2xl">
        <LineReveal text={title} inView={v.inView} duration={1} />
      </h2>
    </div>
  );
};

/** Process and challenge blocks. Every block is optional. */
const ProjectBody = ({ project }: { project: Project }) => {
  const { process, challenges } = project;
  if (!process?.length && !challenges?.length) return null;

  return (
    <div className="container pb-20 md:pb-28 space-y-20 md:space-y-28">
      {process && process.length > 0 && (
        <section className="border-t border-border pt-16 md:pt-20">
          <SectionHead title="How It Works" />
          <ol className="mt-12 md:mt-16 grid gap-10 md:gap-y-14 sm:grid-cols-2 lg:grid-cols-4">
            {process.map((step, i) => (
              <li key={step.title} className="reveal max-w-md">
                <p className="font-display text-mustard text-2xl font-light leading-none">
                  {String(i + 1).padStart(2, "0")}
                </p>
                <h3 className="mt-4 font-display text-xl font-light text-soft-white">{step.title}</h3>
                <p className="mt-3 text-soft-white/70 font-light leading-relaxed">{step.text}</p>
              </li>
            ))}
          </ol>
        </section>
      )}

      {challenges && challenges.length > 0 && (
        <section>
          <SectionHead title="Challenges & Solutions" />
          <ul className="mt-12 md:mt-16 grid gap-10 md:gap-12 md:grid-cols-2">
            {challenges.map((c) => (
              <li
                key={c.challenge}
                className="reveal rounded-xl border border-soft-white/10 bg-soft-white/[0.02] p-6 md:p-8"
              >
                <p className="text-soft-white/70 font-light leading-relaxed">{c.challenge}</p>
                <p className="mt-6 text-[11px] tracking-luxury uppercase text-mustard">Solution</p>
                <p className="mt-3 text-soft-white/70 font-light leading-relaxed">{c.solution}</p>
              </li>
            ))}
          </ul>
        </section>
      )}
    </div>
  );
};

type FloorGalleryProps = {
  title: string;
  gallery: string[];
  projectTitle: string;
  activeIndex: number;
  onSelect: (i: number) => void;
  onZoom: (i: number) => void;
};

const FloorGallery = ({
  title,
  gallery,
  projectTitle,
  activeIndex,
  onSelect,
  onZoom,
}: FloorGalleryProps) => {
  const activeImage = gallery[activeIndex] ?? gallery[0];
  const head = useInView<HTMLDivElement>(0.25);
  return (
    <div ref={head.ref}>
      <div className="mb-6 md:mb-8 group/heading inline-block cursor-default">
        <h2 className="font-display text-3xl md:text-5xl font-light text-mustard inline-block transition-transform duration-500 group-hover/heading:translate-x-2">
          <LineReveal text={title} inView={head.inView} duration={1} />
        </h2>
        <div className="mt-3 h-px w-24 bg-mustard transition-all duration-500 group-hover/heading:w-full" />
      </div>
      <button
        type="button"
        onClick={() => onZoom(activeIndex)}
        className="block w-full overflow-hidden bg-secondary group cursor-zoom-in aspect-[16/10]"
      >
        <img
          src={activeImage}
          alt={`${projectTitle} ${title} featured view`}
          className="h-full w-full object-cover transition-transform duration-[1400ms] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.02]"
        />
      </button>

      <ThumbnailSlider
        gallery={gallery}
        title={`${projectTitle} ${title}`}
        activeIndex={activeIndex}
        onSelect={onSelect}
        onZoom={onZoom}
      />
    </div>
  );
};

/** Silent walkthrough. Plays when it scrolls into view, with controls for anyone who wants them. */
const WalkthroughVideo = ({ video }: { video: Project["videos"][number] }) => {
  const head = useInView<HTMLDivElement>(0.25);
  const ref = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
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
    <div ref={head.ref}>
      <div className="mb-6 md:mb-8 group/heading inline-block cursor-default">
        <h2 className="font-display text-3xl md:text-5xl font-light text-mustard inline-block">
          <LineReveal text={video.title} inView={head.inView} duration={1} />
        </h2>
        <div className="mt-3 h-px w-24 bg-mustard transition-all duration-500 group-hover/heading:w-full" />
      </div>
      <div className="relative overflow-hidden bg-secondary aspect-[16/10]">
        <video
          ref={ref}
          src={video.src}
          poster={video.poster}
          muted
          loop
          playsInline
          controls
          preload="none"
          className="h-full w-full object-cover"
          aria-label={video.title}
        />
      </div>
      {video.caption && (
        <p className="mt-4 text-sm font-light text-soft-white/60 max-w-xl">{video.caption}</p>
      )}
    </div>
  );
};

interface Props {
  project: Project;
  next: { slug: string; title: string; category: string };
}

const ProjectDetail = ({ project, next }: Props) => {
  useReveal();

  // Stage images (16:10 compositions) and overview diagrams are separate galleries.
  const stage = project.items.filter((i) => !i.illustration && !i.phone && !i.tall).map((i) => i.src);
  const overview = project.items.filter((i) => i.illustration).map((i) => i.src);
  const sections = [
    ...(stage.length ? [{ title: "Screens", gallery: stage }] : []),
    ...(overview.length ? [{ title: "Overview", gallery: overview }] : []),
  ];

  const [activeIndices, setActiveIndices] = useState<number[]>(() => sections.map(() => 0));
  const [lightbox, setLightbox] = useState<{ gallery: string[]; index: number } | null>(null);

  const closeLightbox = useCallback(() => setLightbox(null), []);
  const prev = useCallback(
    () =>
      setLightbox((lb) =>
        lb ? { ...lb, index: (lb.index - 1 + lb.gallery.length) % lb.gallery.length } : lb
      ),
    []
  );
  const nextImg = useCallback(
    () => setLightbox((lb) => (lb ? { ...lb, index: (lb.index + 1) % lb.gallery.length } : lb)),
    []
  );

  useEffect(() => {
    if (!lightbox) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeLightbox();
      if (e.key === "ArrowLeft") prev();
      if (e.key === "ArrowRight") nextImg();
    };
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [lightbox, closeLightbox, prev, nextImg]);

  // Swipe support (mobile/tablet) for the lightbox image
  const imgRef = useRef<HTMLImageElement>(null);
  const activeThumbRef = useRef<HTMLButtonElement>(null);
  const touchStartX = useRef<number | null>(null);
  const touchStartY = useRef<number | null>(null);
  const touchDx = useRef(0);
  const isHorizontalSwipe = useRef(false);

  const onTouchStart = (e: React.TouchEvent) => {
    const t = e.touches[0];
    touchStartX.current = t.clientX;
    touchStartY.current = t.clientY;
    touchDx.current = 0;
    isHorizontalSwipe.current = false;
    if (imgRef.current) imgRef.current.style.transition = "none";
  };
  const onTouchMove = (e: React.TouchEvent) => {
    if (touchStartX.current == null || touchStartY.current == null) return;
    const t = e.touches[0];
    const dx = t.clientX - touchStartX.current;
    const dy = t.clientY - touchStartY.current;
    if (!isHorizontalSwipe.current && Math.abs(dx) > Math.abs(dy) && Math.abs(dx) > 8) {
      isHorizontalSwipe.current = true;
    }
    if (isHorizontalSwipe.current) {
      touchDx.current = dx;
      if (imgRef.current) imgRef.current.style.transform = `translateX(${dx}px)`;
    }
  };
  const onTouchEnd = () => {
    const dx = touchDx.current;
    touchStartX.current = null;
    touchStartY.current = null;
    if (imgRef.current) {
      imgRef.current.style.transition = "transform 300ms cubic-bezier(0.22,1,0.36,1)";
      imgRef.current.style.transform = "translateX(0)";
    }
    if (!isHorizontalSwipe.current) return;
    const threshold = 50;
    if (dx <= -threshold) nextImg();
    else if (dx >= threshold) prev();
  };

  useEffect(() => {
    if (!lightbox) return;
    activeThumbRef.current?.scrollIntoView({ behavior: "smooth", inline: "center", block: "nearest" });
  }, [lightbox?.index, lightbox]);

  return (
    <main className="bg-background text-foreground">
      <Head>
        <title>{`${project.title} | Basim Hussain`}</title>
        <meta name="description" content={project.description} />
        <meta property="og:title" content={`${project.title} | Basim Hussain`} />
        <meta property="og:description" content={project.description} />
        <meta property="og:image" content={project.img} />
      </Head>
      <SmoothScroll />
      <Nav />

      {/* Full-bleed hero */}
      <section className="relative h-[100svh] w-full overflow-hidden">
        <img src={project.hero} alt={project.title} className="absolute inset-0 h-full w-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-b from-background/50 via-background/10 to-background" />
        <HeroIntro category={project.category} title={project.title} tagline={project.description} />
      </section>

      {/* Meta */}
      <section className="container py-20 md:py-28 grid grid-cols-1 md:grid-cols-12 gap-10">
        <div className="reveal md:col-span-4 space-y-8 text-[11px] tracking-luxury uppercase">
          {([
            ["Where", project.location],
            ["Year", project.year ?? ""],
            ["Built with", project.scope],
          ] as const)
            .filter(([, value]) => value)
            .map(([label, value]) => (
              <div key={label}>
                <p className="text-soft-white/55">{label}</p>
                <p className="mt-2 text-soft-white leading-relaxed">{value}</p>
              </div>
            ))}
          {project.links.map((l) => (
            <div key={l.href}>
              <a
                href={l.href}
                target="_blank"
                rel="noreferrer"
                className="hover-underline text-mustard"
              >
                {l.label}
              </a>
            </div>
          ))}
        </div>
        <div className="reveal md:col-span-8">
          <DescriptionBlock description={project.lead} />
          {project.intro && (
            <div className="mt-8">
              <p className="max-w-2xl text-soft-white/70 font-light leading-relaxed">{project.intro}</p>
            </div>
          )}
          {project.details.length > 0 && (
            <>
              <div className="mt-10 h-px w-16 bg-mustard" />
              <ul className="mt-10 space-y-5 text-soft-white/75 leading-relaxed">
                {project.details.map((d) => (
                  <li key={d} className="flex gap-4">
                    <span className="text-mustard mt-2 h-px w-6 bg-mustard shrink-0" />
                    <span>{d}</span>
                  </li>
                ))}
              </ul>
            </>
          )}
        </div>
      </section>

      {project.facts.length > 0 && (
        <section className="container pb-20 md:pb-28">
          <dl className="reveal grid divide-y divide-border border-y border-border sm:grid-cols-3 sm:divide-x sm:divide-y-0">
            {project.facts.map((f) => (
              <div key={f.label} className="px-4 py-8 text-center md:py-10">
                <dt className="sr-only">{f.label}</dt>
                <dd>
                  <span className="block font-display text-2xl font-light text-soft-white md:text-3xl">
                    {f.value}
                  </span>
                  <span className="mt-3 block text-[11px] tracking-luxury uppercase text-soft-white/55">
                    {f.label}
                  </span>
                </dd>
              </div>
            ))}
          </dl>
        </section>
      )}

      <ProjectBody project={project} />

      {project.videos.length > 0 && (
        <section className="container pb-16 md:pb-24 space-y-12">
          {project.videos.map((v) => (
            <WalkthroughVideo key={v.src} video={v} />
          ))}
        </section>
      )}

      {sections.map((section, idx) => (
        <section
          key={`${section.title}-${idx}`}
          className={idx === sections.length - 1 ? "container pb-24 md:pb-36" : "container pb-16 md:pb-24"}
        >
          <FloorGallery
            title={section.title}
            gallery={section.gallery}
            projectTitle={project.title}
            activeIndex={activeIndices[idx] ?? 0}
            onSelect={(i) =>
              setActiveIndices((prevIdx) => {
                const n = [...prevIdx];
                n[idx] = i;
                return n;
              })
            }
            onZoom={(i) => setLightbox({ gallery: section.gallery, index: i })}
          />
        </section>
      ))}

      {lightbox && (
        <div
          role="dialog"
          aria-modal="true"
          onClick={closeLightbox}
          className="fixed inset-0 z-[100] bg-background/97 backdrop-blur-md flex flex-col animate-in fade-in duration-300"
        >
          <div className="flex items-center justify-between px-6 md:px-10 py-5 text-soft-white/80">
            <span className="text-[12px] tracking-luxury">
              {String(lightbox.index + 1).padStart(2, "0")} / {String(lightbox.gallery.length).padStart(2, "0")}
            </span>
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                closeLightbox();
              }}
              aria-label="Close"
              className="hover:text-mustard transition-colors"
            >
              <X className="h-6 w-6" />
            </button>
          </div>

          <div
            className="flex-1 flex items-center justify-center px-4 md:px-20 pb-4 relative min-h-0"
            onTouchStart={onTouchStart}
            onTouchMove={onTouchMove}
            onTouchEnd={onTouchEnd}
          >
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                prev();
              }}
              aria-label="Previous image"
              className="absolute left-3 md:left-8 top-1/2 -translate-y-1/2 text-soft-white/70 hover:text-mustard transition-colors p-2 z-10"
            >
              <ChevronLeft className="h-8 w-8 md:h-10 md:w-10" />
            </button>

            <img
              ref={imgRef}
              src={lightbox.gallery[lightbox.index]}
              alt={`${project.title} ${lightbox.index + 1}`}
              onClick={(e) => e.stopPropagation()}
              draggable={false}
              className="max-h-[72vh] max-w-[80vw] object-contain shadow-2xl select-none will-change-transform"
            />

            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                nextImg();
              }}
              aria-label="Next image"
              className="absolute right-3 md:right-8 top-1/2 -translate-y-1/2 text-soft-white/70 hover:text-mustard transition-colors p-2 z-10"
            >
              <ChevronRight className="h-8 w-8 md:h-10 md:w-10" />
            </button>
          </div>

          <div
            onClick={(e) => e.stopPropagation()}
            className="px-4 md:px-10 pb-6 md:pb-8 flex gap-2 md:gap-3 justify-center overflow-x-auto"
          >
            {lightbox.gallery.map((img, i) => (
              <button
                key={i}
                ref={i === lightbox.index ? activeThumbRef : undefined}
                type="button"
                onClick={() => setLightbox({ gallery: lightbox.gallery, index: i })}
                aria-label={`Go to image ${i + 1}`}
                className={`shrink-0 overflow-hidden bg-secondary h-16 md:h-20 aspect-[4/3] transition-all ${
                  i === lightbox.index ? "ring-2 ring-mustard opacity-100" : "opacity-50 hover:opacity-90"
                }`}
              >
                <img src={img} alt="" loading="lazy" decoding="async" className="h-full w-full object-cover" />
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Next project */}
      <section className="border-t border-border">
        <Link
          to={`/work/${next.slug}`}
          className="container py-20 md:py-28 flex flex-col md:flex-row md:items-end justify-between gap-8 group"
        >
          <div>
            <p className="text-[11px] tracking-luxury uppercase text-soft-white/55">Next Project</p>
            <h3 className="mt-4 font-display text-3xl md:text-5xl font-light group-hover:text-mustard transition-colors">
              {next.title}
            </h3>
            <p className="mt-2 text-[11px] tracking-luxury uppercase text-soft-white/55">{next.category}</p>
          </div>
          <span className="text-[11px] tracking-luxury uppercase text-mustard hover-underline">
            View Project →
          </span>
        </Link>
      </section>

      <Footer />
    </main>
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
  return {
    props: {
      project,
      next: { slug: n.slug, title: n.title, category: n.category },
    },
  };
};

export default ProjectDetail;
