// https://fonts.google.com/variablefonts 여기에서 Fonts를 찾아서 추가합니다.
import localFont from "next/font/local";
// Font의 classnames를 합치는 공통 함수
const sumClass = (...classnames: string[]) => {
  return classnames.join(" ");
};

export const FontClassNames = localFont({
  src: [
    {
      path: "../../public/assets/fonts/GmarketSansLight.woff",
      weight: "300",
      style: "normal",
    },
    {
      path: "../../public/assets/fonts/GmarketSansMedium.woff",
      weight: "400",
      style: "normal",
    },
    {
      path: "../../public/assets/fonts/GmarketSansBold.woff",
      weight: "700",
      style: "normal",
    },
  ],
  variable: "--my-custom-font",
  display: "swap",
});
