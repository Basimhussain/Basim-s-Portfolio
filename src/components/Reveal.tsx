import React from "react";
import { useReveal } from "./useReveal";

interface RevealProps {
  children: React.ReactNode;
  delay?: number;
  as?: "div" | "li";
  className?: string;
}

const Reveal: React.FC<RevealProps> = ({
  children,
  delay = 0,
  as = "div",
  className = "",
}) => {
  const ref = useReveal<HTMLDivElement & HTMLLIElement>(delay);
  const Tag = as as React.ElementType;
  return (
    <Tag ref={ref} className={className}>
      {children}
    </Tag>
  );
};

export default Reveal;
