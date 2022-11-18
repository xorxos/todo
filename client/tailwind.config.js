/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      minWidth: {
        "1/2": "50%",
      },
      maxWidth: {
        "70": "70vw",
      }
    },
  },
  plugins: [],
};
