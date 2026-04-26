import React from "react";
import { motion } from "framer-motion";
import AnimatedHeading from "./AnimatedHeading";

interface SectionProps {
  id?: string;
  number?: string;
  eyebrow?: string;
  title?: string;
  subtitle?: string;
  children: React.ReactNode;
  className?: string;
}

const Section: React.FC<SectionProps> = ({
  id,
  number,
  eyebrow,
  title,
  subtitle,
  children,
  className = "",
}) => {
  return (
    <section id={id} className={`relative py-24 md:py-32 px-6 ${className}`}>
      <div className="max-w-7xl mx-auto">
        {(number || eyebrow) && (
          <div className="flex items-center gap-3 mb-8">
            {number && <span className="section-number">{number}</span>}
            <span className="hairline w-12" />
            {eyebrow && (
              <span className="text-[10px] font-mono tracking-widest text-bone/50 uppercase">
                {eyebrow}
              </span>
            )}
          </div>
        )}

        {title && (
          <AnimatedHeading
            text={title}
            as="h2"
            className="font-display text-4xl md:text-6xl leading-[1.05] tracking-tight text-bone mb-6"
          />
        )}

        {subtitle && (
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-10%" }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-base md:text-lg text-bone/60 max-w-2xl mb-16 leading-relaxed"
          >
            {subtitle}
          </motion.p>
        )}

        {children}
      </div>
    </section>
  );
};

export default Section;
