/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js,jsx,ts,tsx}"],
  theme: {
    extend: {},
  },
  plugins: [require("daisyui")],
  daisyui: {
    themes: [
      {
        mytheme: {

          "primary": "#2e4912",

          "secondary": "#aa7a1b",

          "accent": "#90b673",

          "neutral": "#86efac",

          "base-100": "#fff",

          "info": "#85a139",

          "success": "#FFDF37",

          "warning": "#e89008",

          "error": "#d1470b",

          "negro": "#000000",

          "blanco": "#ffffff",
        },
      },
      "forest"
    ],
  },
}

