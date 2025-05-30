/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        Montserrat: "Montserrat",
      },
      colors: {
        primaryColor: "#141523",
        secondaryColor: "#212134",
        cardBackground: "#222339",
        buttonBackground: "#01D676",
        sidebarBackground: "#1e333c",
        grayColor: "#a9a9ca",
      },
      animation: {
        'infinite-scroll': 'infinite-scroll 45s linear infinite',
        clicking: 'clicking .5s ease-in-out infinite',
          'up-down': 'upDown 0.5s ease-in-out',
      },
      keyframes: {
        'infinite-scroll': {
          from: { transform: 'translateX(0)' },
          to: { transform: 'translateX(calc(-100% + 16rem))' },
        },
        clicking: { // Add this section
          '0%, 100%': { transform: 'scale(1)' }, // Normal size
          '50%': { transform: 'scale(0.9)' },   // Slightly smaller
        },
        upDown: {
          '0%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-10px)' },  // Move up
          '100%': { transform: 'translateY(0)' },      // Move back down
        },
      },
      backgroundImage: {
        'green-gradient': 'linear-gradient(to top, #224446 0%, #212235 50%)',
        'red-gradient': 'linear-gradient(to top, #402432 0%, #212235 50%)',
        'slate-gradient': 'linear-gradient(to top, #303950 0%, #212235 50%)',
        'gray-gradient': 'linear-gradient(to top, #2B3A4D 0%, #212235 50%)',
      },
    },
  },
  plugins: [
    require("tailwind-scrollbar"),
    require("daisyui"),
  ],
  daisyui: {
    themes: [
      {
        mytheme: {
          primary: "#1a73e8",
          secondary: "#f6d860",
          accent: "#37cdbe",
          neutral: "#3d4451",
          "base-100": "#ffffff",
        },
      },
    ],
  },
};
