"use client";

export default function Label({ text }: { text: string }) {
  return (
    <h2 className="flex gap-19 items-center text-main-2 w-full text-32">
      <span className="block w-[7px] h-44 bg-main-2" />
      <p className="text-nowrap">{text}</p>
      <span className="block flex-1 h-[1px] bg-main-2" />
    </h2>
  );
}
