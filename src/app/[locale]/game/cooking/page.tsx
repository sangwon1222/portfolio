import Loading from '@/components/Loading';
import { Metadata } from 'next';
import dynamic from 'next/dynamic';
import Head from 'next/head';

export const metadata: Metadata = {
  title: '쿠킹 게임 | 이상원 포트폴리오',
  description: 'Phaser를 활용한 요리 게임',
  keywords: [
    'lee sang won',
    'lsw',
    '게임 개발',
    '프론트엔드 게임',
    '웹 게임',
    '게임',
    'React 게임',
    'pixi 게임',
    'pixi.js 게임',
    'phaser 게임',
    'phaser.js 게임',
    'webGL',
    'TypeScript',
    '이상원',
    '프론트엔드 개발자',
  ],
  viewport: 'width=device-width, initial-scale=1.0',
  robots: 'index, follow',
  openGraph: {
    title: '게임 | 이상원 포트폴리오',
    description: 'Phaser를 활용한 요리 게임',
    url: 'https://www.lsw.kr/game/cooking/',
    siteName: '이상원 포트폴리오 - 쿠킹게임',
    images: [
      {
        url: 'https://www.lsw.kr/assets/thumbnails/cooking.jpg',
        width: 1280,
        height: 630,
        alt: '쿠킹 게임 썸네일',
      },
    ],
    locale: 'ko_KR',
    type: 'website',
  },
  alternates: {
    canonical: 'https://lsw.kr/game/cooking',
    languages: {
      en: 'https://lsw.kr/en/game/cooking',
      ko: 'https://lsw.kr/ko/game/cooking',
    },
  },
};

const CookingGame = dynamic(() => import('@/components/templates/Cooking'), {
  loading: () => <Loading />,
});
export default async function CookingLayout() {
  return (
    <>
      <Head>
        <meta
          name="viewport"
          content="initial-scale=1.0, width=device-width, user-scalable=no, orientation=landscape"
        />
      </Head>
      <CookingGame />;
    </>
  );
}
