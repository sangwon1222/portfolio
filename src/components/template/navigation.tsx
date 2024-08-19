"use client";
import { useTheme } from "next-themes";
import { darkModeState } from "@/recoil/state";
import Image from "next/image";
import Link from "next/link";
import { useRecoilValue, useSetRecoilState } from "recoil";

export default function Navigation() {
  const { systemTheme, theme, setTheme } = useTheme();
  const currentTheme = theme === "system" ? systemTheme : theme;

  const darkModeValue = useRecoilValue(darkModeState);
  const setDarkMode = useSetRecoilState(darkModeState);
  const changeDarkMode = () => {
    setTheme(currentTheme === "dark" ? "light" : "dark");
  };

  return (
    <div className={`sticky top-0 flex items-center z-20 min-w-[320px] h-80 px-10 dark:text-white text-gray-800 border-b backdrop-blur-3xl`}>
      <div className="flex justify-between items-center m-auto  w-full max-w-[1280px]">
        <Link href="/">
          <Image
            src={currentTheme === "dark" ? `/assets/logo-white.png` : `/assets/logo-color.png`}
            alt="logo"
            width="100"
            height="40"
            className="w-auto h-50"
          />
        </Link>
        <div className="flex items-center h-80">
          <Link href="#about" className="h-full px-4 desktop:px-20 tablet:px-10 center-layout text-20 hover:text-25 duration-200">
            About
          </Link>

          <Link href="#experience" className="h-full px-4 desktop:px-20 tablet:px-10 center-layout text-20 hover:text-25 duration-200">
            Experience
          </Link>

          <Link href="/game" className="h-full px-4 desktop:px-20 tablet:px-10 center-layout text-20 hover:text-25 duration-200">
            Game
          </Link>

          <button className={`rounded-full w-64 h-34 mx-16 bg-gray-600`} onClick={changeDarkMode}>
            <div className={`dark:ml-4 ml-30 duration-300 bg-gray-800 w-30 h-30 center-layout rounded-full`}>
              <svg
                stroke="currentColor"
                fill="currentColor"
                strokeWidth="0"
                viewBox="0 0 24 24"
                className="text-white"
                height="1em"
                width="1em"
                xmlns="http://www.w3.org/2000/svg"
              >
                {currentTheme === "dark" ? (
                  <path d="M12 3a9 9 0 1 0 9 9c0-.46-.04-.92-.1-1.36a5.389 5.389 0 0 1-4.4 2.26 5.403 5.403 0 0 1-3.14-9.8c-.44-.06-.9-.1-1.36-.1z" />
                ) : (
                  <path d="M12 7c-2.76 0-5 2.24-5 5s2.24 5 5 5 5-2.24 5-5-2.24-5-5-5zM2 13h2c.55 0 1-.45 1-1s-.45-1-1-1H2c-.55 0-1 .45-1 1s.45 1 1 1zm18 0h2c.55 0 1-.45 1-1s-.45-1-1-1h-2c-.55 0-1 .45-1 1s.45 1 1 1zM11 2v2c0 .55.45 1 1 1s1-.45 1-1V2c0-.55-.45-1-1-1s-1 .45-1 1zm0 18v2c0 .55.45 1 1 1s1-.45 1-1v-2c0-.55-.45-1-1-1s-1 .45-1 1zM5.99 4.58a.996.996 0 0 0-1.41 0 .996.996 0 0 0 0 1.41l1.06 1.06c.39.39 1.03.39 1.41 0s.39-1.03 0-1.41L5.99 4.58zm12.37 12.37a.996.996 0 0 0-1.41 0 .996.996 0 0 0 0 1.41l1.06 1.06c.39.39 1.03.39 1.41 0a.996.996 0 0 0 0-1.41l-1.06-1.06zm1.06-10.96a.996.996 0 0 0 0-1.41.996.996 0 0 0-1.41 0l-1.06 1.06c-.39.39-.39 1.03 0 1.41s1.03.39 1.41 0l1.06-1.06zM7.05 18.36a.996.996 0 0 0 0-1.41.996.996 0 0 0-1.41 0l-1.06 1.06c-.39.39-.39 1.03 0 1.41s1.03.39 1.41 0l1.06-1.06z" />
                )}
              </svg>
            </div>
          </button>
        </div>
      </div>
    </div>
  );
}
