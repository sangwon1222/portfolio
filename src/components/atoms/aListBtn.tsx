"use client";

import useListMobile from "@/app/[locale]/providers/listMobile/useListMobile";

export default function ListBtn() {
  const { open, setListMobile } = useListMobile();
  return (
    <button
      className={`desktop:hidden tablet:hidden flex flex-col justify-center items-center ${open ? "" : "gap-1"} w-20 h-20`}
      aria-label="list button"
      onClick={() => setListMobile(!open)}
    >
      <span className={`${open ? "rotate-45 absolute" : ""} block  w-7 h-[4px] dark:bg-gray-100 bg-gray-600 duration-200`} />
      <span className={`${open ? "opacity-0" : "opacity-100"} block w-7 h-[4px] dark:bg-gray-100 bg-gray-600 duration-200`} />
      <span className={`${open ? "-rotate-45 absolute" : ""} block  w-7 h-[4px] dark:bg-gray-100 bg-gray-600 duration-200`} />
    </button>
  );
}
