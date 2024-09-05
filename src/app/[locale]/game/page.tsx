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
        <li className="overflow-hidden center-layout flex-col gap-10 p-20 w-200 h-300 rounded-xl bg-gray-200 dark:bg-gray-600">
          <Image src="/assets/rsc/breakTheLog/image/thumbnail.png" width={250} height={250} alt="breakTheLog_thumbnail" className="rounded" />
          <p className="w-full h-1/2 center-layout">나무 패기</p>
          <Link href="/game/breakTheLog" className="center-layout w-full h-120 rounded bg-red-400 dark:bg-red-900">
            GO
          </Link>
        </li>

        <li className="overflow-hidden center-layout flex-col gap-10 p-20 w-200 h-300 rounded-xl bg-gray-200 dark:bg-gray-600">
          <Image src="/assets/rsc/cooking/image/thumbnail.png" width={250} height={250} alt="cooking_thumbnail" className="rounded" />
          <p className="w-full h-1/2 center-layout">쿠킹</p>
          <Link href="/game/cooking" className="center-layout w-full h-120 rounded bg-red-400 dark:bg-red-900">
            GO
          </Link>
        </li>

        <li className="overflow-hidden center-layout flex-col gap-10 p-20 w-200 h-300 rounded-xl bg-gray-200 dark:bg-gray-600">
          <Image src="/assets/rsc/cardgame/image/thumbnail.png" width={250} height={250} alt="cooking_thumbnail" className="rounded" />
          <p className="w-full h-1/2 center-layout">카드 액션</p>
          <Link href="http://43.200.109.38:8080/" className="center-layout w-full h-120 rounded bg-red-400 dark:bg-red-900">
            GO
          </Link>
        </li>
      </ul>
    </div>
  );
}
