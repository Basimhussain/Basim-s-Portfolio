import React, { useEffect, useRef, useState } from "react";
import { motion, useMotionValue, useSpring, AnimatePresence } from "framer-motion";

const CustomCursor: React.FC = () => {
  const [enabled, setEnabled] = useState(false);
  const [hovering, setHovering] = useState<null | {
    label?: string;
    kind: "link" | "view";
  }>(null);
  const [pressed, setPressed] = useState(false);

  const x = useMotionValue(-100);
  const y = useMotionValue(-100);

  // Outer ring follows with looser spring
  const ringX = useSpring(x, { stiffness: 220, damping: 24, mass: 0.6 });
  const ringY = useSpring(y, { stiffness: 220, damping: 24, mass: 0.6 });
  // Inner dot tracks tighter
  const dotX = useSpring(x, { stiffness: 600, damping: 30, mass: 0.3 });
  const dotY = useSpring(y, { stiffness: 600, damping: 30, mass: 0.3 });

  useEffect(() => {
    if (typeof window === "undefined") return;

    const isTouch =
      window.matchMedia("(hover: none)").matches ||
      "ontouchstart" in window ||
      navigator.maxTouchPoints > 0;
    if (isTouch) return;
    setEnabled(true);

    const move = (e: MouseEvent) => {
      x.set(e.clientX);
      y.set(e.clientY);
    };
    const down = () => setPressed(true);
    const up = () => setPressed(false);
    const leave = () => {
      x.set(-100);
      y.set(-100);
      setHovering(null);
    };

    const onOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement | null;
      if (!target) return;
      const link = target.closest(
        'a, button, [role="button"], [data-cursor]'
      ) as HTMLElement | null;
      if (!link) {
        setHovering(null);
        return;
      }
      const label = link.getAttribute("data-cursor-label") ?? undefined;
      const kind =
        (link.getAttribute("data-cursor") as "link" | "view" | null) || "link";
      setHovering({ label, kind });
    };
    const onOut = (e: MouseEvent) => {
      const target = e.target as HTMLElement | null;
      const next = e.relatedTarget as HTMLElement | null;
      if (!target) return;
      const wasInLink = target.closest(
        'a, button, [role="button"], [data-cursor]'
      );
      const stillInLink = next?.closest?.(
        'a, button, [role="button"], [data-cursor]'
      );
      if (wasInLink && !stillInLink) setHovering(null);
    };

    window.addEventListener("mousemove", move);
    window.addEventListener("mousedown", down);
    window.addEventListener("mouseup", up);
    document.addEventListener("mouseleave", leave);
    document.addEventListener("mouseover", onOver);
    document.addEventListener("mouseout", onOut);

    return () => {
      window.removeEventListener("mousemove", move);
      window.removeEventListener("mousedown", down);
      window.removeEventListener("mouseup", up);
      document.removeEventListener("mouseleave", leave);
      document.removeEventListener("mouseover", onOver);
      document.removeEventListener("mouseout", onOut);
    };
  }, [x, y]);

  if (!enabled) return null;

  const ringSize = hovering ? 64 : 36;
  const dotSize = hovering ? 4 : 6;

  return (
    <>
      {/* Hide native cursor on every interactive element */}
      <style jsx global>{`
        @media (hover: hover) {
          html,
          body,
          a,
          button,
          [role="button"],
          [data-cursor] {
            cursor: none !important;
          }
        }
      `}</style>

      <motion.div
        style={{
          translateX: ringX,
          translateY: ringY,
        }}
        className="pointer-events-none fixed top-0 left-0 z-[9999]"
      >
        <motion.div
          animate={{
            width: ringSize,
            height: ringSize,
            scale: pressed ? 0.6 : 1,
            borderColor: hovering ? "rgba(212,164,74,0.95)" : "rgba(244,235,216,0.65)",
            backgroundColor: hovering ? "rgba(212,164,74,0.06)" : "rgba(244,235,216,0)",
          }}
          transition={{ type: "spring", stiffness: 280, damping: 22 }}
          className="rounded-full border backdrop-blur-[1px] flex items-center justify-center -translate-x-1/2 -translate-y-1/2 relative"
        >
          <AnimatePresence>
            {hovering?.label && (
              <motion.span
                key={hovering.label}
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -6 }}
                transition={{ duration: 0.18 }}
                className="absolute top-full mt-2 whitespace-nowrap text-[10px] font-mono tracking-widest text-gold/90 bg-ink/80 backdrop-blur px-2 py-1 rounded-full border border-gold/30"
              >
                {hovering.label}
              </motion.span>
            )}
          </AnimatePresence>
        </motion.div>
      </motion.div>

      <motion.div
        style={{
          translateX: dotX,
          translateY: dotY,
        }}
        className="pointer-events-none fixed top-0 left-0 z-[9999]"
      >
        <motion.div
          animate={{
            width: dotSize,
            height: dotSize,
            backgroundColor: hovering ? "rgba(232,194,112,1)" : "rgba(244,235,216,0.95)",
          }}
          transition={{ type: "spring", stiffness: 500, damping: 30 }}
          className="rounded-full -translate-x-1/2 -translate-y-1/2 shadow-[0_0_12px_rgba(232,194,112,0.5)]"
        />
      </motion.div>
    </>
  );
};

export default CustomCursor;
