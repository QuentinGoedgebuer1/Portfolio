// tailwind.config.js
module.exports = {
    content: [
        "./src/**/*.{html,ts}",
    ],
    theme: {
        extend: {
          fontFamily: {
            eurostile: ['"eurostile"', 'sans-serif'],
          },
        },
      },
    plugins: [require('tailwindcss-primeui')]
};