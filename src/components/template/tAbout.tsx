"use client";

export default function About() {
  return (
    <>
      <div id="about" className="h-20" />
      <div className="flex flex-col items-center gap-10 px-2 w-full ">
        <h3 className="px-2 m-auto w-fit text-center relative after:contents-[''] after:block after:absolute after:w-full after:h-2 after:bg-red-400 after:z-[1] after:left-0 after:bottom-0 after:animate-pulse animate-pulse">
          <span className="relative z-[2] py-6">ABOUT</span>
        </h3>
        <ul className="flex flex-col gap-5 p-3 desktop:p-10 tablet:p-7 border min-w-[320px] max-w-[700px] w-full">
          <li className="flex flex-col gap-3">
            <p className="text-xl">이상원</p>
            <p className="flex">
              <span className="w-fit pr-5">이메일:</span>
              <span>hkbvc1222@gmail.com</span>
            </p>
          </li>

          <li>
            <p>4년차 프론트엔드 개발자 이상원입니다.</p>
          </li>

          <li>
            <ul className="list-disc px-5">
              <li>웹/앱 서비스 프론트엔드 설계 / 개발 / 운영 경험</li>
              <li>기획 단계부터 참여한 프로젝트 경험</li>
              <li>다양한 팀과 협업 경험</li>
            </ul>
          </li>
        </ul>
      </div>
    </>
  );
}
