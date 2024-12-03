"use client";

import { memo, useEffect } from "react";
import useTheme from "@/app/providers/theme/useTheme";
import { ThemeDarkIcon } from "../atoms/ThemeDarkIcon";
import { ThemeWhiteIcon } from "../atoms/ThemeWhiteIcon";

const ThemeBtn = memo(() => {
  const { theme, toggleTheme } = useTheme();

  useEffect(() => {
    document.documentElement.classList.toggle("dark", theme === "dark");

    localStorage.setItem("theme", theme);
  }, [theme]);

  return (
    <button
      className="rounded w-16 h-10 dark:bg-slate-400  bg-slate-200"
      onClick={toggleTheme}
      aria-label="dark mode button"
    >
      <div className="dark:ml-1 ml-8 duration-200 bg-gray-800  w-7 h-7 center-layout rounded">
        {theme === "dark" ? <ThemeDarkIcon /> : <ThemeWhiteIcon />}
      </div>
    </button>
  );
});

ThemeBtn.displayName = "ThemeBtn";
export default ThemeBtn;
