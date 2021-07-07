const colors = require("tailwindcss/colors");

module.exports = {
  purge: ["./**/*.html"],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      colors: {
        amber: "#574b2c",
      },
    },
  },
  variants: {
    extend: { backgroundColor: ["active"] },
  },
  plugins: [],
};
