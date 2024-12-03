'use client';

import { HANGUL_PROJECT } from '@/constants/project';
import Image from 'next/image';

export default function hangul() {
  return (
    <>
      <div className="flex flex-col items-center desktop:gap-20 tablet:gap-20 gap-10 desktop:p-10 tablet:p-10 py-10 w-full">
        <div className="flex flex-col items-center gap-2">
          <h3>
            <a href="https://arambookclub.com/smart/book/MA029000">아람북클럽: 하루한글</a>
          </h3>
          <p className="font-bold"> 베이비올 교육 콘텐츠 개발 (typescript, vue2, pixijs )</p>
        </div>

        <ul className="grid grid-cols-1 gap-10">
          {HANGUL_PROJECT.map(({ label, src }, i) => (
            <li key={`${label}-${i}`} className="flex flex-col gap-2">
              <p>{label}</p>
              <video
                className="desktop:w-[640px] tablet:w-[640px] w-[320px] h-auto aspect-video"
                controls
                preload={i > 3 ? 'none' : 'metadata'}
                muted
              >
                <source src={`/assets/aram/hangul/${src}.mp4`} type="video/mp4" />
              </video>
            </li>
          ))}
        </ul>

        <div className="flex flex-col items-center gap-4 p-1 w-full">
          <h4>학부모 페이지 </h4>
          <Image
            src="/assets/aram/hangul/parents.png"
            className="desktop:w-[640px] tablet:w-[640px] w-[320px] h-auto aspect-video"
            alt="학부모페이지-1"
            width={640}
            height={320}
            priority={false}
          />
        </div>
      </div>
    </>
  );
}
