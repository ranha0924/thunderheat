import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        paper: "#FAF7F1",
        terracotta: {
          DEFAULT: "#D9684A",
          soft: "#FFE3D9",
          deep: "#B22A0F",
        },
        butter: {
          DEFAULT: "#F5D26B",
          soft: "#FFF6BF",
        },
        lavender: {
          DEFAULT: "#D9D1EC",
          deep: "#9B8DC9",
        },
        sage: {
          DEFAULT: "#C7E6BF",
          deep: "#7BA86F",
        },
        ink: {
          900: "#16120D",
          700: "#3A332A",
          500: "#6E665A",
          400: "#9C9486",
          200: "#D6D0C2",
          100: "#E8E3D6",
        },
      },
      fontFamily: {
        sans: ["Pretendard", "system-ui", "sans-serif"],
      },
      letterSpacing: {
        tight: "-0.01em",
        korean: "-0.005em",
      },
      borderRadius: {
        card: "16px",
        chip: "9999px",
      },
      boxShadow: {
        paper: "0 1px 0 rgba(20,20,19,0.04), 0 4px 12px rgba(20,20,19,0.04)",
        "paper-soft": "0 1px 2px rgba(20,20,19,0.04)",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
};
export default config;
