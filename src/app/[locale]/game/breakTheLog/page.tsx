import { Metadata, ResolvingMetadata } from 'next';
import Loading from '@/components/Loading';
import dynamic from 'next/dynamic';

export async function generateMetadata(
  { params, searchParams }: TypeMetaProps,
  parent: ResolvingMetadata
): Promise<Metadata> {
  return {
    title: `LSW-APP-Break-The-Log`,
    description: `LSW-APP-Break-The-Log`,
    keywords: '미니 게임,HTML5,webGL,pixi,phaser',
    openGraph: {
      title: `LSW-APP-Break-The-Log`,
      url: 'https://lsw.kr/game/breakTheLog/',
      description: `LSW-Portfolio-Break-The-Log`,
      publishedTime: '2023-01-01T00:00:00.000Z',
      images: [
        {
          url: 'https://www.lsw.kr/assets/thumbnails/breakTheLog.jpg',
          width: 1280,
          height: 630,
          alt: '나무패기 게임 썸네일',
        },
      ],
    },
  };
}

const BreakTheLogGame = dynamic(() => import('@/components/templates/BreakTheLog'), {
  loading: () => <Loading />,
});
export default async function BreakTheLogLayout() {
  return <BreakTheLogGame />;
}
