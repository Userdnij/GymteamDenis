/** @type {import('tailwindcss').Config} */
module.exports = {
  purge: ['./app/**/*.{js,ts,jsx,tsx}', './components/**/*.{js,ts,jsx,tsx}'],
  darkMode: false,
  theme: {
    extend: {
      colors: {
        primary: '#FF0000',
        secondary: '#00FF00',
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
