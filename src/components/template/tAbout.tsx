"use client";

export default function Tabout() {
  return (
    <>
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
    </>
  );
}
