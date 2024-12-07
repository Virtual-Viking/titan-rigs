/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#ffffff', // White background
        secondary: '#f5f5f5', // Light gray background
        textMain: '#000000', // Black text
        accent: '#facc15', // Vibrant yellow for buttons
        darkBlue: '#1e293b', // Dark blue background for sections
        lightBlue: '#e0f2fe', // Light blue background for highlights
      },
    },
  },
  plugins: [],
};