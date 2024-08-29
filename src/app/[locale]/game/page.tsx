import { Metadata, ResolvingMetadata } from "next";
import Image from "next/image";
import Link from "next/link";

export async function generateMetadata({ params, searchParams }: TypeMetaProps, parent: ResolvingMetadata): Promise<Metadata> {
  return {
    title: `LSW-APP-GAME`,
    description: `LSW-APP-GAME`,
    openGraph: {
      title: `LSW-APP-GAME`,
      description: `LSW-APP-GAME`,
      type: "article",
      publishedTime: "2023-01-01T00:00:00.000Z",
      images: ["https://www.lsw.kr/assets/thumbnail/game.png"],
    },
  };
}

export default async function Home({ params, searchParams }: { params: any; searchParams: any }) {
  return (
    <div className="overflow-hidden flex flex-col items-center gap-40">
      <ul className="grid grid-cols-2 desktop:grid-cols-4 tablet:grid-cols-2 gap-40 py-40">
        {/* <li className="center-layout flex-col gap-10 bg-gray-300 dark:text-black w-200 h-200 rounded-xl p-20">
          <p className="w-full h-1/2 center-layout">사다리 타기</p>
          <Link href="/game/ladder" className="w-full h-1/2 center-layout bg-gray-400">
            GO
          </Link>
        </li>

        <li className="center-layout flex-col gap-10 bg-gray-300 dark:text-black w-200 h-200 rounded-xl p-20">
          <p className="w-full h-1/2 center-layout">윷놀이</p>
          <button className="w-full h-1/2 bg-gray-400">GO</button>
        </li>

        <li className="center-layout flex-col gap-10 bg-gray-300 dark:text-black w-200 h-200 rounded-xl p-20">
          <p className="w-full h-1/2 center-layout">그림 맞추기</p>
          <button className="w-full h-1/2 bg-gray-400">GO</button>
        </li>

        <li className="center-layout flex-col gap-10 bg-gray-300 dark:text-black w-200 h-200 rounded-xl p-20">
          <p className="w-full h-1/2 center-layout">두더지 잡기</p>
          <button className="w-full h-1/2 bg-gray-400">GO</button>
        </li> */}

        <li className="overflow-hidden center-layout flex-col gap-10 p-20 w-200 h-300 rounded-xl bg-gray-200 dark:bg-gray-600">
          <Image src="/assets/rsc/breakTheLog/image/thumbnail.png" width={250} height={250} alt="breakTheLog_thumbnail" className="rounded" />
          <p className="w-full h-1/2 center-layout">나무 패기</p>
          <Link href="/game/breakTheLog" className="center-layout w-full h-120 rounded bg-red-400 dark:bg-red-900">
            GO
          </Link>
        </li>
        {/* 
        <li className="center-layout flex-col gap-10 bg-gray-300 dark:text-black w-200 h-200 rounded-xl p-20">
          <p className="w-full h-1/2 center-layout">점핑</p>
          <button className="w-full h-1/2 bg-gray-400">GO</button>
        </li>

        <li className="center-layout flex-col gap-10 bg-gray-300 dark:text-black w-200 h-200 rounded-xl p-20">
          <p className="w-full h-1/2 center-layout">비 피하기</p>
          <button className="w-full h-1/2 bg-gray-400">GO</button>
        </li>

        <li className="center-layout flex-col gap-10 bg-gray-300 dark:text-black w-200 h-200 rounded-xl p-20">
          <p className="w-full h-1/2 center-layout">디펜스</p>
          <button className="w-full h-1/2 bg-gray-400">GO</button>
        </li> */}
      </ul>
    </div>
  );
}
