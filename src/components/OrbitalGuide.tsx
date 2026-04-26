import React from "react";
import {
  motion,
  useScroll,
  useSpring,
  useTransform,
  useVelocity,
} from "framer-motion";

const OrbitalGuide: React.FC = () => {
  const { scrollYProgress } = useScroll();
  const smooth = useSpring(scrollYProgress, {
    stiffness: 60,
    damping: 22,
    mass: 0.6,
  });
  const velocity = useVelocity(smooth);
  const smoothVel = useSpring(velocity, {
    stiffness: 200,
    damping: 50,
  });

  // Orb travels along a sinusoidal path across the viewport edges
  // Y bound to scroll position (full page traversal)
  const top = useTransform(smooth, [0, 1], ["8vh", "85vh"]);
  // X traces a sine wave — left edge → right edge → left edge ...
  const left = useTransform(smooth, (v) => {
    const phase = v * Math.PI * 4; // two full cycles
    const amp = 6; // viewport-edge anchored
    const x = 50 + Math.sin(phase) * (50 - amp);
    return `${x}vw`;
  });

  // Stretch on velocity
  const stretchY = useTransform(smoothVel, [-2, 0, 2], [1.6, 1, 1.6]);
  const stretchX = useTransform(smoothVel, [-2, 0, 2], [0.7, 1, 0.7]);
  const blurAmount = useTransform(smoothVel, (v) => {
    const a = Math.min(28, Math.abs(v) * 14);
    return `blur(${24 + a}px)`;
  });

  return (
    <motion.div
      style={{
        top,
        left,
        scaleY: stretchY,
        scaleX: stretchX,
        filter: blurAmount,
      }}
      aria-hidden="true"
      className="pointer-events-none fixed z-[1] -translate-x-1/2 -translate-y-1/2 will-change-transform hidden md:block"
    >
      <div className="w-[28vw] h-[28vw] max-w-[420px] max-h-[420px] rounded-full bg-gradient-to-br from-gold/40 via-gold/15 to-transparent opacity-60" />
    </motion.div>
  );
};

export default OrbitalGuide;
