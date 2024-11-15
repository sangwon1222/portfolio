import Loading from "@/components/loading";
import dynamic from "next/dynamic";
import { Suspense } from "react";

export const metadata = {
  title: "프론트엔드 이상원 | 포트폴리오",
  description: "프론트엔드 개발자 이상원의 포트폴리오. React, Next.js, TypeScript 등을 활용한 UI/UX 경험을 소개합니다.",
  keywords: ["프론트엔드 개발자", "이상원 포트폴리오", "React", "Next.js", "TypeScript", "UI/UX", "웹 개발"],
  openGraph: {
    title: "프론트엔드 이상원 | 포트폴리오",
    description:
      "프론트엔드 개발자 이상원의 포트폴리오입니다. React, Next.js, TypeScript 등 최신 웹 기술로 구축된 프로젝트를 확인하세요.",
    url: "https://lsw.kr",
    siteName: "이상원 포트폴리오",
    images: [
      {
        url: "https://www.lsw.kr/assets/thumbnail/home.png",
        width: 1200,
        height: 630,
        alt: "프론트엔드 이상원 포트폴리오 이미지",
      },
    ],
    locale: "ko_KR",
    type: "website",
  },
};

const About = dynamic(() => import("@/components/template/tAbout"));
const Experience = dynamic(() => import("@/components/template/tExperience"));

export default async function Home({ params, searchParams }: { params: any; searchParams: any }) {
  return (
    <div className="overflow-hidden flex flex-col items-center gap-2 pb-20">
      <Suspense fallback={<Loading />}>
        <About />
      </Suspense>

      <Suspense fallback={<Loading />}>
        <Experience />
      </Suspense>
    </div>
  );
}
