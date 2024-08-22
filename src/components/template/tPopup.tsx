"use client";

import { MouseEvent } from "react";

export default function Tpopup({ projectName, closePop }: { projectName: string; closePop: (e: MouseEvent<Element>) => void }) {
  console.log({ projectName });
  return (
    <>
      <div className="fixed top-0 left-0 backdrop-blur-3xl z-30 w-screen h-screen overflow-hidden" onClick={closePop}>
        <div className="fixed top-1/2 left-1/2 flex flex-col -translate-x-1/2 -translate-y-1/2 min-w-400 min-h-400 bg-white dark:bg-gray-600">
          <button className="absolute top-0 right-0 p-10 px-20 hover:animate-wiggle font-bold" onClick={closePop}>
            X
          </button>
          <p>{projectName}</p>
          <button></button>
        </div>
      </div>
    </>
  );
}
