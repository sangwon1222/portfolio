"use client";

import Image from "next/image";

const gameList = [
  { label: "Alphabet Catch", src: "alphabet-catch" },
  { label: "Alphabet Match", src: "alphabet-match" },
  { label: "Alphabet Touch", src: "alphabet-touch" },
  { label: "Alphabet Block", src: "alphabet-block" },
  { label: "Story Quiz", src: "story-quiz" },
  { label: "Reading Match", src: "car" },
  { label: "Listening Touch", src: "listening-touch" },
  { label: "Story Catch", src: "story-catch" },
  { label: "Spot Finder", src: "spot-finder" },
];

export default function babyAll() {
  return (
    <>
      <div className="flex flex-col items-center gap-10 p-10 w-full">
        <div className="flex flex-col items-center gap-2">
          <h3>
            <a href="https://arambookclub.com/smart/book/MA029000">아람북클럽: Baby All</a>
          </h3>
          <p className="font-bold"> 베이비올 교육 콘텐츠 개발 (typescript, vue2, pixijs )</p>
        </div>

        <ul className="grid grid-cols-1 gap-10">
          {gameList.map(({ label, src }, i) => (
            <li key={`${label}-${i}`} className="flex flex-col gap-2">
              <p>{label}</p>
              <video
                className="desktop:w-[640px] tablet:w-[640px] w-[320px] h-auto aspect-video"
                controls
                preload={i > 3 ? "none" : "metadata"}
                muted
              >
                <source src={`/assets/aram/babyall/${src}.mp4`} type="video/mp4" />
              </video>
            </li>
          ))}
        </ul>

        <div className="flex flex-col items-center gap-4 p-1 w-full">
          <h4>학부모 페이지 </h4>
          <Image
            src="/assets/aram/babyall/parents-1.png"
            className="desktop:w-[640px] tablet:w-[640px] w-[320px] h-auto aspect-video"
            alt="학부모페이지-1"
            width={640}
            height={320}
            priority={false}
          />
          <Image
            src="/assets/aram/babyall/parents-2.png"
            className="desktop:w-[640px] tablet:w-[640px] w-[320px] h-auto aspect-video"
            alt="학부모페이지-2"
            width={640}
            height={320}
            priority={false}
          />
        </div>
      </div>
    </>
  );
}
