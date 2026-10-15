import { useEffect, useRef } from "react";

/**
 * Drafting-reticle cursor: a mustard point of origin inside a thin crosshair,
 * which rotates into an X and turns mustard over anything clickable.
 * Replaces the old refracting glass lens, which fought the photography.
 *
 * Fine pointers only. Touch, coarse pointers and reduced-motion get the
 * native cursor untouched, and so do text fields (the caret target matters
 * more than the effect).
 */

const RETICLE = 34; // layout size in px; hover state scales this up
const DOT = 5;
const SOFT_WHITE = "hsl(var(--soft-white) / 0.5)";
const MUSTARD = "hsl(var(--mustard))";

type Mode = "default" | "link" | "text";

const isClickable = (el: Element | null): boolean => {
  let node: Element | null = el;
  let depth = 0;
  while (node && depth < 6) {
    const tag = node.tagName;
    if (tag === "A" || tag === "BUTTON" || tag === "SUMMARY" || tag === "LABEL") return true;
    const role = node.getAttribute?.("role");
    if (role === "button" || role === "link" || role === "menuitem" || role === "tab") return true;
    if (window.getComputedStyle(node).cursor === "pointer") return true;
    node = node.parentElement;
    depth++;
  }
  return false;
};

const isTextField = (el: Element | null): boolean => {
  const node = el?.closest?.("input, textarea, select, [contenteditable='true']");
  return !!node;
};

const CursorReticle = () => {
  const reticleRef = useRef<HTMLDivElement | null>(null);
  const dotRef = useRef<HTMLDivElement | null>(null);
  const lineRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const fine = window.matchMedia("(hover: hover) and (pointer: fine)");
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (!fine.matches || reduced.matches) return;

    document.documentElement.classList.add("reticle-cursor");

    const p = {
      x: -200,
      y: -200,
      tx: -200,
      ty: -200,
      opacity: 0,
      targetOpacity: 0,
      scale: 1,
      targetScale: 1,
      rotation: 0,
      targetRotation: 0,
      dot: 0,
      targetDot: 0,
    };
    let mode: Mode = "default";
    let raf = 0;

    const paint = (next: Mode) => {
      if (next === mode) return;
      mode = next;
      const active = next === "link";
      for (const line of lineRefs.current) {
        if (line) line.style.background = active ? MUSTARD : SOFT_WHITE;
      }
      p.targetScale = active ? 1.5 : 1;
      p.targetRotation = active ? 45 : 0;
      p.targetOpacity = next === "text" ? 0 : 1;
    };

    const onMouseMove = (e: MouseEvent) => {
      p.tx = e.clientX;
      p.ty = e.clientY;
      const el = e.target instanceof Element ? e.target : null;
      paint(isTextField(el) ? "text" : isClickable(el) ? "link" : "default");
      if (mode !== "text") p.targetOpacity = 1;
    };
    const onLeave = () => {
      p.targetOpacity = 0;
    };

    const tick = () => {
      // The dot tracks almost 1:1 so clicking still feels precise; the
      // crosshair lags a little, which is where the weight comes from.
      p.x += (p.tx - p.x) * 0.45;
      p.y += (p.ty - p.y) * 0.45;
      p.opacity += (p.targetOpacity - p.opacity) * 0.2;
      p.scale += (p.targetScale - p.scale) * 0.18;
      p.rotation += (p.targetRotation - p.rotation) * 0.18;
      p.targetDot = mode === "link" ? 0 : p.targetOpacity;
      p.dot += (p.targetDot - p.dot) * 0.2;

      if (dotRef.current) {
        dotRef.current.style.transform = `translate3d(${p.tx - DOT / 2}px, ${p.ty - DOT / 2}px, 0)`;
        dotRef.current.style.opacity = String(p.dot);
      }
      if (reticleRef.current) {
        reticleRef.current.style.transform =
          `translate3d(${p.x - RETICLE / 2}px, ${p.y - RETICLE / 2}px, 0) ` +
          `scale(${p.scale}) rotate(${p.rotation}deg)`;
        reticleRef.current.style.opacity = String(p.opacity);
      }
      raf = requestAnimationFrame(tick);
    };

    window.addEventListener("mousemove", onMouseMove);
    document.addEventListener("mouseleave", onLeave);
    window.addEventListener("blur", onLeave);
    raf = requestAnimationFrame(tick);

    return () => {
      window.removeEventListener("mousemove", onMouseMove);
      document.removeEventListener("mouseleave", onLeave);
      window.removeEventListener("blur", onLeave);
      cancelAnimationFrame(raf);
      document.documentElement.classList.remove("reticle-cursor");
    };
  }, []);

  return (
    <>
      <div
        ref={reticleRef}
        aria-hidden="true"
        className="pointer-events-none fixed left-0 top-0 z-[9998]"
        style={{
          width: RETICLE,
          height: RETICLE,
          opacity: 0,
          transformOrigin: "center",
          transform: "translate3d(-9999px, -9999px, 0)",
          willChange: "transform, opacity",
          contain: "layout paint style",
        }}
      >
        <div
          ref={(el) => {
            lineRefs.current[0] = el;
          }}
          style={{
            position: "absolute",
            top: "50%",
            left: 0,
            width: "100%",
            height: 1,
            background: SOFT_WHITE,
            transition: "background 0.35s ease",
            // Centre gap keeps the hairlines from burying the dot.
            maskImage: "linear-gradient(to right, #000 0 34%, transparent 34% 66%, #000 66% 100%)",
            WebkitMaskImage:
              "linear-gradient(to right, #000 0 34%, transparent 34% 66%, #000 66% 100%)",
          }}
        />
        <div
          ref={(el) => {
            lineRefs.current[1] = el;
          }}
          style={{
            position: "absolute",
            left: "50%",
            top: 0,
            height: "100%",
            width: 1,
            background: SOFT_WHITE,
            transition: "background 0.35s ease",
            maskImage: "linear-gradient(to bottom, #000 0 34%, transparent 34% 66%, #000 66% 100%)",
            WebkitMaskImage:
              "linear-gradient(to bottom, #000 0 34%, transparent 34% 66%, #000 66% 100%)",
          }}
        />
      </div>

      <div
        ref={dotRef}
        aria-hidden="true"
        className="pointer-events-none fixed left-0 top-0 z-[9999] rounded-full"
        style={{
          width: DOT,
          height: DOT,
          background: MUSTARD,
          opacity: 0,
          transform: "translate3d(-9999px, -9999px, 0)",
          willChange: "transform, opacity",
        }}
      />
    </>
  );
};

export default CursorReticle;
