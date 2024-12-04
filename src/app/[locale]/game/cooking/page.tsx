import Loading from '@/components/Loading';
import { Metadata, ResolvingMetadata } from 'next';
import dynamic from 'next/dynamic';

export async function generateMetadata(
  { params, searchParams }: TypeMetaProps,
  parent: ResolvingMetadata
): Promise<Metadata> {
  return {
    title: `LSW-APP-Cooking`,
    description: `LSW-APP-Cooking`,
    openGraph: {
      title: `LSW-APP-Break-The-Log`,
      url: 'https://lsw.kr/cooking',
      description: `LSW-APP-Cooking`,
      publishedTime: '2023-01-01T00:00:00.000Z',
      images: [
        {
          url: 'https://www.lsw.kr/assets/images/thumbnails/cooking.jpg',
          width: 1280,
          height: 720,
          alt: '쿠킹 게임 썸네일',
        },
      ],
    },
  };
}

const CookingGame = dynamic(() => import('@/components/templates/Cooking'), {
  ssr: false,
  loading: () => <Loading />,
});
export default async function CookingLayout() {
  return <CookingGame />;
}
