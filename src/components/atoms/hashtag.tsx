'use client';

export default function HashTag({ text }: { text: string }) {
  return (
    <span className="w-fit bg-gray-600 text-white text-sm dark:bg-white dark:text-gray-700 rounded-md p-1">
      {text}
    </span>
  );
}
