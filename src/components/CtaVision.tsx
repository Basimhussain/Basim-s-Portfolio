import { ArrowUpRight } from "lucide-react";
import { Link } from "@/lib/router";
import { useInView, LineReveal } from "./LineReveal";
import { SectionGlow } from "./SectionGlow";
const ctaInterior = "/work/scentwell/01-app.webp";

const CtaVision = () => {
  const v = useInView<HTMLDivElement>(0.2);

  return (
    <section className="relative container py-24 md:py-32">
      <SectionGlow at="30% 50%" />
      <div
        ref={v.ref}
        className="glow-card group relative overflow-hidden rounded-2xl border border-soft-white/10 bg-gradient-to-br from-soft-white/[0.05] to-soft-white/[0.01] backdrop-blur-xl transition-all duration-700 hover:border-mustard/30 hover:shadow-[0_0_90px_-20px_hsl(var(--mustard)/0.45)]"
        style={{
          opacity: v.inView ? 1 : 0,
          transform: v.inView ? "translateY(0)" : "translateY(40px)",
          filter: v.inView ? "blur(0)" : "blur(8px)",
          transition:
            "opacity 1s cubic-bezier(0.22,1,0.36,1), transform 1s cubic-bezier(0.22,1,0.36,1), filter 1s cubic-bezier(0.22,1,0.36,1), border-color 0.6s, box-shadow 0.6s",
        }}
      >
        {/* Background image (right side) */}
        <div className="absolute inset-0">
          <img
            src={ctaInterior}
            alt="ScentWell app screens on a dark stage"
            loading="lazy"
            width={1920}
            height={1080}
            className="absolute inset-0 h-full w-full object-cover opacity-90"
          />
          {/* Left fade so text remains readable */}
          <div className="absolute inset-0 bg-gradient-to-r from-background via-background/85 to-background/10" />
          <div className="absolute inset-0 bg-gradient-to-t from-background/60 via-transparent to-background/30" />
        </div>

        {/* Top hairline */}
        <div className="pointer-events-none absolute -top-px left-10 right-10 h-px bg-gradient-to-r from-transparent via-soft-white/30 to-transparent" />
        {/* Ambient hover glow */}
        <div className="pointer-events-none absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 bg-[radial-gradient(circle_at_20%_50%,hsl(var(--mustard)/0.08),transparent_60%)]" />

        <div className="relative grid grid-cols-1 md:grid-cols-2">
          <div className="px-8 md:px-14 lg:px-16 py-16 md:py-20 lg:py-24 max-w-xl">
            <h2 className="font-display text-3xl md:text-5xl lg:text-[3.4rem] font-light leading-[1.05] text-soft-white">
              <LineReveal text="Have a Product" inView={v.inView} baseDelay={0.15} duration={1} />
              <LineReveal text="to Get Built?" inView={v.inView} baseDelay={0.3} duration={1} />
            </h2>

            <p className="mt-6 text-soft-white/70 text-sm md:text-base font-light leading-relaxed">
              <LineReveal
                text="Tell me what you need and I will reply with a plan."
                inView={v.inView}
                baseDelay={0.55}
                duration={0.9}
              />
            </p>

            <div
              className="mt-10"
              style={{
                opacity: v.inView ? 1 : 0,
                transform: v.inView ? "translateY(0)" : "translateY(16px)",
                transition:
                  "opacity 0.9s cubic-bezier(0.22,1,0.36,1) 0.75s, transform 0.9s cubic-bezier(0.22,1,0.36,1) 0.75s",
              }}
            >
              <Link
                to="/#contact"
                className="group/btn relative inline-flex items-center gap-3 overflow-hidden rounded-full border border-mustard/50 bg-mustard/[0.04] backdrop-blur-md px-7 py-4 text-mustard text-[11px] tracking-luxury font-body transition-all duration-500 hover:border-mustard hover:bg-mustard/[0.1] hover:-translate-y-0.5 hover:shadow-[0_0_40px_-8px_hsl(var(--mustard)/0.6)]"
              >
                <span className="absolute -top-px left-6 right-6 h-px bg-gradient-to-r from-transparent via-mustard/60 to-transparent opacity-0 group-hover/btn:opacity-100 transition-opacity duration-500" />
                GET IN TOUCH
                <ArrowUpRight className="h-3.5 w-3.5 transition-transform duration-500 group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5" strokeWidth={1.5} />
              </Link>
            </div>
          </div>

          {/* Spacer column so the right side stays image */}
          <div aria-hidden className="hidden md:block" />
        </div>
      </div>
    </section>
  );
};

export default CtaVision;
