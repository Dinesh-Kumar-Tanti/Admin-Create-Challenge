/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily:{
        inter: ['Inter', 'sans-serif'],
        poppins: ['Poppins', 'sans-serif'],
      }
    },
    screens:{
      xxsm:"380px",
      lxsm:"413px",
      xsm:"500px",
      lsm:"550px",
      sm:"640px",
      md:"768px",
      lmd:"900px",
      lg:"1024px",
      xlg:"1120px",
      xl:"1280px",
    }
  },
  plugins: [],
}
