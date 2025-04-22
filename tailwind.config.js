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
        animation: {
          'fade-in': 'fadeIn 0.3s ease-out',
        },
        keyframes: {
          fadeIn: {
            '0%': { opacity: 0, transform: 'translateY(10px)' },
            '100%': { opacity: 1, transform: 'translateY(0)' },
          },
        },
      },
    },
    plugins: [],
  }