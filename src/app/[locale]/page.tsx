import Loading from '@/components/Loading';
import { Metadata } from 'next';
import dynamic from 'next/dynamic';
import { Suspense } from 'react';

export const metadata: Metadata = {
  title: '프론트엔드 이상원 | 포트폴리오',
  description:
    '프론트엔드 개발자 이상원의 포트폴리오. React, Next.js, TypeScript 등을 활용한 UI/UX 경험을 소개합니다.',
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
    title: '프론트엔드 이상원 | 포트폴리오',
    description:
      '프론트엔드 개발자 이상원의 포트폴리오입니다. React, Next.js, TypeScript 등 최신 웹 기술로 구축된 프로젝트를 확인하세요.',
    url: 'https://lsw.kr',
    siteName: '이상원 포트폴리오',
    images: [
      {
        url: 'https://www.lsw.kr/assets/thumbnails/home.jpg',
        width: 1200,
        height: 630,
        alt: '프론트엔드 이상원 포트폴리오 이미지',
      },
    ],
    locale: 'ko_KR',
    type: 'website',
  },
};

const About = dynamic(() => import('@/components/templates/About'));
const Experience = dynamic(() => import('@templates/Experience'));

export default async function Home({ params, searchParams }: { params: any; searchParams: any }) {
  return (
    <div className="overflow-hidden flex flex-col items-center gap-2 pb-20">
      <Suspense fallback={<Loading />}>
        <About />
        <Experience />
      </Suspense>
    </div>
  );
}
