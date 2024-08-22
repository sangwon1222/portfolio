"use client";

import Image from "next/image";
import Link from "next/link";
import { useTheme } from "next-themes";

export default function TnotFound() {
  const { systemTheme, theme } = useTheme();
  const currentTheme = theme === "system" ? systemTheme : theme;
  return (
    <>
      <Link href="/" className="flex flex-col items-center gap-4">
        <Image
          src={currentTheme === "dark" ? "/assets/logo-white.png" : "/assets/logo-color.png"}
          alt="logo"
          width={100}
          height={50}
          placeholder="blur"
          blurDataURL="/assets/logo-white.png"
          style={{ width: 100, height: 50 }}
        />
        <h2 className="dark:text-red-400 text-red-800">404</h2>
      </Link>
      <p>PAGE NOT FOUND</p>
    </>
  );
}
