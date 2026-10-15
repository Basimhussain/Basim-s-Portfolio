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
          "Schibsted Grotesk",
          "-apple-system",
          "BlinkMacSystemFont",
          "Segoe UI",
          "Roboto",
          "Helvetica Neue",
          "Arial",
          "sans-serif",
        ],
        arabic: ["Reem Kufi", "Noto Kufi Arabic", "Tahoma", "sans-serif"],
      },
      colors: {
        chalk: "#eef0ee",
        ink: "#11161b",
        muted: "#566068",
        line: "#d3d8d4",
        pine: "#0d3b36",
        night: "#151b22",
        brass: "#c7a15f",
        ivory: "#f3efe6",
      },
    },
  },
  plugins: [],
};
