/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        nest: {
          teal: '#177b70',
          forest: '#17313a',
          mist: '#f5f7f6',
          sage: '#e7f3f0',
          ink: '#21313a',
        },
      },
    },
  },
  plugins: [],
};
