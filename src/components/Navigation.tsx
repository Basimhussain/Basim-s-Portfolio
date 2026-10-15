import React, { useEffect, useRef, useState } from "react";
import Link from "next/link";

const homeLinks = [
  { name: "Work", href: "#work", id: "work", hideOnMobile: false },
  { name: "Experience", href: "#experience", id: "experience", hideOnMobile: true },
  { name: "Tools", href: "#tools", id: "tools", hideOnMobile: true },
  { name: "Contact", href: "#contact", id: "contact", hideOnMobile: false },
];

const subLinks = [
  { name: "All work", href: "/#work", id: "work", hideOnMobile: false },
  { name: "Contact", href: "/#contact", id: "contact", hideOnMobile: false },
];

const Navigation = ({ variant = "home" }: { variant?: "home" | "sub" }) => {
  const links = variant === "home" ? homeLinks : subLinks;
  const [active, setActive] = useState("");
  const [scrolled, setScrolled] = useState(false);
  const bar = useRef<HTMLDivElement>(null);

  // Progress hairline and header border share one scroll listener.
  useEffect(() => {
    let frame = 0;
    const update = () => {
      frame = 0;
      const max = document.documentElement.scrollHeight - window.innerHeight;
      const p = max > 0 ? Math.min(window.scrollY / max, 1) : 0;
      if (bar.current) bar.current.style.transform = `scaleX(${p})`;
      setScrolled(window.scrollY > 8);
    };
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (frame) cancelAnimationFrame(frame);
    };
  }, []);

  // Marks the section sitting around the upper third of the viewport (home only).
  useEffect(() => {
    if (variant !== "home") return;
    const els = homeLinks
      .map((l) => document.getElementById(l.id))
      .filter(Boolean) as HTMLElement[];
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) setActive(e.target.id);
        });
      },
      { rootMargin: "-30% 0px -60% 0px" }
    );
    els.forEach((el) => io.observe(el));
    const top = () => window.scrollY < 200 && setActive("");
    window.addEventListener("scroll", top, { passive: true });
    return () => {
      io.disconnect();
      window.removeEventListener("scroll", top);
    };
  }, [variant]);

  return (
    <header
      className={`sticky top-0 z-20 bg-chalk/90 backdrop-blur border-b transition-colors duration-300 ${
        scrolled ? "border-line" : "border-transparent"
      }`}
    >
      <nav
        aria-label="Main"
        className="mx-auto max-w-6xl px-5 md:px-8 h-14 flex items-center justify-between"
      >
        {variant === "home" ? (
          <a href="#top" className="font-semibold text-ink tracking-tight">
            Basim Hussain
          </a>
        ) : (
          <Link href="/" className="font-semibold text-ink tracking-tight">
            Basim Hussain
          </Link>
        )}
        <ul className="flex items-center gap-6 text-sm">
          {links.map((l) => (
            <li key={l.name} className={l.hideOnMobile ? "hidden sm:block" : ""}>
              {variant === "home" ? (
                <a
                  href={l.href}
                  aria-current={active === l.id ? "true" : undefined}
                  className={`transition-colors ${
                    active === l.id ? "text-ink" : "text-muted hover:text-ink"
                  }`}
                >
                  {l.name}
                </a>
              ) : (
                <Link
                  href={l.href}
                  className="text-muted hover:text-ink transition-colors"
                >
                  {l.name}
                </Link>
              )}
            </li>
          ))}
        </ul>
      </nav>
      <div
        ref={bar}
        aria-hidden
        className="absolute left-0 bottom-[-1px] h-px w-full origin-left bg-pine"
        style={{ transform: "scaleX(0)" }}
      />
    </header>
  );
};

export default Navigation;
