/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
      },
      keyframes: {
        "money-float": {
          "0%": { transform: "translateY(0) rotate(0deg)", opacity: 1 },
          "50%": {
            transform: "translateY(-20vh) rotate(360deg)",
            opacity: 0.8,
          },
          "100%": { transform: "translateY(-40vh) rotate(720deg)", opacity: 0 },
        },
      },
      animation: {
        "money-float": "money-float 6s linear infinite",
      },
    },
  },
  plugins: [],
};
