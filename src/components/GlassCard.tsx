import React from "react";

interface GlassCardProps {
  children: React.ReactNode;
  className?: string;
  variant?: "default" | "purple" | "blue" | "pink";
  hover?: boolean;
}

const GlassCard: React.FC<GlassCardProps> = ({
  children,
  className = "",
  variant = "default",
  hover = true,
}) => {
  const getVariantClasses = () => {
    switch (variant) {
      case "purple":
        return "bg-gradient-to-br from-purple-500/20 to-purple-700/10 border-purple-300/30";
      case "blue":
        return "bg-gradient-to-br from-blue-500/20 to-blue-700/10 border-blue-300/30";
      case "pink":
        return "bg-gradient-to-br from-pink-500/20 to-pink-700/10 border-pink-300/30";
      default:
        return "bg-gradient-to-br from-white/20 to-white/10 border-white/30";
    }
  };

  const hoverClasses = hover
    ? "hover:scale-105 hover:bg-gradient-to-br hover:from-white/30 hover:to-white/20 transform transition-all duration-300"
    : "";

  return (
    <div
      className={`
      backdrop-blur-md 
      ${getVariantClasses()} 
      border 
      rounded-2xl 
      shadow-2xl 
      ${hoverClasses}
      ${className}
    `}
    >
      {children}
    </div>
  );
};

export default GlassCard;
