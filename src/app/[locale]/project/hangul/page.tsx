"use client";

import Image from "next/image";

export default function hangul() {
  return (
    <>
      <div className="flex flex-col items-center gap-40 p-40 w-full">
        <h3>
          <a href="https://arambookclub.com/smart/book/MA029000">아람북클럽: 하루한글</a>
        </h3>

        <ul className="flex flex-col gap-40">
          <li>
            <h4>퀴즈 형식 컨탠츠</h4>
            <div className="grid grid-cols-1 desktop:grid-cols-2 gap-40 border-b p-40">
              <video width="320" height="160" controls preload="none" muted>
                <source src="/assets/aram/hangul/quiz1.mp4" type="video/mp4" />
              </video>
              <video width="320" height="160" controls preload="none" muted>
                <source src="/assets/aram/hangul/quiz2.mp4" type="video/mp4" />
              </video>
              <video width="320" height="160" controls preload="none" muted>
                <source src="/assets/aram/hangul/quiz3.mp4" type="video/mp4" />
              </video>
              <video width="320" height="160" controls preload="none" muted>
                <source src="/assets/aram/hangul/quiz4.mp4" type="video/mp4" />
              </video>
            </div>
          </li>
          <li>
            <h4>아케이드 컨탠츠</h4>
            <div className="grid grid-cols-1 desktop:grid-cols-2 gap-40 border-b p-40">
              <video width="320" height="160" controls preload="none" muted>
                <source src="/assets/aram/hangul/puzzle.mp4" type="video/mp4" />
              </video>
              <video width="320" height="160" controls preload="none" muted>
                <source src="/assets/aram/hangul/rec1.mp4" type="video/mp4" />
              </video>
              <video width="320" height="160" controls preload="none" muted>
                <source src="/assets/aram/hangul/rec2.mp4" type="video/mp4" />
              </video>
            </div>
          </li>

          <li className="grid grid-cols-1 gap-10 p-40 m-auto border-b">
            <h4>학부모 페이지 </h4>
            <Image src="/assets/aram/hangul/parents.png" alt="학부모페이지-1" width={640} height={320}></Image>
          </li>
        </ul>
      </div>
    </>
  );
}
