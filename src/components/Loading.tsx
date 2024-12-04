"use client";
import { useEffect } from "react";

export default function Loading() {
  useEffect(() => {
    document.body.classList.add("overflow-hidden");
    return document.body.classList.remove("overflow-hidden");
  }, []);
  return (
    <div className="fixed top-0 left-0  w-screen h-screen flex items-center justify-center bg-black bg-opacity-50 z-[100]">
      <div className="circle w-[200px] h-[200px] border-[20px] border-transparent border-t-white rounded-full animate-spin" />
    </div>
  );
}
