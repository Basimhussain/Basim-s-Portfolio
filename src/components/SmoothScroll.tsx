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

    // Lenis takes over scrolling, so same-page anchors have to go through it.
    // Capture phase, so the router never sees the click and does not also jump.
    const onClick = (e: MouseEvent) => {
      const a = (e.target as HTMLElement).closest<HTMLAnchorElement>("a[href]");
      if (!a) return;
      const raw = a.getAttribute("href") ?? "";
      let hash = "";
      if (raw.startsWith("#")) hash = raw;
      else if (raw.startsWith("/#") && window.location.pathname === "/") hash = raw.slice(1);
      if (!hash || hash === "#") return;
      const target = hash === "#top" ? 0 : document.querySelector(hash);
      if (target === null) return;
      e.preventDefault();
      e.stopPropagation();
      lenis.scrollTo(target as HTMLElement | number, { offset: -24 });
    };
    document.addEventListener("click", onClick, true);

    return () => {
      cancelAnimationFrame(raf);
      document.removeEventListener("click", onClick, true);
      lenis.destroy();
    };
  }, []);

  return null;
};

export default SmoothScroll;
