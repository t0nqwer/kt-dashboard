/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        Athiti: ["Athiti", "sans-serif"],
        Tenor: ["Tenor Sans", "sans-serif"],
      },
      colors: {
        primary: "#A1000E",
        secondary: {
          red: "#B51530",
          gray: "#6D6E71",
          light: "#F1F2F2",
          cream: "#FFEBCC",
        },
      },
      animation: {
        slidedown: "slidedown 0.4s ease-in-out ",
        slideup: "slideup 0.4s ease-in-out",
        slideout: "slideout 0.4s ease-in-out",
        slowspin: "spin 2s linear infinite",
        fadein: "fadein 0.4s ease-in-out",
        fadeout: "fadeout 0.4s ease-in-out",
      },
      keyframes: {
        slidedown: {
          "0%": { transform: "translateY(-100%)" },
          "100%": { transform: "translateY(0)" },
        },
        slideup: {
          "0%": { transform: "translateY(100%)" },
          "100%": { transform: "translateY(0)" },
        },
        slideout: {
          "0%": { transform: "translateY(0)" },
          "100%": { transform: "translateY(-100%)" },
        },
        fadein: {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        fadeout: {
          "0%": { opacity: "1" },
          "100%": { opacity: "0" },
        },
      },
      wiggle: {
        "0%, 100%": { transform: "rotate(-3deg)" },
        "50%": { transform: "rotate(3deg)" },
      },
    },
  },
  plugins: [],
};
