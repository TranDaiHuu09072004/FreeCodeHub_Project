/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        light: {
          body: "#ffffff",
          section: "#f3f0fa",
          color: "#000",
        },
        dark: {
          body: "#121826",
          section: "#1A1F2B",
          color: "#fff",
        },
      },
    },
  },
  plugins: [],
};
