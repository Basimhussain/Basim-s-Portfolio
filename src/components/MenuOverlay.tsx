import { useEffect, useRef, useState } from "react";
import { Link } from "@/lib/router";
import { X, ArrowUpRight } from "lucide-react";
import { EMAIL, LINKEDIN_URL, GITHUB_URL } from "@/data/site";

const navLinks = [
  { label: "HOME", href: "/" },
  { label: "WORK", href: "/#work" },
  { label: "EXPERIENCE", href: "/#experience" },
  { label: "TOOLS", href: "/#tools" },
  { label: "CONTACT", href: "/#contact" },
];

const socialLinks = [
  { label: "LINKEDIN", href: LINKEDIN_URL },
  { label: "GITHUB", href: GITHUB_URL },
];

const ease = "cubic-bezier(0.22,1,0.36,1)";

/** Hover text reveal: duplicated label, current slides up and out, new slides up from baseline */
const HoverRiseText = ({ text, className = "" }: { text: string; className?: string }) => (
  <span className={`relative inline-block overflow-hidden align-bottom ${className}`}>
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

/** Single-line vertical reveal mask, matched to site's LineReveal timing */
const LineMask = ({
  visible,
  delay = 0,
  duration = 0.9,
  className = "",
  children,
}: {
  visible: boolean;
  delay?: number;
  duration?: number;
  className?: string;
  children: React.ReactNode;
}) => (
  <span className={`block overflow-hidden ${className}`}>
    <span
      className="block"
      style={{
        transform: visible ? "translateY(0)" : "translateY(110%)",
        opacity: visible ? 1 : 0,
        transition: `transform ${duration}s ${ease} ${delay}s, opacity ${duration}s ${ease} ${delay}s`,
        willChange: "opacity, transform",
      }}
    >
      {children}
    </span>
  </span>
);

interface Props {
  open: boolean;
  onClose: () => void;
}

const FOCUSABLE =
  'a[href], button:not([disabled]), input, select, textarea, [tabindex]:not([tabindex="-1"])';

const MenuOverlay = ({ open, onClose }: Props) => {
  const [mounted, setMounted] = useState(false);
  const [visible, setVisible] = useState(false);
  const panelRef = useRef<HTMLElement>(null);

  // Mount/unmount with exit animation
  useEffect(() => {
    if (open) {
      setMounted(true);
      const id = requestAnimationFrame(() =>
        requestAnimationFrame(() => setVisible(true))
      );
      return () => cancelAnimationFrame(id);
    } else if (mounted) {
      setVisible(false);
      const t = setTimeout(() => setMounted(false), 900);
      return () => clearTimeout(t);
    }
  }, [open, mounted]);

  // Lock body scroll
  useEffect(() => {
    if (!mounted) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, [mounted]);

  // ESC to close
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, onClose]);

  // Trap Tab inside the panel and hand focus back to the trigger on close.
  // Without this the page behind stays in the tab order, so a keyboard user
  // walks a menu they cannot see while this one covers it.
  useEffect(() => {
    if (!open || !mounted) return;
    const panel = panelRef.current;
    if (!panel) return;
    const opener = document.activeElement as HTMLElement | null;

    const focusables = () =>
      Array.from(panel.querySelectorAll<HTMLElement>(FOCUSABLE)).filter(
        (el) => el.offsetParent !== null
      );

    focusables()[0]?.focus();

    const onKey = (e: KeyboardEvent) => {
      if (e.key !== "Tab") return;
      const items = focusables();
      if (!items.length) return;
      const first = items[0];
      const last = items[items.length - 1];
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    };

    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("keydown", onKey);
      opener?.focus?.();
    };
  }, [open, mounted]);

  if (!mounted) return null;

  // Stagger schedule
  const D_LOGO = 0.35;
  const D_NAV_LABEL = 0.45;
  const D_NAV_START = 0.55;
  const D_NAV_STEP = 0.07;
  const D_SOCIAL_LABEL = D_NAV_START + navLinks.length * D_NAV_STEP + 0.05;
  const D_SOCIAL_START = D_SOCIAL_LABEL + 0.08;
  const D_CONNECT_LABEL = D_SOCIAL_START + socialLinks.length * D_NAV_STEP + 0.05;
  const D_CONNECT_BODY = D_CONNECT_LABEL + 0.08;

  return (
    <div className="fixed inset-0 z-[100]">
      {/* Backdrop */}
      <div
        aria-hidden
        onClick={onClose}
        style={{
          opacity: visible ? 1 : 0,
          transition: `opacity 0.6s ${ease}`,
        }}
        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
      />

      {/* Panel slides from right */}
      <aside
        ref={panelRef}
        role="dialog"
        aria-modal="true"
        aria-label="Site menu"
        style={{
          transform: visible ? "translateX(0)" : "translateX(100%)",
          transition: `transform 0.85s ${ease}`,
        }}
        className="absolute right-0 top-0 h-full w-full sm:w-[400px] bg-[#0a0a0a] border-l border-white/10 overflow-hidden"
      >
        <div className="px-6 py-4 flex flex-col h-full">
          {/* Top bar */}
          <div className="flex items-center justify-end">
            <button
              onClick={onClose}
              aria-label="Close menu"
              style={{
                opacity: visible ? 1 : 0,
                transform: visible ? "rotate(0deg)" : "rotate(-90deg)",
                transition: `opacity 0.5s ${ease} 0.25s, transform 0.6s ${ease} 0.25s`,
              }}
              className="text-soft-white/80 hover:text-soft-white"
            >
              <X size={20} strokeWidth={1.2} />
            </button>
          </div>

          {/* Animated divider */}
          <div className="relative my-3 h-px overflow-hidden">
            <div
              className="absolute inset-0 origin-left bg-white/10"
              style={{
                transform: visible ? "scaleX(1)" : "scaleX(0)",
                transition: `transform 0.9s ${ease}0.2s`,
              }}
            />
          </div>

          {/* Logo */}
          <div className="flex flex-col items-center overflow-hidden">
            <div
              style={{
                opacity: visible ? 1 : 0,
                transform: visible ? "translateY(0) scale(1)" : "translateY(24px) scale(0.96)",
                transition: `opacity 0.9s ${ease} ${D_LOGO}s, transform 0.9s ${ease} ${D_LOGO}s`,
              }}
            >
              <span className="font-display text-4xl font-light tracking-[0.28em] pl-[0.28em] text-soft-white" aria-label="Basim Hussain">BH</span>
            </div>
          </div>

          <div className="relative mt-3 h-px overflow-hidden">
            <div
              className="absolute inset-0 origin-left bg-white/10"
              style={{
                transform: visible ? "scaleX(1)" : "scaleX(0)",
                transition: `transform 0.9s ${ease}0.4s`,
              }}
            />
          </div>

          {/* Navigation */}
          <div className="mt-3">
            <LineMask visible={visible} delay={D_NAV_LABEL} duration={0.7}>
              <span className="text-[10px] tracking-[0.3em] uppercase text-mustard block mb-1.5">
                Navigation
              </span>
            </LineMask>
            <ul>
              {navLinks.map((l, i) => (
                <li key={l.href}>
                  <LineMask visible={visible} delay={D_NAV_START + i * D_NAV_STEP}>
                    <Link
                      to={l.href}
                      onClick={onClose}
                      className="group inline-block text-xl font-light tracking-wide uppercase text-soft-white leading-[1.15] py-[1px]"
                    >
                      <HoverRiseText text={l.label} />
                    </Link>
                  </LineMask>
                </li>
              ))}
            </ul>
          </div>

          <div className="relative my-3 h-px overflow-hidden">
            <div
              className="absolute inset-0 origin-left bg-white/10"
              style={{
                transform: visible ? "scaleX(1)" : "scaleX(0)",
                transition: `transform 0.9s ${ease}${D_SOCIAL_LABEL - 0.1}s`,
              }}
            />
          </div>

          {/* Follow & Work */}
          <div>
            <LineMask visible={visible} delay={D_SOCIAL_LABEL} duration={0.7}>
              <span className="text-[10px] tracking-[0.3em] uppercase text-mustard block mb-1.5">
                Elsewhere
              </span>
            </LineMask>
            <ul>
              {socialLinks.map((l, i) => (
                <li key={l.href}>
                  <LineMask visible={visible} delay={D_SOCIAL_START + i * D_NAV_STEP}>
                    <a
                      href={l.href}
                      target="_blank"
                      rel="noreferrer"
                      className="group inline-flex items-center gap-2 text-lg font-light tracking-wide uppercase text-soft-white leading-[1.2] py-[1px]"
                    >
                      <HoverRiseText text={l.label} />
                      <ArrowUpRight
                        size={16}
                        strokeWidth={1.2}
                        className="transition-transform duration-500 group-hover:translate-x-1 group-hover:-translate-y-1"
                      />
                    </a>
                  </LineMask>
                </li>
              ))}
            </ul>
          </div>

          <div className="relative my-3 h-px overflow-hidden">
            <div
              className="absolute inset-0 origin-left bg-white/10"
              style={{
                transform: visible ? "scaleX(1)" : "scaleX(0)",
                transition: `transform 0.9s ${ease}${D_CONNECT_LABEL - 0.1}s`,
              }}
            />
          </div>

          {/* Connect */}
          <div>
            <LineMask visible={visible} delay={D_CONNECT_LABEL} duration={0.7}>
              <span className="text-[10px] tracking-[0.3em] uppercase text-mustard block mb-1.5">
                Connect
              </span>
            </LineMask>
            <LineMask visible={visible} delay={D_CONNECT_BODY}>
              <a
                href={`mailto:${EMAIL}`}
                className="group inline-flex items-center gap-2 text-lg font-light tracking-wide text-soft-white leading-[1.2] py-[1px]"
              >
                <HoverRiseText text={EMAIL} />
              </a>
            </LineMask>
          </div>

          <div className="relative mt-3 h-px overflow-hidden">
            <div
              className="absolute inset-0 origin-left bg-white/10"
              style={{
                transform: visible ? "scaleX(1)" : "scaleX(0)",
                transition: `transform 0.9s ${ease}${D_CONNECT_BODY + 0.15}s`,
              }}
            />
          </div>
        </div>
      </aside>
    </div>
  );
};

export default MenuOverlay;
