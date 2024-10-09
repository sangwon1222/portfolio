"use client";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";

const newDate = new Date();
const year = newDate.getFullYear();
const month = `0${newDate.getMonth() + 1}`.slice(-2);
const day = newDate.getDate();
const today = `${year}${month}${day}`;

const isDeviceIOS = /iPad|iPhone|iPod/.test(window.navigator.userAgent.toLowerCase());
const askedDate = localStorage.getItem("a");

export default function InstallPrompt() {
  const refPwa = useRef<HTMLDivElement>(null);
  const [pwaPrompt, setPrompt] = useState<any>(null);

  const handleBeforeInstallPrompt = (e: any) => {
    e.preventDefault();
    setPrompt(e);
  };

  useEffect(() => {
    refPwa.current?.classList.remove("-top-[400px]");
    refPwa.current?.classList.add("top-4");
    window.addEventListener("beforeinstallprompt", handleBeforeInstallPrompt);

    return () => window.removeEventListener("beforeinstallprompt", handleBeforeInstallPrompt);
  }, [pwaPrompt, today]);

  const install = () => {
    if (pwaPrompt) pwaPrompt.prompt();
    refPwa.current?.classList.remove("top-4");
    refPwa.current?.classList.add("-top-[400px]");
  };

  const unInstall = () => {
    localStorage.setItem("a", `${today}`);
    refPwa.current?.classList.remove("top-4");
    refPwa.current?.classList.add("-top-[400px]");
  };

  return askedDate == `${today.toString()}` || isDeviceIOS ? null : (
    <div
      ref={refPwa}
      className={`
        overflow-hidden
        fixed 
        -top-[400px] 
        right-0 rounded 
        flex 
        flex-col 
        gap-3 
        p-3 
        w-[320px] 
        duration-300 
        z-30 
        text-sm 
        font-bold 
        desktop:right-1 
        tablet:right-1 
        select-none
        shadow-xl
        bg-gray-100
        dark:bg-gray-500
      `}
    >
      <p>Install App?</p>
      <div className="flex gap-10 w-full">
        <div className="relative bg-white rounded-md p-10 w-[100px] h-[100px]">
          <Image
            src="/assets/icon-192x192.png"
            alt="logo"
            className="aspect-square object-contain"
            fill
            priority={false}
          />
        </div>
        <div className="flex flex-col gap-1">
          <p>LSW App</p>
        </div>
      </div>
      <div className="grid grid-cols-2 gap-1">
        <button
          className="border-main-2 border-2 py-1 rounded"
          onClick={unInstall}
          aria-label="App 설치 팝업 닫기 버튼"
        >
          취소
        </button>
        <button className="py-1 rounded text-white bg-main-2" onClick={install} aria-label="App 설치 버튼">
          APP 설치
        </button>
      </div>
    </div>
  );
}
