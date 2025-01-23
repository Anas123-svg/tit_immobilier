/** @type {import('tailwindcss').Config} */
export default {
  darkMode: ["class"],
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx,vue}"],
  important:true,
  theme: {
    extend: {
      fontFamily: {
        prata: ["Prata", "sans-serif"],
      },

      colors: {
        primary: {
          DEFAULT: "#EB6F2D",
          light: "#F19D64",   // Lighter shade for hover effects
          dark: "#C25315",    // Darker shade for borders or text
        },
        secondary: {
          DEFAULT: "#1692BA",
          light: "#4AB9DB",   // Lighter shade for hover effects
          dark: "#0E7191",    // Darker shade for borders or text
        },
        offwhite: {
          DEFAULT: "#F7F7F7",
          light: "#FFFFFF",   // Pure white for highlights
          dark: "#E6E6E6",    // Slightly darker shade for backgrounds
        },
        dullwhite: {
          DEFAULT: "#FBFBFB",
          light: "#FFFFFF",   // Pure white for highlights
          dark: "#EFEFEF",    // Slightly darker shade for contrast
        },
      },

      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
    },
    container: {
      center: true,
      padding: {
        DEFAULT: "1rem",
        sm: "2rem",
        lg: "2rem",
        xl: "3rem",
        "2xl": "4rem",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
};
