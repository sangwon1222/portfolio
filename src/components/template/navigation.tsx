"use client";
import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import ListBtn from "@/components/atoms/aListBtn";
import DarkBtn from "@/components/atoms/aDarkBtn";
import useTheme from "@/app/[locale]/providers/theme/useTheme";
import useListMobile from "@/app/[locale]/providers/listMobile/useListMobile";
import { memo } from "react";

const btnList = [
  { label: "About", href: "/#about" },
  { label: "Experience", href: "/#experience" },
  { label: "Game", href: "/game" },
];

const Navigation: React.FC = memo(() => {
  const router = useRouter();
  const { theme } = useTheme();
  const { open, setListMobile } = useListMobile();

  const goPage = (pageName: string) => {
    setListMobile(false);
    router.push(pageName);
  };

  const pathname = usePathname();
  const hasNotNavigation = pathname.split("/").length > 3 && pathname.includes("/game/");
  if (hasNotNavigation) return null;
  else
    return (
      <div className="sticky top-0 z-20 min-w-[320px] w-full shadow-lg backdrop-blur-3xl h-20">
        <div className="flex flex-col justify-start w-full max-w-[1280px] m-auto font-bold">
          <div className="flex justify-between items-center w-full">
            <ListBtn />

            <Link href="/">
              <Image
                src={theme === "dark" ? "/assets/logo-white.png" : "/assets/logo-color.png"}
                alt="logo"
                width={100}
                height={50}
                placeholder="blur"
                blurDataURL="/assets/logo-white.png"
                style={{ width: 100, height: 50 }}
                priority={false}
              />
            </Link>
            <div className="flex items-center h-20">
              <div className="items-center h-full hidden desktop:flex tablet:flex text-sm">
                {btnList.map(({ label, href }, i) => (
                  <Link
                    href={href}
                    key={`${label}-i`}
                    aria-label={`${label}-button`}
                    className="px-2 center-layout h-full hover:animate-wiggle dark:hover:text-red-400 hover:text-red-600"
                  >
                    {label}
                  </Link>
                ))}
              </div>

              <DarkBtn />
              <Link href="https://github.com/sangwon1222">
                <Image src="/assets/Git_icon.png" width={40} height={40} className="w-10 h-10" alt="git_icon" priority={false} />
              </Link>
            </div>
          </div>

          {/* MOBILE NAV */}
          <div className={`desktop:hidden tablet:hidden ${open ? "flex" : "hidden"} flex-col w-full h-screen dark:bg-gray-800 bg-gray-200 text-base`}>
            {btnList.map(({ label, href }, i) => (
              <button onClick={() => goPage(href)} key={`${label}-button-${i}`} className="py-5 px-7 text-start" aria-label={`go ${label} page`}>
                {label}
              </button>
            ))}
          </div>
        </div>
      </div>
    );
});

Navigation.displayName = "Navigation";

export default Navigation;
