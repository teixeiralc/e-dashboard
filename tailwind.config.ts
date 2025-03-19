/** @type {import('tailwindcss').Config} */
const config = {
  content: [
    './app/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
    './pages/**/*.{js,ts,jsx,tsx}',
    './node_modules/@shadcn/ui/dist/**/*.js',
  ],
  theme: {
    extend: {
      colors: {
        primary: '#2EC4B6', // Your emphasis color
      },
    },
  },
  plugins: [],
}

export default config
