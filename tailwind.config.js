/** @type {import('tailwindcss').Config} */
module.exports = {
    content: ["./src/**/*.{html,js}"],
    theme: {
      extend: {
        colors: {
          booktok: {
            primary: '#140900',
            primaryLight: '#71490C',
            accent: '#713A86',
            accentLight: '#A774B8',
            background: '#FFFCF8',
          },
        },
        fontFamily: {
          lato: ['Lato', 'sans-serif'],
          playfair: ['Playfair Display', 'serif'],
        },
      },
    },
    plugins: [],
  }