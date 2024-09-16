/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#25A244",
        secondary: "#F77F00",
        "light-gray": "#f9f9f9",
      },
    },
  },
  plugins: [],
};
