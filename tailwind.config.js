/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./src/**/*.{js,ts,jsx,tsx,mdx}"
  ],
  theme: {
    extend: {
      colors: {
        primary: '#B29A6C',
        primaryHover: '#A89063',
        main: '#333333',
        sub: '#777777',
      },
      keyframes: {
        opacity: {
          'from': { opacity: '0' },
          'to': { opacity: '1' }
        }
      },
      animation: {
        opacity: 'opacity .1s ease-in',
      }
    },
  },
  plugins: [
    require('tailwind-scrollbar'),
    require('tailwind-scrollbar-hide'),
  ],
}
// #A89063
// #E0C696
// #B29A6C
// #867145
// #5C4A20
// #352600
