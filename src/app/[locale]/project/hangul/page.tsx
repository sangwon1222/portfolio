import Hangul from '@/components/pages/project/Hangul';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: '아람 하루한글 | 이상원',
  description: '아람 하루한글 프로젝트 입니다.',
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
    title: '아람 하루한글 | 이상원',
    description: '아람 하루한글 프로젝트 입니다.',
    url: 'https://www.lsw.kr/ko/project/hangul/',
    siteName: '이상원 포트폴리오',
    images: [
      {
        url: 'https://www.lsw.kr/assets/thumbnails/hangul.jpg',
        width: 1200,
        height: 630,
        alt: '아람 하루한글 이미지',
      },
    ],
    locale: 'ko_KR',
    type: 'website',
  },
  alternates: {
    canonical: 'https://lsw.kr/hangul',
    languages: {
      en: 'https://lsw.kr/en/hangul',
      ko: 'https://lsw.kr/ko/hangul',
    },
  },
};
export default function hangulPage() {
  return <Hangul />;
}
