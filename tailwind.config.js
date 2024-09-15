/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'selector',
  content: [
    './src/**/*.{js,ts,jsx,tsx,vue}',
  ],
  theme: {
    extend: {},
  },
  plugins: [
    require('tailwindcss-primeui'),
  ],
}

