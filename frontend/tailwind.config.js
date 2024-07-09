/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        'sign-in': "url('/assets/SignIn.svg')",
      },
    },
  },
  plugins: [],
}