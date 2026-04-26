import React, { useEffect, useState } from "react";
import { motion, useScroll, useSpring, useTransform } from "framer-motion";

interface Chapter {
  id: string;
  num: string;
  label: string;
}

const chapters: Chapter[] = [
  { id: "hero", num: "01", label: "Origin" },
  { id: "story", num: "02", label: "Story" },
  { id: "work", num: "03", label: "Trajectory" },
  { id: "projects", num: "04", label: "Projects" },
  { id: "stack", num: "05", label: "Stack" },
  { id: "contact", num: "06", label: "Invitation" },
];

const ScrollRail: React.FC = () => {
  const [active, setActive] = useState(0);
  const { scrollYProgress } = useScroll();
  const progress = useSpring(scrollYProgress, {
    stiffness: 90,
    damping: 24,
    mass: 0.4,
  });
  const railHeight = useTransform(progress, [0, 1], ["0%", "100%"]);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            const idx = chapters.findIndex((c) => c.id === e.target.id);
            if (idx !== -1) setActive(idx);
          }
        });
      },
      { rootMargin: "-40% 0px -50% 0px", threshold: 0 }
    );

    chapters.forEach((c) => {
      const el = document.getElementById(c.id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  return (
    <motion.aside
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.8, delay: 1.2 }}
      className="fixed right-5 top-1/2 -translate-y-1/2 z-40 hidden lg:flex flex-col items-center gap-1 select-none pointer-events-auto"
      aria-label="Page navigation"
    >
      {/* Background rail */}
      <div className="relative w-px h-[300px] bg-bone/10 my-3">
        <motion.div
          style={{ height: railHeight }}
          className="absolute top-0 left-0 w-full origin-top bg-gradient-to-b from-gold via-gold-soft to-transparent"
        />
      </div>

      <div className="absolute inset-0 flex flex-col justify-between items-center py-2">
        {chapters.map((c, i) => {
          const isActive = i === active;
          return (
            <a
              key={c.id}
              href={`#${c.id}`}
              data-cursor="link"
              data-cursor-label={c.label.toUpperCase()}
              className="group relative flex items-center justify-end h-6"
              aria-label={`Jump to ${c.label}`}
            >
              <motion.span
                animate={{
                  opacity: isActive ? 1 : 0,
                  x: isActive ? -16 : 0,
                }}
                transition={{ type: "spring", stiffness: 220, damping: 22 }}
                className="absolute right-6 text-[10px] font-mono tracking-widest text-gold whitespace-nowrap pointer-events-none"
              >
                <span className="text-bone/40 mr-2">{c.num}</span>
                {c.label.toUpperCase()}
              </motion.span>
              <motion.span
                animate={{
                  scale: isActive ? 1.5 : 1,
                  backgroundColor: isActive
                    ? "rgba(212,164,74,1)"
                    : "rgba(244,235,216,0.35)",
                  boxShadow: isActive
                    ? "0 0 14px rgba(212,164,74,0.7)"
                    : "0 0 0 rgba(0,0,0,0)",
                }}
                transition={{ type: "spring", stiffness: 220, damping: 22 }}
                className="block w-1.5 h-1.5 rounded-full group-hover:!scale-150"
              />
            </a>
          );
        })}
      </div>
    </motion.aside>
  );
};

export default ScrollRail;
