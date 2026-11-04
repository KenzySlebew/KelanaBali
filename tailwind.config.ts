import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          teal: "#19C3C3",
          deepTeal: "#0B6E73",
          dark: "#0F1414",
          secondary: "#5B6666",
          surface: "#F6F8F8",
          pillDark: "#1A1A1A",
          mutedBorder: "#E5EAEA",
        },
      },
      fontFamily: {
        sans: ["var(--font-inter)", "Inter", "sans-serif"],
        serif: ["var(--font-newsreader)", "Newsreader", "Georgia", "serif"],
        script: ["var(--font-caveat)", "Caveat", "cursive"],
      },
      borderRadius: {
        "2xl": "16px",
        "3xl": "24px",
        "4xl": "32px",
      },
      boxShadow: {
        soft: "0 12px 36px -8px rgba(15, 20, 20, 0.08)",
        float: "0 20px 48px -10px rgba(11, 110, 115, 0.15)",
        card: "0 4px 20px rgba(0, 0, 0, 0.04)",
      },
    },
  },
  plugins: [],
};

export default config;

