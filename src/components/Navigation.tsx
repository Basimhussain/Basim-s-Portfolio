import React, { useState, useEffect } from "react";
import GlassCard from "./GlassCard";

const Navigation = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navItems = [
    { name: "Home", href: "#home" },
    { name: "About", href: "#about" },
    { name: "Projects", href: "#projects" },
    { name: "Contact", href: "#contact" },
  ];

  const handleNavClick = (href: string) => {
    setIsMenuOpen(false);
    document.querySelector(href)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 p-6 transition-all duration-300 ${
        scrolled ? "backdrop-blur-xl" : ""
      }`}
    >
      <GlassCard
        className={`px-6 py-4 transition-all duration-300 ${
          scrolled ? "glass-effect-strong" : ""
        }`}
        hover={false}
      >
        <div className="flex justify-between items-center">
          {/* Logo */}
          <div className="text-white font-bold text-xl bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
            Basim Hussain&apos;s Portfolio
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex space-x-6">
            {navItems.map((item) => (
              <button
                key={item.name}
                onClick={() => handleNavClick(item.href)}
                className="text-white/80 hover:text-white transition-colors duration-300 relative group"
              >
                {item.name}
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-purple-400 to-blue-400 transition-all duration-300 group-hover:w-full"></span>
              </button>
            ))}
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden relative w-6 h-6 focus:outline-none"
            aria-label="Toggle menu"
          >
            <span
              className={`absolute h-0.5 w-6 bg-white transform transition-all duration-300 ${
                isMenuOpen ? "rotate-45 top-3" : "top-1"
              }`}
            ></span>
            <span
              className={`absolute h-0.5 w-6 bg-white transform transition-all duration-300 top-3 ${
                isMenuOpen ? "opacity-0" : "opacity-100"
              }`}
            ></span>
            <span
              className={`absolute h-0.5 w-6 bg-white transform transition-all duration-300 ${
                isMenuOpen ? "-rotate-45 top-3" : "top-5"
              }`}
            ></span>
          </button>
        </div>

        {/* Mobile Menu */}
        <div
          className={`md:hidden transition-all duration-300 overflow-hidden ${
            isMenuOpen ? "max-h-64 mt-6" : "max-h-0"
          }`}
        >
          <div className="space-y-4">
            {navItems.map((item) => (
              <button
                key={item.name}
                onClick={() => handleNavClick(item.href)}
                className="block w-full text-left text-white/80 hover:text-white transition-colors duration-300 py-2 px-4 rounded-lg hover:bg-white/10"
              >
                {item.name}
              </button>
            ))}
          </div>
        </div>
      </GlassCard>
    </nav>
  );
};

export default Navigation;
