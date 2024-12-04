import { GAME_LIST } from '@/constants/game';
import Image from 'next/image';
import Link from 'next/link';
import Script from 'next/script';

export const metadata = {
  title: '게임 | 이상원 포트폴리오',
  description:
    '프론트엔드 개발자 이상원의 게임 프로젝트 페이지. React, Next.js, TypeScript로 제작된 인터랙티브 게임과 관련 기술을 소개합니다.',
  keywords: [
    'lee sang won',
    'lsw',
    '게임 개발',
    '프론트엔드 게임',
    'React 게임',
    'pixi 게임',
    'pixi.js 게임',
    'phaser 게임',
    'phaser.js 게임',
    'webGL',
    'TypeScript 게임',
    '이상원',
    '프론트엔드 개발자',
  ],
  author: 'lsw',
  viewport: 'width=device-width, initial-scale=1.0',
  robots: 'index, follow',
  openGraph: {
    title: '게임 | 이상원 포트폴리오',
    description:
      '프론트엔드 개발자 이상원의 게임 프로젝트를 만나보세요. React, Phaser,Websocket.io, TypeScript로 제작된 흥미로운 인터랙티브 게임들.',
    url: 'https://lsw.kr',
    siteName: '이상원 포트폴리오',
    images: [
      {
        url: 'https://www.lsw.kr/assets/thumbnail/game.png',
        width: 1200,
        height: 630,
        alt: '게임 프로젝트 - 이상원 포트폴리오',
      },
    ],
    locale: 'ko_KR',
    type: 'website',
  },
  alternates: {
    canonical: 'https://lsw.kr/game',
  },
};

export default async function GamePage() {
  const schemaData = {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    name: '게임 리스트',
    itemListElement: GAME_LIST.map(({ label, href }, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: label,
      url: `https://lsw.kr${href.startsWith('/') ? href : ''}`,
    })),
  };

  return (
    <div className="overflow-hidden flex flex-col items-center gap-3">
      <Script
        id="lsw.kr/game-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaData) }}
      />

      <ul
        className="grid grid-cols-1 desktop:grid-cols-3 tablet:grid-cols-2 gap-9 py-10"
        aria-label="game list"
      >
        {GAME_LIST.map(({ src, alt, label, href }, i) => (
          <li
            className="overflow-hidden center-layout flex-col gap-3 p-5 w-full bg-gray-100 dark:bg-gray-700 rounded-xl"
            key={`${label}-${i}`}
            aria-label={`${label} game button`}
          >
            <div className="relative w-[250px] h-[250px]">
              <Image
                src={src}
                alt={alt}
                fill
                className="rounded aspect-square object-contain"
                priority={false}
              />
            </div>
            <p className="w-full text-center">{label}</p>

            <Link
              href={href}
              prefetch={false}
              className="center-layout w-full h-11 rounded bg-red-400 dark:bg-red-900"
            >
              GO
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
