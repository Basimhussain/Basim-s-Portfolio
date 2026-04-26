import React, { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

export interface ShowcaseProject {
  index: string;
  title: string;
  subtitle: string;
  body: string;
  bullets: string[];
  tags: string[];
  href?: string;
  glyph: string;
  accent: string;
  metric?: { value: string; label: string };
}

interface ProjectShowcaseProps {
  projects: ShowcaseProject[];
}

const ProjectShowcase: React.FC<ProjectShowcaseProps> = ({ projects }) => {
  return (
    <div className="space-y-24 md:space-y-40">
      {projects.map((p, i) => (
        <ProjectRow key={p.title} project={p} reverse={i % 2 === 1} />
      ))}
    </div>
  );
};

const ProjectRow: React.FC<{ project: ShowcaseProject; reverse: boolean }> = ({
  project,
  reverse,
}) => {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], [80, -80]);
  const rotate = useTransform(scrollYProgress, [0, 1], [-2, 2]);
  const glyphY = useTransform(scrollYProgress, [0, 1], ["20%", "-30%"]);
  const opacity = useTransform(
    scrollYProgress,
    [0, 0.25, 0.75, 1],
    [0.2, 1, 1, 0.2]
  );

  return (
    <motion.div
      ref={ref}
      style={{ opacity }}
      className={`grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center ${
        reverse ? "lg:[direction:rtl]" : ""
      }`}
    >
      {/* Visual side */}
      <motion.div
        style={{ y, rotate }}
        className="lg:col-span-6 [direction:ltr]"
      >
        <div
          className="relative aspect-[4/5] md:aspect-[5/6] rounded-[28px] overflow-hidden border border-bone/10"
          style={{
            background: `linear-gradient(135deg, ${project.accent}25 0%, #0d0d18 60%)`,
          }}
        >
          <div className="absolute inset-0 bg-grid-faint bg-grid-32 opacity-40" />
          <div className="absolute inset-0 starfield opacity-40" />

          {/* Big glyph */}
          <motion.div
            style={{ y: glyphY }}
            className="absolute inset-0 flex items-center justify-center"
          >
            <div
              className="font-display text-[28vw] lg:text-[16vw] leading-none select-none"
              style={{ color: `${project.accent}30` }}
            >
              {project.glyph}
            </div>
          </motion.div>

          {/* Index */}
          <div className="absolute top-6 left-6 right-6 flex items-center justify-between">
            <span className="text-[10px] font-mono tracking-widest text-bone/50">
              PROJECT · {project.index}
            </span>
            <span
              className="text-[10px] font-mono tracking-widest"
              style={{ color: project.accent }}
            >
              {project.tags[0]}
            </span>
          </div>

          {/* Metric */}
          {project.metric && (
            <div className="absolute bottom-6 left-6 right-6 flex items-end justify-between gap-4">
              <div className="glass rounded-xl px-4 py-3 max-w-[80%]">
                <div
                  className="font-display text-3xl md:text-5xl"
                  style={{ color: project.accent }}
                >
                  {project.metric.value}
                </div>
                <div className="text-[10px] font-mono tracking-widest text-bone/60 mt-1">
                  {project.metric.label}
                </div>
              </div>
            </div>
          )}

          {/* Halo */}
          <div
            className="absolute -bottom-32 -right-32 w-96 h-96 rounded-full blur-3xl opacity-30"
            style={{ background: project.accent }}
          />
        </div>
      </motion.div>

      {/* Text side */}
      <div className="lg:col-span-6 [direction:ltr]">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-15%" }}
          transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
        >
          <div className="flex items-center gap-3 mb-5">
            <span
              className="section-number"
              style={{ color: project.accent }}
            >
              {project.index}
            </span>
            <span className="hairline w-12" />
            <span className="text-[10px] font-mono tracking-widest text-bone/50 uppercase">
              {project.subtitle}
            </span>
          </div>

          <h3 className="font-display text-3xl md:text-5xl leading-[1.05] tracking-tight text-bone mb-6">
            {project.title}
          </h3>

          <p className="text-bone/70 text-base md:text-lg leading-relaxed mb-6 max-w-xl">
            {project.body}
          </p>

          <ul className="space-y-2.5 mb-8 max-w-xl">
            {project.bullets.map((b, i) => (
              <li
                key={i}
                className="flex items-start gap-3 text-bone/60 text-sm leading-relaxed"
              >
                <span
                  className="mt-1.5 shrink-0 text-[10px]"
                  style={{ color: project.accent }}
                >
                  ▸
                </span>
                <span>{b}</span>
              </li>
            ))}
          </ul>

          <div className="flex flex-wrap gap-2 mb-6">
            {project.tags.map((t) => (
              <span
                key={t}
                className="text-[10px] font-mono tracking-widest px-2.5 py-1 rounded-full bg-bone/[0.04] text-bone/55 border border-bone/10"
              >
                {t}
              </span>
            ))}
          </div>

          {project.href && (
            <a
              href={project.href}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-bone hover:text-gold-soft text-sm tracking-wide group"
            >
              <span className="link-underline">Visit project</span>
              <span className="transition-transform group-hover:translate-x-1">
                ↗
              </span>
            </a>
          )}
        </motion.div>
      </div>
    </motion.div>
  );
};

export default ProjectShowcase;
