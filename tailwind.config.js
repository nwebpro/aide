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
        'theme-primary': '#9155FD',
        'theme-secondary': '#F4F5FA',
        'theme-text': 'rgba(58, 53, 65, 0.87)',
        'theme-body': 'rgba(58, 53, 65, 0.68)',
      },
      boxShadow: {
        'shadow': '0 4px 80px rgba(0, 0, 0, 0.1)',
        'btn-shadow': '0px 4px 8px -4px rgba(58, 53, 65, 0.42)',
      },
    },
  },
  plugins: [require("daisyui")],
}