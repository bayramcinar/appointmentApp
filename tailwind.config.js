/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      colors: {
        stepBorder1:"#b1babf",
        appoinmentBox:"#1bce94",
        text:"#fff",
        buttonColor:"#112469",
        dayComponentBg:"#f1f2f6",
        backButtonColor:"#c8d0dd",
        callNowButtonColor:"#1dbab5",
      }
    },
  },
  plugins: [],
}