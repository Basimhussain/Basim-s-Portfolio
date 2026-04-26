import React, { useState, useEffect } from "react";
import { motion, useScroll, useSpring } from "framer-motion";

const Navigation: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  const { scrollYProgress } = useScroll();
  const progress = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    mass: 0.4,
  });

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const navItems = [
    { name: "01", label: "Origin", href: "#hero" },
    { name: "02", label: "Story", href: "#story" },
    { name: "03", label: "Work", href: "#work" },
    { name: "04", label: "Projects", href: "#projects" },
    { name: "05", label: "Stack", href: "#stack" },
    { name: "06", label: "Contact", href: "#contact" },
  ];

  return (
    <>
      <motion.div
        style={{ scaleX: progress }}
        className="fixed top-0 left-0 right-0 h-[2px] origin-left bg-gradient-to-r from-gold via-gold-soft to-sand z-[60]"
      />
      <motion.nav
        initial={{ y: -40, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1], delay: 0.4 }}
        className={`fixed top-3 left-3 right-3 z-50 transition-all duration-500 ${
          scrolled ? "" : ""
        }`}
      >
        <div
          className={`mx-auto max-w-6xl rounded-full transition-all duration-500 ${
            scrolled
              ? "glass-strong px-4 py-2.5"
              : "bg-transparent px-4 py-3 border border-transparent"
          }`}
        >
          <div className="flex items-center justify-between">
            <a
              href="#hero"
              className="flex items-center gap-3 text-bone group"
            >
              <span className="relative inline-flex items-center justify-center w-10 h-10 rounded-full border border-gold/40 text-gold text-sm font-mono group-hover:bg-gold/10 transition-colors">
                BH
                <span className="absolute -inset-1 rounded-full border border-gold/20 animate-spin-slow" />
              </span>
              <span className="hidden sm:flex flex-col leading-tight">
                <span className="text-[14px] font-mono tracking-widest text-bone/80">
                  BASIM HUSSAIN
                </span>
                <span className="text-[11px] tracking-widest text-gold/80 mt-0.5">
                  AI · ENGINEER · RIYADH
                </span>
              </span>
            </a>

            <div className="hidden md:flex items-center gap-7">
              {navItems.map((item) => (
                <a
                  key={item.name}
                  href={item.href}
                  className="group flex items-baseline gap-2 text-bone/75 hover:text-bone transition-colors duration-300"
                >
                  <span className="text-[12px] font-mono text-gold/70 group-hover:text-gold transition-colors">
                    {item.name}
                  </span>
                  <span className="text-base tracking-wide link-underline">
                    {item.label}
                  </span>
                </a>
              ))}
            </div>

            <div className="hidden md:flex items-center gap-2.5">
              <span className="ticker-dot animate-shimmer" />
              <span className="text-[12px] font-mono tracking-widest text-bone/75">
                AVAILABLE FOR WORK
              </span>
            </div>

            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="md:hidden relative w-9 h-9 flex items-center justify-center"
              aria-label="Toggle menu"
            >
              <span
                className={`absolute h-px w-5 bg-bone transform transition-all duration-300 ${
                  isMenuOpen ? "rotate-45" : "-translate-y-1"
                }`}
              />
              <span
                className={`absolute h-px w-5 bg-bone transform transition-all duration-300 ${
                  isMenuOpen ? "-rotate-45" : "translate-y-1"
                }`}
              />
            </button>
          </div>

          <div
            className={`md:hidden overflow-hidden transition-all duration-500 ${
              isMenuOpen ? "max-h-96 mt-4" : "max-h-0"
            }`}
          >
            <div className="space-y-1 pb-3">
              {navItems.map((item) => (
                <a
                  key={item.name}
                  href={item.href}
                  onClick={() => setIsMenuOpen(false)}
                  className="flex items-baseline gap-3 py-2 px-3 text-bone/80 hover:text-gold hover:bg-bone/5 rounded-lg transition-all"
                >
                  <span className="text-[10px] font-mono text-gold/70">
                    {item.name}
                  </span>
                  <span className="text-base">{item.label}</span>
                </a>
              ))}
            </div>
          </div>
        </div>
      </motion.nav>
    </>
  );
};

export default Navigation;
