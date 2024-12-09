import { Metadata } from 'next';
import Loading from '@/components/Loading';
import dynamic from 'next/dynamic';

export const metadata: Metadata = {
  title: '나무패기 게임 | 이상원 포트폴리오',
  description: 'Phaser를 활용한 나무패기 게임',
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
  viewport: 'width=device-width, initial-scale=1.0',
  robots: 'index, follow',
  openGraph: {
    title: '게임 | 이상원 포트폴리오',
    description: 'Phaser를 활용한 나무패기 게임',
    url: 'https://www.lsw.kr/ko/game/breakTheLog/',
    siteName: '이상원 포트폴리오 - 나무패기 게임',
    images: [
      {
        url: 'https://www.lsw.kr/assets/thumbnails/breakTheLog.jpg',
        width: 1280,
        height: 630,
        alt: '나무패기 게임 썸네일',
      },
    ],
    locale: 'ko_KR',
    type: 'website',
  },
  alternates: {
    canonical: 'https://lsw.kr/game',
  },
};

const BreakTheLogGame = dynamic(() => import('@/components/templates/BreakTheLog'), {
  loading: () => <Loading />,
});
export default async function BreakTheLogLayout() {
  return <BreakTheLogGame />;
}
