"use client";
import { useTheme } from "next-themes";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import ListBtn from "@/components/atoms/aListBtn";
import DarkBtn from "@/components/atoms/aDarkBtn";

export default function Navigation() {
  const router = useRouter();
  const { systemTheme, theme } = useTheme();
  const currentTheme = theme === "system" ? systemTheme : theme;

  const [mobileNavList, setOpenNavList] = useState(false);

  const openNavList = () => {
    setOpenNavList((v) => !v);
    if (mobileNavList) document.body.classList.remove("overflow-hidden");
    else document.body.classList.add("overflow-hidden");
  };

  const goPage = (pageName: string) => {
    document.body.classList.remove("overflow-hidden");
    setOpenNavList(false);
    router.push(pageName);
  };

  return (
    <div
      className={`sticky top-0 z-20 min-w-[320px] w-full dark:text-white text-gray-800 border-b backdrop-blur-3xl ${mobileNavList ? "h-screen" : "h-80 overflow-hidden"} duration-200`}
    >
      <div className="flex flex-col justify-start w-full max-w-[1280px] m-auto">
        <div className="flex justify-between items-center w-full">
          <ListBtn isOpen={mobileNavList} openEvent={openNavList} />

          <Link href="/">
            {currentTheme === "dark" ? (
              <Image
                src="/assets/logo-white.png"
                alt="logo"
                width={100}
                height={50}
                placeholder="blur"
                blurDataURL="/assets/logo-white.png"
                style={{ width: 100, height: 50 }}
              />
            ) : (
              <Image
                src="/assets/logo-color.png"
                alt="logo"
                width={100}
                height={50}
                placeholder="blur"
                blurDataURL="/assets/logo-color.png"
                style={{ width: 100, height: 50 }}
              />
            )}
          </Link>
          <div className="flex items-center h-80">
            <div className="items-center h-full hidden desktop:flex tablet:flex text-20">
              <Link href="/#about" className="px-10 center-layout h-full hover:animate-wiggle">
                About
              </Link>

              <Link href="/#experience" className="px-10 center-layout h-full hover:animate-wiggle">
                Experience
              </Link>

              <Link href="/game" className="px-10 center-layout h-full text-20 hover:animate-wiggle">
                Game
              </Link>
            </div>

            <DarkBtn />
          </div>
        </div>

        {/* MOBILE NAV */}
        <div className={`flex flex-col w-full `}>
          <button onClick={() => goPage("/#about")} className="py-20 px-30 text-24 text-start">
            About
          </button>

          <button onClick={() => goPage("/#experience")} className="py-20 px-30 text-24 text-start">
            Experience
          </button>

          <button onClick={() => goPage("/game")} className="py-20 px-30 text-24 text-start">
            Game
          </button>
        </div>
      </div>
    </div>
  );
}
