/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: [
          "Inter",
          "-apple-system",
          "BlinkMacSystemFont",
          "Segoe UI",
          "Roboto",
          "Helvetica Neue",
          "Arial",
          "sans-serif",
        ],
        serif: ["Source Serif 4", "Georgia", "Times New Roman", "serif"],
      },
      colors: {
        paper: "#fafaf8",
        ink: "#1c1b19",
        muted: "#5c5a55",
        line: "#e4e2dc",
        accent: "#0f5f5a",
      },
    },
  },
  plugins: [],
};
