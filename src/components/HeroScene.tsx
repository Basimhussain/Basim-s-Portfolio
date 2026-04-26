import React, { useRef } from "react";
import {
  motion,
  useScroll,
  useTransform,
  useVelocity,
  useSpring,
} from "framer-motion";
import AnimatedHeading from "./AnimatedHeading";
import MagneticButton from "./MagneticButton";

const HeroScene: React.FC = () => {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  const titleY = useTransform(scrollYProgress, [0, 1], ["0%", "-30%"]);
  const titleOpacity = useTransform(scrollYProgress, [0, 0.6], [1, 0]);
  const haloScale = useTransform(scrollYProgress, [0, 1], [1, 1.4]);
  const haloOpacity = useTransform(scrollYProgress, [0, 0.7], [0.9, 0]);
  const arabicX = useTransform(scrollYProgress, [0, 1], ["0%", "20%"]);

  // Velocity-driven smear on the headline
  const velocity = useVelocity(scrollYProgress);
  const smoothVel = useSpring(velocity, {
    stiffness: 220,
    damping: 30,
  });
  const skew = useTransform(smoothVel, [-3, 0, 3], [-7, 0, 7]);
  const blur = useTransform(smoothVel, (v) => {
    const a = Math.min(8, Math.abs(v) * 2.5);
    return a > 0.4 ? `blur(${a}px)` : "blur(0px)";
  });

  return (
    <section
      ref={ref}
      id="hero"
      className="relative min-h-[110vh] flex items-center justify-center overflow-hidden surface-ink film-grain"
    >
      {/* Star field */}
      <div className="absolute inset-0 starfield opacity-90 pointer-events-none" />
      <div className="absolute inset-0 bg-grid-faint bg-grid-32 opacity-30 pointer-events-none" />

      {/* Gold halo */}
      <motion.div
        style={{ scale: haloScale, opacity: haloOpacity }}
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80vw] h-[80vw] max-w-[900px] max-h-[900px] rounded-full pointer-events-none"
      >
        <div className="w-full h-full rounded-full bg-radial-gold blur-3xl opacity-80" />
      </motion.div>

      {/* Floating arabic numerals — vision 2030 */}
      <motion.div
        style={{ x: arabicX }}
        className="absolute right-4 md:right-12 top-32 md:top-48 select-none pointer-events-none"
      >
        <div className="text-right">
          <div className="text-[10px] font-mono tracking-widest text-gold/60 mb-2">
            VISION
          </div>
          <div
            className="font-display text-[100px] md:text-[180px] leading-none text-bone/[0.08]"
            dir="rtl"
          >
            ٢٠٣٠
          </div>
          <div className="text-[10px] font-mono tracking-widest text-gold/60 mt-2">
            ALIGNED
          </div>
        </div>
      </motion.div>

      {/* Bottom-left coordinates */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.6, duration: 0.8 }}
        className="absolute bottom-8 left-4 md:left-12 z-10 hidden sm:block"
      >
        <div className="text-[10px] font-mono tracking-widest text-bone/50 leading-relaxed">
          <div>24°43'27"N</div>
          <div>46°41'06"E</div>
          <div className="text-gold/60 mt-1">RIYADH · KSA</div>
        </div>
      </motion.div>

      {/* Bottom-right scroll cue */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.8, duration: 0.8 }}
        className="absolute bottom-8 right-4 md:right-12 z-10 hidden sm:flex items-center gap-3"
      >
        <span className="text-[10px] font-mono tracking-widest text-bone/50">
          SCROLL TO BEGIN
        </span>
        <motion.span
          animate={{ y: [0, 6, 0] }}
          transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut" }}
          className="w-px h-10 bg-gradient-to-b from-gold/80 to-transparent"
        />
      </motion.div>

      {/* Main content */}
      <motion.div
        style={{ y: titleY, opacity: titleOpacity }}
        className="relative z-10 max-w-6xl px-6 text-center"
      >
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="inline-flex items-center gap-2.5 mb-10 px-5 py-2 rounded-full border border-bone/15 bg-bone/[0.03]"
        >
          <span className="ticker-dot animate-shimmer" />
          <span className="text-[13px] font-mono tracking-widest text-bone/80">
            FOUNDING AI ENGINEER · AGENT MAVEN
          </span>
        </motion.div>

        <motion.h1
          style={{ skewX: skew, filter: blur }}
          className="font-display leading-[0.95] tracking-tight text-bone will-change-transform"
        >
          <AnimatedHeading
            as="p"
            text="Basim Hussain."
            className="block text-[clamp(3.5rem,10vw,9rem)] pb-1"
            stagger={0.06}
            delay={0.3}
          />
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.9, ease: [0.22, 1, 0.36, 1] }}
            className="block text-[clamp(2.75rem,7.5vw,6.5rem)] italic-serif text-gradient-gold leading-[1.05] pb-2"
          >
            AI Software Engineer
          </motion.p>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 1.2, ease: [0.22, 1, 0.36, 1] }}
          className="mt-6 max-w-3xl mx-auto text-lg md:text-2xl text-bone/75 leading-relaxed"
        >
          I build the systems behind Arabic-first products. RAG, voice agents,
          fine-tuned LLMs, and bilingual{" "}
          <span className="italic-serif text-gold-soft">(AR / EN)</span> SaaS.
          Right now I&apos;m founding AI at Agent Maven. Before that, Tamkeen,
          Basmat Alomran, and Reshantech.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.5 }}
          className="mt-10 flex flex-wrap justify-center gap-4"
        >
          <MagneticButton href="#work" variant="primary">
            <span>Read the story</span>
            <span aria-hidden>→</span>
          </MagneticButton>
          <MagneticButton href="#contact" variant="ghost">
            <span>Get in touch</span>
          </MagneticButton>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 2 }}
          className="mt-20 flex flex-wrap justify-center gap-x-10 gap-y-3 text-sm font-mono tracking-widest text-bone/50"
        >
          {[
            "RAG · pgvector",
            "QLoRA · LoRA",
            "Voice AI · Vapi",
            "RAGAS · Langfuse",
            "Arabic NLP",
            "React 19 · Vue · Next",
          ].map((s) => (
            <span key={s}>{s}</span>
          ))}
        </motion.div>
      </motion.div>
    </section>
  );
};

export default HeroScene;
