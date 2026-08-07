/** @type {import('tailwindcss').Config} */
export default {
   content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        espresso: {
          950: '#140D09',
          900: '#1C1410',
          800: '#2A1F19',
          700: '#3B2B22',
          600: '#4E3A2E',
        },
        cream: '#F5EDE4',
        parchment: '#E9DFCF',
        gold: {
          400: '#D9A257',
          500: '#C68B3D',
          600: '#A96F28',
        },
        sage: {
          400: '#8FAE8A',
          500: '#7A9B76',
          600: '#5F8259',
        },
        rust: '#B0503A',
      },
      fontFamily: {
        display: ['"Fraunces"', 'serif'],
        body: ['"Inter"', 'sans-serif'],
      },
      backgroundImage: {
        'perforation': 'radial-gradient(circle, rgba(20,13,9,1) 3px, transparent 3px)',
      },
      backgroundSize: {
        'perf': '14px 14px',
      },
    },
  },
  plugins: [],
}