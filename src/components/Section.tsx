import React from "react";
import { useReveal } from "./useReveal";

interface SectionProps {
  id: string;
  title: string;
  children: React.ReactNode;
}

const Section: React.FC<SectionProps> = ({ id, title, children }) => {
  const rule = useReveal<HTMLDivElement>();
  const heading = useReveal<HTMLHeadingElement>(120);

  return (
    <section id={id}>
      {/* Hairline that draws in from the left as the section arrives */}
      <div ref={rule} className="rule" />
      <div className="py-12 md:py-16 md:grid md:grid-cols-[11rem_1fr] md:gap-10">
        <h2
          ref={heading}
          className="text-xs font-semibold uppercase tracking-[0.14em] text-muted mb-6 md:mb-0 md:pt-1.5"
        >
          {title}
        </h2>
        <div className="min-w-0">{children}</div>
      </div>
    </section>
  );
};

export default Section;
