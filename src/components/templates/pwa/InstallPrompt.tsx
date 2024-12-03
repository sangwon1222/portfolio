"use client";
import Image from "next/image";
import { useCallback, useEffect, useRef, useState } from "react";

const newDate = new Date();
const year = newDate.getFullYear();
const month = `0${newDate.getMonth() + 1}`.slice(-2);
const day = newDate.getDate();
const today = `${year}${month}${day}`;

const isDeviceIOS = typeof window !== "undefined" && /iPad|iPhone|iPod/.test(window.navigator.userAgent.toLowerCase());

export default function InstallPrompt() {
  const refPwa = useRef<HTMLDivElement>(null);
  const [pwaPrompt, setPrompt] = useState<any>(null);
  const [askedDate, setAsked] = useState<string | null>(null);

  const isPwaInstalled = useCallback(
    () => (typeof window === "undefined" ? false : window.matchMedia("(display-mode: standalone)").matches),
    [],
  );

  useEffect(() => {
    const storedDate = localStorage.getItem("a") ?? "";
    setAsked(storedDate);
  }, []);

  useEffect(() => {
    const handleBeforeInstallPrompt = (e: any) => {
      e.preventDefault();
      setPrompt(e);
    };

    window.addEventListener("beforeinstallprompt", handleBeforeInstallPrompt);
    return () => window.removeEventListener("beforeinstallprompt", handleBeforeInstallPrompt);
  }, [pwaPrompt]);

  const install = () => {
    if (pwaPrompt) pwaPrompt.prompt();
    closePrompt();
  };

  const closePrompt = () => {
    refPwa.current?.classList.remove("top-4");
    refPwa.current?.classList.add("-top-[400px]");
  };

  const unInstall = () => {
    setAsked(today);
    localStorage.setItem("a", today);
    closePrompt();
  };
  if (askedDate === null) return null;
  if (isPwaInstalled() || askedDate === today || isDeviceIOS) return null;
  return (
    <div
      ref={refPwa}
      className={`
        overflow-hidden
        fixed 
        top-4
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
            loading="eager"
            priority={true}
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
