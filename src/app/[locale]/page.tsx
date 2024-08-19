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
    <div className="overflow-hidden flex flex-col items-center gap-80">
      <div id="about" />
      <ul className="flex flex-col gap-20 p-10 desktop:p-40 tablet:p-30 border">
        <li className="flex flex-col gap-10">
          <p className="text-xl">이상원</p>
          <p className="flex">
            <span className="w-fit pr-20">이메일:</span>
            <span>hkbvc1222@gmail.com</span>
          </p>
        </li>

        <li className="dark:text-gray-400 text-gray-600">
          <p>Next.js, Typescript, React, Vue, Pixi, Three.js 기반 4년차 프론트엔드 개발자 이상원입니다.</p>
          <p>웹 기반 게임 개발에 관심이 많습니다.</p>
        </li>

        <ol className="list-disc px-20">
          <li>웹/앱 서비스 프론트엔드 설계 / 개발 / 운영 경험</li>
          <li>기획 단계부터 참여한 프로젝트 겸험</li>
          <li>다양한 팀과 협업 경험</li>
        </ol>
      </ul>

      <div id="experience" />
      <div className="flex flex-col gap-20 p-40 border">
        <h3 className="px-10 m-auto w-fit text-center relative after:contents-[''] after:block after:absolute after:w-full after:h-10 after:bg-sky-400 after:left-0 after:bottom-0 ">
          EXPERIENCE
        </h3>
        <ul>
          <li>a</li>
          <li>b</li>
          <li>c</li>
        </ul>
      </div>
    </div>
  );
}
