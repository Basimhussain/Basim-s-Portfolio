import { Link } from "@/lib/router";
import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import type { ComponentProps, ReactNode } from "react";

const MotionLink = motion.create(Link);

type PillCtaProps = Omit<ComponentProps<typeof MotionLink>, "children"> & {
  children: ReactNode;
};

/**
 * The soft-white pill with a black circle arrow, first used on the hero's
 * "Discuss the Project" CTA. Shared so every link that wants that treatment
 * (About Us, hero CTA, etc.) stays pixel-identical instead of drifting.
 */
export const PillCta = ({ children, className = "", ...props }: PillCtaProps) => (
  <MotionLink
    className={`group inline-flex items-center gap-2 rounded-full bg-soft-white py-1 pl-5 pr-1 text-[11px] uppercase tracking-luxury text-black transition-all duration-500 hover:gap-3 hover:bg-mustard ${className}`}
    {...props}
  >
    {children}
    <span className="flex h-9 w-9 items-center justify-center rounded-full bg-black transition-transform duration-500 group-hover:scale-110 sm:h-10 sm:w-10">
      <ArrowUpRight className="h-4 w-4 text-soft-white" />
    </span>
  </MotionLink>
);
