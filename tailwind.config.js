/** @type {import('tailwindcss').Config} */
export default {
  darkMode: ["class"],
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx,vue}"],
  theme: {
    extend: {
      fontFamily: {
        prata: ["Prata", "sans-serif"],
      },

      colors: {
        primary: "#EB6F2D",
        secondary: "#1692BA",
        offwhite : "#F7F7F7",
        dullwhite : "#FBFBFB"
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
    },
    container : {
      center : true,
      padding: {
        DEFAULT: '1rem',
        sm: '2rem',
        lg: '2rem',
        xl: '3rem',
        '2xl': '4rem',
      },
    }
  },
  plugins: [require("tailwindcss-animate")],
};
