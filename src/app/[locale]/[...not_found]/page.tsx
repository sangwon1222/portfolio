import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
export const metadata: Metadata = {
  title: "LSW-APP|404",
  description: "LSW-APP NOT Found PAGE",
};

export default function NotFound() {
  console.log("NotFoundCatchAll");

  return (
    <div
      className="
    flex
    flex-col
    items-center
    justify-center
    gap-14
    font-black
    py-160
    text-2xl
    "
    >
      <Link href="/" className="flex flex-col items-center gap-4">
        <Image src="/assets/icon-192x192.png" alt="LSW-APP-LOGO" width={192} height={192} priority />
        <h2 className="text-main-2">404</h2>
      </Link>
      <p>PAGE NOT FOUND</p>
    </div>
  );
}
