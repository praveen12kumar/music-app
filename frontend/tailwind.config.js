/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        'poppins': ['Poppins', 'sans-serif'],
        'roboto': ['Roboto', 'sans-serif'],
        'nunito': ['Nunito', 'sans-serif'],
      },
      keyframes:{
        moveUp:{
          '0%':{
            transform: 'translateY(2px)'
          },
          '100%':{
            transform: 'translateY(0px)'
          }
        }
      },
      animation:{
        moveUp: 'moveUp 0.2s ease-in-out'
      }
    },
  },
  plugins: [],
}