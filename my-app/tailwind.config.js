/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html,js,ts,tsx}"
  ],
  theme: {
    screens : {
      'sm' : '500px',
      'lg' : '800px',
      'xs': {'max': '500px'},
    },
    extend: {},
  },
  plugins: [],
}

