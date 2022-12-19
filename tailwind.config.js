/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
   "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    screens: {
      'sm': '576px',
      'md': '768px',
      'lg': '992px',
      'xl': '1170px'
    },
    extend: {
      colors: {
        'theme-primary': '#ff5a00',
        'theme-secondary': '#F2F4F5',
        'theme-text': '#303030',
        'theme-body': '#636a6f',
      },
      boxShadow: {
        'shadow': '0 4px 80px rgba(0, 0, 0, 0.1)',
      },
    },
  },
  plugins: [require("daisyui")],
}