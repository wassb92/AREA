/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      /* Custom Screens Breakpoints */
      screens: {
        sm: "640px",
        md: "768px",
        lg: "1024px",
        xl: "1280px",
        "2xl": "1536px",
      },
      /* Custom Color */
      colors: {
        main: "#6b21a8",
        secondary: "#6366f1",
        soft: "#9333ea",
      },
    },
  },
  plugins: [],
};
