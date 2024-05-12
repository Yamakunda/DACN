import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      fontFamily: {
        sans: ['--font-mulish', "sans-serif"],
        poppins:['var(--font-poppins)',"sans-serif"],
        k2d:['var(--font-k2d)',"sans-serif"],
        montserrat:['var(--font-montserrat)',"sans-serif"],
        nunito:['var(--font-nunito)',"sans-serif"]
        // Add more custom font families as needed
      },
    },
  },
  plugins: [],
};
export default config;
