/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ["Inter", "ui-sans-serif", "system-ui", "sans-serif"],
        serif: ["'Instrument Serif'", "ui-serif", "Georgia", "serif"],
        mono: ["'JetBrains Mono'", "ui-monospace", "SFMono-Regular", "monospace"],
      },
      colors: {
        ink: {
          DEFAULT: "#08080f",
          900: "#08080f",
          800: "#0d0d18",
          700: "#13131f",
          600: "#1a1a28",
          500: "#23233a",
        },
        bone: {
          DEFAULT: "#f4ebd8",
          900: "#f4ebd8",
          800: "#e9dfc6",
          700: "#d6c9a8",
          600: "#a89978",
        },
        gold: {
          DEFAULT: "#d4a44a",
          400: "#e8c270",
          500: "#d4a44a",
          600: "#a87c2c",
        },
        sand: {
          DEFAULT: "#c69963",
          400: "#d6b285",
          500: "#c69963",
          600: "#9c7444",
        },
        navy: {
          DEFAULT: "#0f1830",
          900: "#070b1a",
          800: "#0f1830",
          700: "#1c2a4d",
        },
        plum: {
          DEFAULT: "#3b1f5c",
        },
        emerald: {
          400: "#5dd6a8",
        },
      },
      fontSize: {
        display: ["clamp(3rem, 9vw, 9rem)", { lineHeight: "0.95", letterSpacing: "-0.04em" }],
        hero: ["clamp(2.5rem, 6vw, 5.5rem)", { lineHeight: "1", letterSpacing: "-0.03em" }],
        eyebrow: ["0.75rem", { lineHeight: "1", letterSpacing: "0.2em" }],
      },
      letterSpacing: {
        widest: "0.2em",
      },
      backdropBlur: {
        xs: "2px",
      },
      animation: {
        "marquee": "marquee 40s linear infinite",
        "marquee-reverse": "marquee 40s linear infinite reverse",
        "shimmer": "shimmer 3s ease-in-out infinite",
        "float": "float 8s ease-in-out infinite",
        "twinkle": "twinkle 4s ease-in-out infinite",
        "spin-slow": "spin 18s linear infinite",
        "noise": "noise 0.6s steps(4) infinite",
      },
      keyframes: {
        marquee: {
          "0%": { transform: "translateX(0%)" },
          "100%": { transform: "translateX(-50%)" },
        },
        shimmer: {
          "0%, 100%": { opacity: "0.4" },
          "50%": { opacity: "1" },
        },
        float: {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-14px)" },
        },
        twinkle: {
          "0%, 100%": { opacity: "0.2" },
          "50%": { opacity: "0.9" },
        },
        noise: {
          "0%": { transform: "translate(0,0)" },
          "25%": { transform: "translate(-1%,1%)" },
          "50%": { transform: "translate(1%,-1%)" },
          "75%": { transform: "translate(-1%,-1%)" },
          "100%": { transform: "translate(1%,1%)" },
        },
      },
      backgroundImage: {
        "grid-faint":
          "linear-gradient(to right, rgba(244,235,216,0.04) 1px, transparent 1px), linear-gradient(to bottom, rgba(244,235,216,0.04) 1px, transparent 1px)",
        "radial-gold":
          "radial-gradient(circle at 50% 30%, rgba(212,164,74,0.18), transparent 60%)",
        "radial-navy":
          "radial-gradient(125% 125% at 50% 10%, #08080f 40%, #1c2a4d 100%)",
      },
      backgroundSize: {
        "grid-32": "32px 32px",
      },
    },
  },
  plugins: [],
};
