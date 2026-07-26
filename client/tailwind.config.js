/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        slate: {
          950: '#0a0e17',
          900: '#131b2e',
          800: '#1e293b'
        }
      }
    },
  },
  plugins: [],
}
