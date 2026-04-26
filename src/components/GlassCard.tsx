import React from "react";

interface GlassCardProps {
  children: React.ReactNode;
  className?: string;
  variant?: "default" | "strong" | "gold";
  hover?: boolean;
}

const GlassCard: React.FC<GlassCardProps> = ({
  children,
  className = "",
  variant = "default",
  hover = true,
}) => {
  const base =
    variant === "strong"
      ? "glass-strong"
      : variant === "gold"
      ? "glass-gold"
      : "glass";
  const hoverCls = hover ? "card-lift" : "";

  return (
    <div className={`${base} ${hoverCls} rounded-2xl ${className}`}>
      {children}
    </div>
  );
};

export default GlassCard;
