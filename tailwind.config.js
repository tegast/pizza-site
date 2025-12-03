/** @type {import('tailwindcss').Config} */
export default {
  // Эта строчка включает ручное переключение темы:
  darkMode: 'selector', 
  
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}