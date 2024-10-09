import type { Config } from "tailwindcss";
import customSpace from "./customSpace";

const config: Config = {
  darkMode: "class",
  content: ["./src/pages/**/*.{js,ts,jsx,tsx,mdx}", "./src/components/**/*.{js,ts,jsx,tsx,mdx}", "./src/app/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      // fontSize: customSpace,
      // margin: customSpace,
      // padding: customSpace,
      // gap: customSpace,
      // height: customSpace,
      // minHeight: customSpace,
      // width: customSpace,
      // minWidth: customSpace,
      // maxWidth: customSpace,
      screens: {
        tablet: "751px",
        desktop: "1280px",
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic": "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      fontFamily: {
        gMarketSans: ["var(--my-custom-font)"],
        serif: ["var(--my-custom-font)"],
        sans: ["var(--noto_sans_kr)"], // fonts.ts에서 variable로 설정한 CSS 변수를 불러와 적용합니다.
      },
      colors: {
        main: {
          0: "#e28185",
          1: "#bf5155",
          2: "#97282C" /**main color */,
          3: "#700a0e",
        },
        hover: {
          1: "#b7494d",
        },
        sub: {
          1: "#ffffff",
        },
      },
      animation: {
        wiggle: "wiggle 0.5s ease-in-out forwards",
        "pulse-fast": "pulse 0.5s infinite",
      },
      keyframes: {
        wiggle: {
          "0%": { transform: "rotate(-3deg)" },
          "25%": { transform: "rotate(3deg)" },
          "50%": { transform: "rotate(-3deg)" },
          "75%": { transform: "rotate(3deg)" },
          "100%": { transform: "rotate(0)" },
        },
      },
    },
  },
  plugins: [],
};
export default config;
