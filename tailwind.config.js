/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        junino: {
          green: {
            DEFAULT: '#2D5A3C',
            light: '#3C744D',
            dark: '#1C3B27',
            deep: '#122619',
          },
          straw: {
            DEFAULT: '#EFDCAB',
            light: '#FFF7E5',
            dark: '#D8C38E',
          },
          fire: {
            50: '#FFF7ED',
            100: '#FFEDD5',
            200: '#FED7AA',
            400: '#FB923C',
            500: '#F97316',
            600: '#EA580C',
            700: '#C2410C',
          },
          cordel: '#3E2723',
          night: '#0B131F',
          gold: '#F59E0B',
        }
      },
      fontFamily: {
        sans: ['"Arimo"', 'system-ui', 'sans-serif'],
        display: ['"Londrina Solid"', 'system-ui', 'cursive'],
        serif: ['"Playfair Display"', 'serif'],
      },
      boxShadow: {
        'festive': '0 10px 30px -10px rgba(234, 88, 12, 0.3)',
        'glow': '0 0 25px -5px rgba(245, 158, 11, 0.4)',
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
      }
    },
  },
  plugins: [],
}
