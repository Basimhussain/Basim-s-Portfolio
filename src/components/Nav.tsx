import { useEffect, useRef, useState } from "react";
import { Link, useLocation } from "@/lib/router";
import { useScroll, useMotionValueEvent } from "framer-motion";
import MenuOverlay from "./MenuOverlay";


const links = [
  { label: "HOME", href: "/" },
  { label: "WORK", href: "/#work" },
  { label: "EXPERIENCE", href: "/#experience" },
  { label: "TOOLS", href: "/#tools" },
  { label: "CONTACT", href: "/#contact" },
];

/** Animated label: existing text rises out, duplicate rises in from baseline */
const HoverRise = ({ text }: { text: string }) => (
  <span className="relative inline-block overflow-hidden align-bottom leading-[1.2]">
    <span className="block transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:-translate-y-full">
      {text}
    </span>
    <span
      aria-hidden
      className="absolute left-0 top-0 block translate-y-full transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:translate-y-0"
    >
      {text}
    </span>
  </span>
);

const Nav = () => {
  const [hidden, setHidden] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const lastY = useRef(0);
  const location = useLocation();
  const isHome = location.pathname === "/";

  const { scrollY } = useScroll();

  useEffect(() => {
    lastY.current = scrollY.get();
    if (isHome) setHidden(false);
  }, [isHome, scrollY]);

  // Subscribed to the shared scroll value rather than its own listener. The
  // state that lands in React is a boolean that only flips once the reader has
  // moved 10px, not a position, so this is not a per-frame re-render.
  useMotionValueEvent(scrollY, "change", (currentY) => {
    if (isHome) return;
    const delta = currentY - lastY.current;
    if (Math.abs(delta) < 10) return;
    if (delta > 0 && currentY > 80) setHidden(true);
    else if (delta < 0) setHidden(false);
    lastY.current = currentY;
  });

  return (
    <>
      <header
        style={{
          transition: "transform 0.4s ease, opacity 0.4s ease",
          transform: hidden ? "translateY(-100%)" : "translateY(0)",
          opacity: hidden ? 0 : 1,
        }}
        className="fixed top-0 inset-x-0 z-50"
      >
        {/* Light spilling down from behind the bar, so the nav reads as lit
            rather than as a hard black strip laid over the photography. It sits
            inside the header, so it travels with the hide-on-scroll transform
            instead of being left behind on the page. -z-10 keeps it under the
            pill and the wordmark row while staying inside the header's own
            stacking context. */}
        {/* Link pill, hung off the top edge and centred over the hero. Pointer
            devices only: on touch this duplicated the overlay's identical six
            links at an ~11px tap target, so the hamburger owns mobile instead. */}
        {/* The glow is a box-shadow on the pill itself, not a gradient panel
            underneath it, so it follows the rounded-b corners and runs the whole
            visible outline (left, bottom, right) instead of pooling under the
            middle. Two shadows: a tight ring that lights the border line, then a
            wider bloom. The border is lifted /10 to /25 so the line itself reads
            as lit rather than as a grey hairline sitting inside a glow. */}
        <nav className="absolute left-1/2 top-0 z-10 hidden -translate-x-1/2 items-center gap-9 rounded-b-[24px] border-x border-b border-soft-white/25 bg-black px-8 py-2.5 shadow-[0_0_12px_0_hsl(var(--soft-white)/0.30),0_0_34px_2px_hsl(var(--soft-white)/0.16)] md:flex">
          {links.map((l) => {
            const active = l.href === "/" ? location.pathname === "/" : l.label === "WORK" && location.pathname.startsWith("/work");
            return (
              <Link
                key={l.href}
                to={l.href}
                className={`-my-2.5 py-2.5 text-[11px] uppercase tracking-luxury transition-colors ${
                  active ? "text-mustard" : "text-soft-white/70 hover:text-soft-white"
                }`}
              >
                {l.label}
              </Link>
            );
          })}
        </nav>

        {/* Wordmark and menu trigger pushed to the screen edges, pill stays centred */}
        <div className="flex items-center justify-between px-4 pb-2 pt-[max(1.25rem,env(safe-area-inset-top))] sm:px-6 md:px-10 md:py-4">
          <Link to="/" className="flex items-center gap-3" aria-label="Basim Hussain, Home">
            <span className="font-display font-light text-soft-white leading-none tracking-[0.28em] text-[16px] md:text-[18px] pl-[0.28em]">
              BASIM HUSSAIN
            </span>

          </Link>

          {/* Desktop: MENU button with hover rise animation. The outlined capsule
              rhymes with the hero CTA and keeps the mustard readable over the
              bright patches of the hero photography. */}
          <button
            onClick={() => setMenuOpen(true)}
            aria-label="Open menu"
            className="group hidden items-center gap-3 rounded-full border border-mustard/40 bg-black/20 py-2.5 pl-5 pr-4 text-[11px] uppercase tracking-luxury text-mustard backdrop-blur-md transition-all duration-500 hover:border-mustard hover:shadow-[0_0_40px_-8px_hsl(var(--mustard)/0.6)] md:inline-flex"
          >
            <HoverRise text="MENU" />
            <span className="flex flex-col gap-[4px]">
              <span className="block h-px w-6 origin-left scale-x-[0.83] bg-mustard transition-transform duration-500 group-hover:scale-x-100" />
              <span className="ml-auto block h-px w-6 origin-right scale-x-50 bg-mustard transition-transform duration-500 group-hover:scale-x-100" />
            </span>
          </button>

          {/* Mobile: hamburger */}
          <button
            onClick={() => setMenuOpen(true)}
            aria-label="Open menu"
            className="-mr-3 inline-flex h-11 w-11 flex-col items-center justify-center gap-[5px] md:hidden"
          >
            <span className="block h-px w-6 bg-soft-white" />
            <span className="block h-px w-6 bg-soft-white" />
          </button>
        </div>
      </header>

      <MenuOverlay open={menuOpen} onClose={() => setMenuOpen(false)} />
    </>
  );
};

export default Nav;
