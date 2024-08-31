/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html,ts}",
  ],
  theme: {
    extend: {
      colors: {
        'main' : '#9199b0',
        'textfoo': '#3d3d3d'
      },
    },
  },
  plugins: [],
}

