module.exports = {
  purge: ['./pages/**/*.{js,ts,jsx,tsx}', './components/**/*.{js,ts,jsx,tsx}'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      colors: {
        primary: "#051152",
        accent: "#6B6FE4",
      }
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
}
