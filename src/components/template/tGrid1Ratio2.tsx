"use client";

export default function Grid1Ratio2({ label, period, href, children }: { label: string; period: string; href: string; children: React.ReactNode }) {
  return (
    <div className="flex flex-col desktop:grid desktop:grid-cols-3 tablet:grid tablet:grid-cols-3 gap-2 border p-2 w-full">
      <ul className="desktop:col-span-1 tablet:col-span-1">
        <li className="flex flex-col items-center gap-2">
          <a href={href} target="_blank" className="w-full text-lg font-bold">
            {label}
          </a>
          <span className="text-gray-400 w-full">{period}</span>
        </li>
      </ul>
      <div className="flex flex-col px-2 gap-2 desktop:col-span-2 tablet:col-span-2">{children}</div>
    </div>
  );
}
