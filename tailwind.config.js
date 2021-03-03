module.exports = {
  purge: ["./index.html", "./src/**/*.{vue,js,ts,jsx,tsx}"],
  darkMode: "media",
  theme: {
    extend: {
      colors: {
        cream: "#eff0eb",
      },
      transitionTimingFunction: {
        "back-bounce": "cubic-bezier(1, 1.97, 0.63, 0.77)",
      },
      scale: {
        500: "5",
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
