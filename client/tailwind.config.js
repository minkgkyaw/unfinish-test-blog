const defaultTheme = require("tailwindcss/defaultTheme");

module.exports = {
  content: ["./index.html", "./src/**/*.{vue,js,ts,jsx,tsx}"],
  darkMode: 'class',
  theme: {
    extend: {
      fontFamily: {
        sans: ["'Roboto', sans-serif;", ...defaultTheme.fontFamily.sans],
      },
    },
    fontFamily: {
      abel: ["'Abel', sans-serif;"],
      play: ["'Playfair Display', serif;"],
      poppins: [" 'Poppins', sans-serif;"],
    },
  },
  plugins: [
    require("@tailwindcss/line-clamp"),
    require("@tailwindcss/typography"),
    require("@tailwindcss/forms"),
  ],
};
