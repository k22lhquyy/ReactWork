/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './src/**/*.{html,js,jsx,ts,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: "#05B6D3"
      },
      backgroundImage:{
        'login-bg-img': "url('/src/assets/images/login.jpg')",
        'signup-bg-img': "url('/src/assets/images/signup-bg.jpg')",
      }
    },
  },
  plugins: [],
}

