import { useEffect, useRef, useState } from "react";
import { motion, useMotionValue, useReducedMotion, useScroll, useSpring, useTransform } from "framer-motion";
import { ArrowLeft } from "lucide-react";
const heroSrc = "/work/amc-estimator/01-hero-english.webp";

const EASE = [0.22, 1, 0.36, 1] as const;

const headlineLines = ["SYSTEMS THAT", "WORK.", "AI THAT", "SHIPS."];

const PortfolioHero = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const imgWrapRef = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();

  // Parallax on the image as you scroll
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });
  const yParallax = useTransform(scrollYProgress, [0, 1], ["0%", "18%"]);
  const scaleParallax = useTransform(scrollYProgress, [0, 1], [1, 1.08]);

  // Mouse-based tilt / depth
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const rx = useSpring(useTransform(my, [-0.5, 0.5], [4, -4]), { stiffness: 80, damping: 14 });
  const ry = useSpring(useTransform(mx, [-0.5, 0.5], [-4, 4]), { stiffness: 80, damping: 14 });
  const tx = useSpring(useTransform(mx, [-0.5, 0.5], [-12, 12]), { stiffness: 80, damping: 18 });
  const ty = useSpring(useTransform(my, [-0.5, 0.5], [-12, 12]), { stiffness: 80, damping: 18 });

  const [imgReady, setImgReady] = useState(false);
  const imgEl = useRef<HTMLImageElement>(null);

  // With server rendering the image can finish loading before React attaches
  // onLoad, which would leave it invisible. Check once on mount.
  useEffect(() => {
    if (imgEl.current?.complete) setImgReady(true);
  }, []);

  // Skip the tilt listener entirely under reduced motion rather than
  // computing spring values nothing will read.
  useEffect(() => {
    const el = imgWrapRef.current;
    if (!el || reduce) return;
    const onMove = (e: MouseEvent) => {
      const r = el.getBoundingClientRect();
      mx.set((e.clientX - r.left) / r.width - 0.5);
      my.set((e.clientY - r.top) / r.height - 0.5);
    };
    const onLeave = () => {
      mx.set(0);
      my.set(0);
    };
    el.addEventListener("mousemove", onMove);
    el.addEventListener("mouseleave", onLeave);
    return () => {
      el.removeEventListener("mousemove", onMove);
      el.removeEventListener("mouseleave", onLeave);
    };
  }, [mx, my, reduce]);

  return (
    <section
      ref={sectionRef}
      className="relative w-full overflow-hidden bg-background pt-28 md:pt-32"
    >
      <div className="container grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-stretch min-h-[88vh] lg:min-h-[92vh] pb-16 lg:pb-24">
        {/* Left column: copy */}
        <div className="lg:col-span-5 flex flex-col justify-center">
          {/* Eyebrow */}
          <motion.p
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: EASE, delay: 0.1 }}
            className="text-mustard text-[11px] tracking-luxury uppercase"
          >
            Selected Work
          </motion.p>

          {/* Headline */}
          <h1 className="mt-8 md:mt-10 font-display font-light uppercase text-soft-white leading-[0.92] tracking-[-0.02em] text-[14vw] sm:text-[12vw] lg:text-[6.6vw] xl:text-[6.2vw]">
            <span className="sr-only">Basim Hussain, AI engineer in Riyadh: </span>
            {headlineLines.map((line, i) => (
              <span key={i} className="block overflow-hidden">
                <motion.span
                  initial={{ y: "110%" }}
                  animate={{ y: "0%" }}
                  transition={{
                    duration: 1.1,
                    ease: EASE,
                    delay: 0.25 + i * 0.12,
                  }}
                  className="block will-change-transform"
                >
                  {line}
                </motion.span>
              </span>
            ))}
          </h1>

          {/* Paragraph */}
          <motion.p
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, ease: EASE, delay: 0.95 }}
            className="mt-10 md:mt-12 max-w-md text-soft-white/70 leading-relaxed text-sm md:text-base"
          >
            Voice agents, RAG systems, a fine-tuned Arabic model and the full-stack
            products around them. Built for companies in Saudi Arabia.
          </motion.p>

          {/* Back link */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: EASE, delay: 1.1 }}
            className="mt-10 md:mt-12"
          >
            <a
              href="/Basim_Hussain_CV.pdf"
              className="group inline-flex items-center gap-3 text-mustard text-[11px] tracking-luxury uppercase"
            >
              <ArrowLeft className="h-3.5 w-3.5 rotate-[135deg] transition-transform duration-500 group-hover:translate-y-1" />
              <span className="relative">
                Download CV
                <span className="absolute left-0 -bottom-1 h-px w-full bg-mustard origin-right scale-x-100 group-hover:origin-left group-hover:scale-x-100 transition-transform duration-500" />
              </span>
            </a>
          </motion.div>
        </div>

        {/* Right column: cinematic image */}
        <div className="lg:col-span-7 relative">
          <motion.div
            ref={imgWrapRef}
            style={{ rotateX: reduce ? 0 : rx, rotateY: reduce ? 0 : ry, transformPerspective: 1200 }}
            className="relative h-[60vh] sm:h-[70vh] lg:h-full w-full overflow-hidden [transform-style:preserve-3d]"
          >
            {/* Reveal mask */}
            <motion.div
              initial={{ scaleY: 1 }}
              animate={{ scaleY: 0 }}
              transition={{ duration: 1.4, ease: EASE, delay: 0.2 }}
              style={{ originY: 0 }}
              className="absolute inset-0 z-20 bg-background"
            />

            <motion.div
              style={{
                y: reduce ? "0%" : yParallax,
                scale: reduce ? 1 : scaleParallax,
                x: reduce ? 0 : tx,
                translateZ: 0,
              }}
              className="absolute inset-0 will-change-transform"
            >
              <motion.img
                ref={imgEl}
                src={heroSrc}
                alt="bocsmart.com, a bilingual corporate platform with a live maintenance estimator"
                onLoad={() => setImgReady(true)}
                initial={{ scale: 1.25, opacity: 0 }}
                animate={imgReady ? { scale: 1.02, opacity: 1 } : {}}
                transition={{ duration: 2.2, ease: EASE, delay: 0.3 }}
                style={{ y: reduce ? 0 : ty }}
                className="h-full w-full object-cover object-center select-none"
                draggable={false}
              />
              {/* subtle vignette for premium feel */}
              <div className="pointer-events-none absolute inset-0 bg-gradient-to-tr from-black/40 via-transparent to-black/10" />
              <div className="pointer-events-none absolute inset-0 ring-1 ring-inset ring-soft-white/5" />
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default PortfolioHero;
