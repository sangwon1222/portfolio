"use client";

import Grid1Ratio2 from "./tGrid1Ratio2";
import ProjectCard from "./tProjectCard";

export default function Texperience() {
  return (
    <>
      <div id="experience" className="h-20" />
      <div className="flex flex-col items-center gap-10 px-2 w-full">
        <h3 className="px-2 m-auto w-fit text-center relative after:contents-[''] after:block after:absolute after:w-full after:h-2 after:bg-red-400 after:z-[1] after:left-0 after:bottom-0 after:animate-pulse animate-pulse">
          <span className="relative z-[2] py-6">EXPERIENCE</span>
        </h3>
        <div className="flex flex-col gap-5 p-2 desktop:p-2 tablet:p-7 min-w-[320px] max-w-[700px] w-full">
          <Grid1Ratio2 label="소니드" period="2023.03 ~ 2024.07" href="http://www.sonid.co.kr/">
            <ProjectCard
              label="sonid 자체웹 개발"
              hashtagList={["Next.js", "React", "Vercel", "PostgresQL", "PWA", "Typescript"]}
              projectLink=""
            />
            <ProjectCard
              label="RFID 태그 자사 검수기"
              hashtagList={["React", "Electron.js", "SQLite", "Node.js", "Typescript"]}
              projectLink=""
            />
            <ProjectCard label="효성 라벨 프린트 프로그램 유지보수" hashtagList={["c#"]} projectLink="" />
            <ProjectCard label="LF RFID 프린트 프로그램 유지보수" hashtagList={["c#"]} projectLink="" />
          </Grid1Ratio2>

          <Grid1Ratio2 label="아이오앤코" period="2021.11 ~ 2023.02" href="https://home.yesbee.com/">
            <ProjectCard
              label="yesbee 사이트 유지보수"
              hashtagList={["Nextjs", "React", "React-Query", "Typescript"]}
              projectLink=""
            />
            <ProjectCard label="hive-center wms 개발" hashtagList={["Vue3", "Ag-Grid"]} projectLink="" />
            <ProjectCard label="PDA 웹앱 개발" hashtagList={["Vue3", "Ag-Grid"]} projectLink="" />
          </Grid1Ratio2>

          <Grid1Ratio2 label="미니게이트" period="2020.05 ~ 2021.08" href="https://www.minigate.net/">
            <ProjectCard
              label="아람북클럽 베이비올 게임 개발"
              hashtagList={["Vue2", "Pixi.js", "Typescript"]}
              projectLink="/project/babyall"
            />
            <ProjectCard
              label="아람북클럽 하루한글 게임 개발"
              hashtagList={["Vue2", "Pixi.js", "Typescript"]}
              projectLink="/project/hangul"
            />
            <ProjectCard
              label="리틀홈런 영어누리 콘텐츠 HTML5 기반 게임 개발"
              hashtagList={["Vue2", "Pixi.js", "Typescript"]}
              projectLink=""
            />
            <ProjectCard
              label="천재교육 타자 HTML5 기반 게임 개발"
              hashtagList={["Vue2", "Pixi.js", "Typescript"]}
              projectLink=""
            />
            <ProjectCard
              label="자사 MEW HTML5 기반 게임 개발"
              hashtagList={["Vue2", "Pixi.js", "Typescript"]}
              projectLink=""
            />
          </Grid1Ratio2>
        </div>
      </div>
    </>
  );
}
