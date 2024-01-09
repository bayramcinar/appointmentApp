/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        stepBorder1: "#b1babf",
        text: "#fff",
        dayComponentBg: "#f1f2f6",
        lightBlue: "#4e9bfe",
        greenForTable: "#01e2b4",
        grayForTable: "#dbdada",
        calanderAppointment: "#FF9800",
        appointmentRequest: "#5D3587",
        royalPurple: "hsl(330, 100%, 50%)",
        vividOrange: "hsl(48, 100%, 50%)",
        deepSlateBlue: "hsl(270, 100%, 29.75%)",
        coral: "hsl(0, 89.87%, 60.5%)",
      },
    },
  },
  plugins: [],
};
