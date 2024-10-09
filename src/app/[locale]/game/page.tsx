import { Metadata, ResolvingMetadata } from "next";
import Image from "next/image";
import Link from "next/link";

export async function generateMetadata(
  { params, searchParams }: TypeMetaProps,
  parent: ResolvingMetadata,
): Promise<Metadata> {
  return {
    title: `LSW-APP-GAME`,
    description: `LSW-APP-GAME`,
    openGraph: {
      title: `LSW-APP-GAME`,
      description: `LSW-APP-GAME`,
      type: "article",
      publishedTime: "2023-01-01T00:00:00.000Z",
      images: [
        { url: "https://www.lsw.kr/assets/thumbnail/game.png", width: 1280, height: 720, alt: "게임 리스트 썸네일" },
      ],
    },
  };
}

const gameList = [
  {
    src: "/assets/rsc/breakTheLog/image/thumbnail.png",
    alt: "breakTheLog_thumbnail",
    label: "나무 패기",
    href: "/game/breakTheLog",
  },
  {
    src: "/assets/rsc/cooking/image/thumbnail.png",
    alt: "cooking_thumbnail",
    label: "쿠킹",
    href: "/game/cooking",
  },
  {
    src: "/assets/rsc/cardgame/image/thumbnail.png",
    alt: "card_game_thumbnail",
    label: "카드 액션",
    href: "http://43.200.109.38:8080/",
  },
];

export default async function GamePage({ params, searchParams }: { params: any; searchParams: any }) {
  return (
    <div className="overflow-hidden flex flex-col items-center gap-3">
      <ul className="grid grid-cols-2 desktop:grid-cols-4 tablet:grid-cols-2 gap-8 py-3" aria-label="game list">
        {gameList.map(({ src, alt, label, href }, i) => (
          <li
            className="overflow-hidden center-layout flex-col gap-2 p-5 w-52 h-80 bg-gray-100 dark:bg-gray-700 rounded-xl"
            key={`${label}-${i}`}
            aria-label={`${label} game button`}
          >
            <Image src={src} width={250} height={250} alt={alt} className="rounded" priority={false} />
            <p className="w-full h-1/2 center-layout">{label}</p>
            <Link href={href} className="center-layout w-full h-120 rounded bg-red-400 dark:bg-red-900">
              GO
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
