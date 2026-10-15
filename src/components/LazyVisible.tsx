import { useEffect, useRef, useState, type ReactNode } from "react";

interface LazyVisibleProps {
  children: ReactNode;
  /** Distance (in px or CSS) before the element enters the viewport at which to mount. */
  rootMargin?: string;
  /** Wrapper element className, used to preserve layout and size while children are not mounted. */
  className?: string;
  /** Optional placeholder rendered before children mount (keeps layout height). */
  placeholder?: ReactNode;
  /** Once true, children stay mounted (default true). */
  keepMounted?: boolean;
  as?: keyof JSX.IntrinsicElements;
}

/**
 * Mount children only when the wrapper scrolls near the viewport.
 * Used to defer heavy components (WebGL, videos) without changing visuals.
 */
const LazyVisible = ({
  children,
  rootMargin = "300px",
  className,
  placeholder = null,
  keepMounted = true,
  as: Tag = "div",
}: LazyVisibleProps) => {
  const ref = useRef<HTMLDivElement | null>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (!ref.current || visible) return;
    if (typeof IntersectionObserver === "undefined") {
      setVisible(true);
      return;
    }
    const el = ref.current;
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) {
            setVisible(true);
            if (keepMounted) io.disconnect();
          } else if (!keepMounted) {
            setVisible(false);
          }
        }
      },
      { rootMargin, threshold: 0.01 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, [rootMargin, keepMounted, visible]);

  const Component = Tag as any;
  return (
    <Component ref={ref} className={className}>
      {visible ? children : placeholder}
    </Component>
  );
};

export default LazyVisible;
