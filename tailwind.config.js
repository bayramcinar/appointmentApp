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
        mistikBlue: "#314C93",
        lightMistikBlue: "#0091CC",
        premiumPurple: "hsl(7, 90%, 64%)",
        purpleBg: "hsl(10, 100%, 95%)",
      },
      backgroundImage: {
        gradient:
          "linear-gradient(360deg, rgba(237,20,91,1) 0%, rgba(107,36,101,1) 100%)",
      },
    },
  },
  plugins: [],
};
