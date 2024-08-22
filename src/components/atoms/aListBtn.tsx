"use client";

import { MouseEventHandler } from "react";

export default function ListBtn({ isOpen, openEvent }: { isOpen: boolean; openEvent: MouseEventHandler<HTMLButtonElement> }) {
  return (
    <button
      className={`
        relative center-latout w-80 h-80 desktop:hidden tablet:hidden
        before:contents-['']
        before:absolute
        before:top-1/2
        before:left-1/2
        before:w-30
        before:h-4
        before:-ml-15
        before:dark:bg-gray-100
        before:bg-gray-600
        after:contents-['']
        after:absolute
        after:top-1/2
        after:left-1/2
        after:-ml-15
        after:w-30
        after:h-4
        after:dark:bg-gray-100
        after:bg-gray-600
        before:duration-200
        after:duration-200
        ${isOpen ? "before:rotate-45 after:-rotate-45" : "before:-mt-10 after:mt-6"}
`}
      onClick={openEvent}
    >
      <span className={`dark:bg-gray-100 bg-gray-600 w-30 m-auto h-4 block ${isOpen ? "hidden" : ""}`} />
    </button>
  );
}
