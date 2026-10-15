import { useEffect, useRef, useState } from "react";
import { useReducedMotion } from "framer-motion";

export const useInView = <T extends HTMLElement>(threshold = 0.15) => {
  const ref = useRef<T | null>(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          io.disconnect();
        }
      },
      { threshold }
    );
    io.observe(el);
    return () => io.disconnect();
  }, [threshold]);
  return { ref, inView };
};

const useLineSplit = (text: string) => {
  const measureRef = useRef<HTMLSpanElement | null>(null);
  const [lines, setLines] = useState<string[]>([text]);

  useEffect(() => {
    const el = measureRef.current;
    if (!el) return;

    const compute = () => {
      const words = text.split(/\s+/).filter(Boolean);
      el.innerHTML = words
        .map((w, i) => `<span data-w="${i}">${w}</span>${i < words.length - 1 ? " " : ""}`)
        .join("");
      const spans = Array.from(el.querySelectorAll<HTMLSpanElement>("span[data-w]"));
      const grouped: string[] = [];
      let currentTop: number | null = null;
      let current: string[] = [];
      spans.forEach((s) => {
        const top = s.getBoundingClientRect().top;
        if (currentTop === null || Math.abs(top - currentTop) < 2) {
          current.push(s.textContent || "");
          currentTop = currentTop === null ? top : currentTop;
        } else {
          grouped.push(current.join(" "));
          current = [s.textContent || ""];
          currentTop = top;
        }
      });
      if (current.length) grouped.push(current.join(" "));
      setLines(grouped.length ? grouped : [text]);
    };

    compute();
    const ro = new ResizeObserver(compute);
    if (el.parentElement) ro.observe(el.parentElement);
    window.addEventListener("resize", compute);
    return () => {
      ro.disconnect();
      window.removeEventListener("resize", compute);
    };
  }, [text]);

  return { measureRef, lines };
};

/**
 * One masked line of a reveal.
 *
 * The mask exists only to hide the line while it slides up from below, but
 * `overflow: hidden` also shears any glyph that leaves the line box, and the
 * display face overruns it: Cormorant Garamond needs ~1.10em of ink where these
 * headings set leading as tight as 0.8em, so descenders came off flat. Padding
 * the mask would fix the shear but make neighbouring line masks overlap, and a
 * staggered line would then be visible through its neighbour mid-animation.
 * Dropping the mask once the slide has finished avoids both: it is only needed
 * while the line is in motion.
 *
 * The release is on a timer rather than `transitionend` because that event does
 * not fire reliably for an element that is scrolled out of view or has its
 * transition interrupted, and a mask that never releases is a clipped heading.
 */
const RevealLine = ({
  line,
  inView,
  delay,
  duration,
  reduce,
}: {
  line: string;
  inView: boolean;
  delay: number;
  duration: number;
  reduce: boolean | null;
}) => {
  const [settled, setSettled] = useState(false);
  // A line that is already in view on its first render never transitions: it
  // paints at translateY(0) straight away. That covers both the hardcoded
  // `inView` call sites and remounts when a resize re-splits the lines, where
  // waiting out the timer would put the mask back over settled text.
  const inViewOnMount = useRef(inView);

  useEffect(() => {
    if (!inView) return;
    if (reduce || inViewOnMount.current) {
      setSettled(true);
      return;
    }
    const id = window.setTimeout(() => setSettled(true), (delay + duration) * 1000 + 60);
    return () => window.clearTimeout(id);
  }, [inView, reduce, delay, duration]);

  return (
    <span className="block" style={{ overflow: settled ? "visible" : "hidden" }}>
      <span
        className="block"
        style={{
          transform: reduce || inView ? "translateY(0)" : "translateY(110%)",
          opacity: inView ? 1 : 0,
          transition: reduce
            ? `opacity ${Math.min(duration, 0.4)}s ease ${delay}s`
            : `transform ${duration}s cubic-bezier(0.22,1,0.36,1) ${delay}s, opacity ${duration}s cubic-bezier(0.22,1,0.36,1) ${delay}s`,
          willChange: settled ? "auto" : "opacity, transform",
        }}
      >
        {line}
      </span>
    </span>
  );
};

export const LineReveal = ({
  text,
  inView,
  baseDelay = 0,
  step = 0.08,
  duration = 0.9,
  className = "",
}: {
  text: string;
  inView: boolean;
  baseDelay?: number;
  step?: number;
  duration?: number;
  className?: string;
}) => {
  const { measureRef, lines } = useLineSplit(text);
  const reduce = useReducedMotion();
  return (
    <span className={className} style={{ position: "relative", display: "block" }}>
      <span
        ref={measureRef}
        aria-hidden
        style={{
          position: "absolute",
          visibility: "hidden",
          pointerEvents: "none",
          left: 0,
          right: 0,
          top: 0,
          width: "100%",
        }}
      />
      {lines.map((line, i) => (
        <RevealLine
          key={i}
          line={line}
          inView={inView}
          delay={baseDelay + i * step}
          duration={duration}
          reduce={reduce}
        />
      ))}
    </span>
  );
};

export const ParagraphsReveal = ({
  paragraphs,
  inView,
  baseDelay = 0,
  step = 0.08,
  duration = 0.9,
  paragraphClassName = "",
  spacingClassName = "space-y-6",
}: {
  paragraphs: string[];
  inView: boolean;
  baseDelay?: number;
  step?: number;
  duration?: number;
  paragraphClassName?: string;
  spacingClassName?: string;
}) => {
  let cursor = baseDelay;
  return (
    <div className={spacingClassName}>
      {paragraphs.map((para, pi) => {
        const start = cursor;
        const estLines = Math.max(1, Math.ceil(para.length / 90));
        cursor = start + estLines * step;
        return (
          <p key={pi} className={paragraphClassName}>
            <LineReveal
              text={para}
              inView={inView}
              baseDelay={start}
              step={step}
              duration={duration}
            />
          </p>
        );
      })}
    </div>
  );
};
