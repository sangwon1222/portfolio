import BabyAll from '@/components/pages/project/BabyAll';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: '아람 베이비올 | 프론트엔드 이상원',
  description: '아람의 베이비올 프로젝트입니다.',
  keywords: [
    'lee sang won',
    'lsw',
    '프론트엔드 개발자',
    '이상원 포트폴리오',
    'React',
    'Next.js',
    'TypeScript',
    'UI/UX',
    '웹 개발',
  ],
  openGraph: {
    title: '아람 베이비올 | 프론트엔드 이상원',
    description: '아람 베이비올 프로젝트 입니다.',
    url: 'https://www.lsw.kr/ko/project/babyall/',
    siteName: '이상원 포트폴리오',
    images: [
      {
        url: 'https://www.lsw.kr/assets/thumbnails/baby-all.jpg',
        width: 1200,
        height: 630,
        alt: '아람 베이비올 이미지',
      },
    ],
    locale: 'ko_KR',
    type: 'website',
  },
};
export default function babyAllPage() {
  return <BabyAll />;
}
