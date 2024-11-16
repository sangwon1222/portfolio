"use client";

import useTheme from "@/app/providers/theme/useTheme";
import Image from "next/image";
import Link from "next/link";
import React from "react";

export const NotFoundTemplate: React.FC = () => {
  const { theme } = useTheme();
  return (
    <>
      <Link href="/" className="flex flex-col items-center gap-4">
        <Image
          src={theme === "dark" ? "/assets/logo-white.png" : "/assets/logo-color.png"}
          alt="logo"
          width={100}
          height={50}
          placeholder="blur"
          blurDataURL="/assets/logo-white.png"
          loading="eager"
          priority={true}
          style={{ width: 100, height: 50 }}
        />
        <h2 className="dark:text-red-400 text-red-800">404</h2>
      </Link>
      <p>PAGE NOT FOUND</p>
    </>
  );
};
