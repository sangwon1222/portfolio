import HashTag from "@/components/atoms/hashtag";
import ProjectCard from "@/components/template/tProjectCard";
import { Metadata, ResolvingMetadata } from "next";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

export async function generateMetadata({ params, searchParams }: TypeMetaProps, parent: ResolvingMetadata): Promise<Metadata> {
  return {
    title: `LSW-APP`,
    description: `LSW-APP`,
    openGraph: {
      title: `LSW-APP`,
      description: `LSW-APP`,
      type: "article",
      publishedTime: "2023-01-01T00:00:00.000Z",
      images: ["https://www.lsw.kr/assets/thumbnail/home.png"],
    },
  };
}

export default async function Home({ params, searchParams }: { params: any; searchParams: any }) {
  return (
    <div className="overflow-hidden flex flex-col items-center gap-40">
      <div id="about" />
      <div className="flex flex-col items-center gap-40 p-40 w-full">
        <h3 className="px-10 m-auto w-fit text-center relative after:contents-[''] after:block after:absolute after:w-full after:h-10 after:bg-red-400 after:z-[1] after:left-0 after:bottom-0 after:animate-pulse animate-pulse">
          <span className="relative z-[2]">ABOUT</span>
        </h3>
        <ul className="flex flex-col gap-20 p-10 desktop:p-40 tablet:p-30 border min-w-400 max-w-700 w-full">
          <li className="flex flex-col gap-10">
            <p className="text-xl">이상원</p>
            <p className="flex">
              <span className="w-fit pr-20">이메일:</span>
              <span>hkbvc1222@gmail.com</span>
            </p>
          </li>

          <li className="dark:text-gray-400 text-gray-600">
            <p>Next.js, Typescript, React, Vue, Pixi 기반 4년차 프론트엔드 개발자 이상원입니다.</p>
            <p>웹 기반 게임 개발에 관심이 많습니다.</p>
          </li>

          <ol className="list-disc px-20">
            <li>웹/앱 서비스 프론트엔드 설계 / 개발 / 운영 경험</li>
            <li>기획 단계부터 참여한 프로젝트 겸험</li>
            <li>다양한 팀과 협업 경험</li>
          </ol>
        </ul>
      </div>

      <div id="experience" />
      <div className="flex flex-col items-center gap-40 p-40 w-full">
        <h3 className="px-10 m-auto w-fit text-center relative after:contents-[''] after:block after:absolute after:w-full after:h-10 after:bg-red-400 after:z-[1] after:left-0 after:bottom-0 after:animate-pulse animate-pulse">
          <span className="relative z-[2]">EXPERIENCE</span>
        </h3>
        <ul className="flex flex-col gap-20 p-10 desktop:p-40 tablet:p-30 min-w-420 max-w-700 w-full">
          <li className="flex flex-col desktop:grid desktop:grid-cols-2 tablet:grid tablet:grid-cols-2 gap-10 border p-10 w-full">
            <ol>
              <li className="flex desktop:flex-col tablet:flex-col items-center gap-10">
                <a href="http://www.sonid.co.kr/" target="_blank" className="text-lg font-bold py-10">
                  소니드
                </a>
                <span className="text-gray-400">2023.03 ~ 2024.07</span>
              </li>
            </ol>
            <ol className="px-10 flex flex-col gap-10">
              <ProjectCard label="sonid 자체웹 개발" hashtagList={["next.js", "react", "pwa"]} />
              <ProjectCard label="효성 라벨 프린트 프로그램 유지보수" hashtagList={["c#"]} />
              <ProjectCard label="LF RFID 프린트 프로그램 유지보수" hashtagList={["c#"]} />
              <ProjectCard label="Think-Tag RFID 프린트 개발" hashtagList={["vue3"]} />
              <ProjectCard label="RFID 태그 자사 검수기" hashtagList={["vue3", "electron.js"]} />
            </ol>
          </li>
          <li className="flex flex-col desktop:grid desktop:grid-cols-2 tablet:grid tablet:grid-cols-2 gap-10 border p-10 w-full">
            <ol>
              <li className="flex desktop:flex-col tablet:flex-col items-center gap-10">
                <a href="https://home.yesbee.com/" target="_blank" className="text-lg font-bold py-10">
                  아이오앤코
                </a>
                <span className="text-gray-400">2021.11 ~ 2023.02</span>
              </li>
            </ol>
            <ol className="desktop:px-10 tablet:px-10 flex flex-col gap-10">
              <ProjectCard label="yesbee 사이트 유지보수" hashtagList={["next.js", "react"]} />
              <ProjectCard label="hive-center wms 개발" hashtagList={["vue3"]} />
              <ProjectCard label="PDA 웹앱 개발" hashtagList={["vue3"]} />
            </ol>
          </li>
          <li className="flex flex-col desktop:grid desktop:grid-cols-2 tablet:grid tablet:grid-cols-2 gap-10 border p-10 w-full">
            <ol>
              <li className="flex desktop:flex-col tablet:flex-col items-center gap-10">
                <a href="https://www.minigate.net/" target="_blank" className="text-lg font-bold py-10">
                  미니게이트
                </a>
                <span className="text-gray-400">2020.05 ~ 2021.08</span>
              </li>
            </ol>
            <ol className="desktop:px-10 tablet:px-10 flex flex-col gap-10">
              <ProjectCard label="아람북클럽 베이비올 게임 개발" hashtagList={["vue2", "pixi.js"]} />
              <ProjectCard label="아람북클럽 하루한글 게임 개발" hashtagList={["vue2", "pixi.js"]} />
              <ProjectCard label="아이스크림 에듀 HTML5 기반 게임 개발" hashtagList={["vue2", "pixi.js"]} />
              <ProjectCard label="천재교육 타자 HTML5 기반 게임 개발" hashtagList={["vue2", "pixi.js"]} />
              <ProjectCard label="자사 MEW HTML5 기반 게임 개발" hashtagList={["vue2", "pixi.js"]} />
            </ol>
          </li>
        </ul>
      </div>
    </div>
  );
}
