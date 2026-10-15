import React from "react";

interface SectionProps {
  id: string;
  title: string;
  children: React.ReactNode;
}

const Section: React.FC<SectionProps> = ({ id, title, children }) => (
  <section
    id={id}
    className="border-t border-line py-12 md:py-16 md:grid md:grid-cols-[11rem_1fr] md:gap-10"
  >
    <h2 className="text-xs font-semibold uppercase tracking-[0.14em] text-muted mb-6 md:mb-0 md:pt-1.5">
      {title}
    </h2>
    <div>{children}</div>
  </section>
);

export default Section;
