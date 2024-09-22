const { light } = require("@mui/material/styles/createPalette");

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#0B1518",
        secondary: "#00f6ff",
        light: "#537C9F",
        light2: "#213e45",
        light3: "#9aa9ac",
        dimWhite: "rgba(255, 255, 255, 0.7)",
        dimBlue: "rgba(9, 151, 124, 0.7)",
        page_background: "#0B1518",
        page_background2: "#0B1518",                            
        homebackground: "#0B1518",
        bg1: "#121418",
        bg2: "#0e141e",
        bg3: "#1f202a", // card bg
        bg4: "#27272b", // dropdown bg of topbar
        card_hover_bg: "#35363f",
        textSecondary: "#a0aec0", // Gray 400
        thirdText: "#6687ff",
        textBlueGray: "#83839e",
        accent: "#10b981", // Emerald 500
        buttonBg: "#2EC866", // Emerald 600
        buttonBg2: "#5792ee", // Emerald 600
        buttonHover: "#28A55F", // Emerald 700
        borderColor: "#2d3748", // Gray 700
      },
      fontFamily: {
        poppins: ["Poppins", "sans-serif"],
      },
    },
    screens: {
      xs: "480px",
      ss: "620px",
      sm: "768px",
      md: "1060px",
      lg: "1200px",
      xl: "1700px",
    },
  },
  plugins: [],
};
