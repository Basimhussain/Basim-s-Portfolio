import React from "react";
import { motion, type Variants } from "framer-motion";

interface AnimatedHeadingProps {
  text: string;
  className?: string;
  as?: "h1" | "h2" | "h3" | "p";
  stagger?: number;
  delay?: number;
  once?: boolean;
}

const AnimatedHeading: React.FC<AnimatedHeadingProps> = ({
  text,
  className = "",
  as = "h2",
  stagger = 0.04,
  delay = 0,
  once = true,
}) => {
  const words = text.split(" ");
  const Tag = motion[as] as any;

  const container: Variants = {
    hidden: {},
    visible: {
      transition: {
        delayChildren: delay,
        staggerChildren: stagger,
      },
    },
  };

  const word: Variants = {
    hidden: { y: "110%", opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] as const },
    },
  };

  return (
    <Tag
      className={className}
      variants={container}
      initial="hidden"
      whileInView="visible"
      viewport={{ once, margin: "-10% 0px -10% 0px" }}
      aria-label={text}
    >
      {words.map((w, i) => (
        <span
          key={i}
          className="inline-block overflow-hidden align-bottom mr-[0.25em] pb-[0.18em]"
          aria-hidden="true"
        >
          <motion.span className="inline-block will-change-transform" variants={word}>
            {w}
          </motion.span>
        </span>
      ))}
    </Tag>
  );
};

export default AnimatedHeading;
