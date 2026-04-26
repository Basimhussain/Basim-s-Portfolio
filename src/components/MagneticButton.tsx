import React, { useRef } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

interface MagneticButtonProps extends React.HTMLAttributes<HTMLAnchorElement> {
  href?: string;
  variant?: "primary" | "ghost";
  children: React.ReactNode;
  external?: boolean;
}

const MagneticButton: React.FC<MagneticButtonProps> = ({
  href,
  variant = "primary",
  children,
  external,
  className = "",
  ...rest
}) => {
  const ref = useRef<HTMLAnchorElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const sx = useSpring(x, { stiffness: 200, damping: 18, mass: 0.6 });
  const sy = useSpring(y, { stiffness: 200, damping: 18, mass: 0.6 });

  const handleMove = (e: React.MouseEvent<HTMLAnchorElement>) => {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const px = e.clientX - rect.left - rect.width / 2;
    const py = e.clientY - rect.top - rect.height / 2;
    x.set(px * 0.25);
    y.set(py * 0.25);
  };

  const handleLeave = () => {
    x.set(0);
    y.set(0);
  };

  const base =
    "relative inline-flex items-center gap-3 px-7 py-3.5 rounded-full font-medium text-sm tracking-wide transition-colors duration-300 will-change-transform";
  const variants: Record<string, string> = {
    primary:
      "bg-gold text-ink hover:bg-gold-soft magnetic-glow shadow-[0_8px_30px_-10px_rgba(212,164,74,0.5)]",
    ghost:
      "border border-bone/20 text-bone hover:border-gold/50 hover:text-gold-soft",
  };

  return (
    <motion.a
      ref={ref}
      href={href}
      target={external ? "_blank" : undefined}
      rel={external ? "noopener noreferrer" : undefined}
      onMouseMove={handleMove}
      onMouseLeave={handleLeave}
      data-cursor="link"
      style={{ x: sx, y: sy }}
      className={`${base} ${variants[variant]} ${className}`}
      {...(rest as any)}
    >
      {children}
    </motion.a>
  );
};

export default MagneticButton;
