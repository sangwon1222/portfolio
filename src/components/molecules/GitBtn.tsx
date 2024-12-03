import Image from "next/image";
import Link from "next/link";

export const GitBtn = () => {
  return (
    <Link
      href="https://github.com/sangwon1222"
      className="group flex items-center justify-center border-2 dark:border-slate-600 rounded w-10 h-10"
    >
      <Image
        src="/assets/Git_icon.png"
        width={26}
        height={26}
        className="w-[26px] h-[26px] group-hover:animate-pulse-fast"
        alt="git_icon"
        loading="eager"
        priority={true}
      />
    </Link>
  );
};
