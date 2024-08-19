"use client";
import { darkModeState } from "@/recoil/state";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";

export default function InstallPrompt() {
  const refPwa = useRef<HTMLDivElement>(null);
  const [pwaPrompt, setPrompt] = useState<any>(null);
  const newDate = new Date();
  const year = newDate.getFullYear();
  const month = `0${newDate.getMonth() + 1}`.slice(-2);
  const day = newDate.getDate();
  const today = `${year}${month}${day}`;

  const handleBeforeInstallPrompt = (e: any) => {
    e.preventDefault();
    setPrompt(e);
  };

  useEffect(() => {
    const isDeviceIOS = /iPad|iPhone|iPod/.test(window.navigator.userAgent.toLowerCase());
    const askedDate = localStorage.getItem("a");

    if (askedDate == `${today.toString()}` || isDeviceIOS) return;

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

  return (
    <div
      ref={refPwa}
      className={
        `
          fixed -top-[400px] right-0 rounded shadow-xl overflow-hidden flex flex-col gap-10 w-[320px] p-10 duration-300 z-30 text-sm font-bold desktop:right-2 tablet:right-2 select-none
          ${darkModeState?'bg-gray-800 text-white border-white border':'bg-white text-gray-800 border-gray-800 border'}
        `
      }
    >
      <p>Install App?</p>
      <div className="flex gap-10 w-full">
        <div className="flex justify-center items-center bg-white rounded-md p-10 w-[60px] h-[60px]">
          <Image src="/assets/icon-192x192.png" alt="logo" width={100} height={100} />
        </div>
        <div className="flex flex-col gap-4">
          <p>LSW App</p>
        </div>
      </div>
      <div className="grid grid-cols-2 gap-4">
        <button className="border-main-2 border-2 py-2 rounded" onClick={unInstall}>
          취소
        </button>
        <button className="py-2 rounded text-white bg-main-2" onClick={install}>
          APP 설치
        </button>
      </div>
    </div>
  );
}
