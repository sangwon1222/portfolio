"use client";

export default function HashTag({ text }: { text: string }) {
  return <span className="w-fit bg-gray-600 text-white dark:bg-white dark:text-black rounded-md px-6">{text}</span>;
}
