import { useEffect } from "react";
import Lenis from "lenis";

// Inertial scrolling for the whole page. Skipped for reduced-motion users,
// who keep the browser's native scroll.
const SmoothScroll = () => {
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const lenis = new Lenis({ duration: 1.15, smoothWheel: true });

    let raf = 0;
    const loop = (time: number) => {
      lenis.raf(time);
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);

    // Lenis takes over scrolling, so in-page anchors have to go through it.
    const onClick = (e: MouseEvent) => {
      const a = (e.target as HTMLElement).closest<HTMLAnchorElement>(
        'a[href^="#"]'
      );
      if (!a) return;
      const href = a.getAttribute("href");
      if (!href || href === "#") return;
      const target = href === "#top" ? 0 : document.querySelector(href);
      if (target === null) return;
      e.preventDefault();
      lenis.scrollTo(target as HTMLElement | number, { offset: -56 });
    };
    document.addEventListener("click", onClick);

    return () => {
      cancelAnimationFrame(raf);
      document.removeEventListener("click", onClick);
      lenis.destroy();
    };
  }, []);

  return null;
};

export default SmoothScroll;
