'use client';

import { BABY_ALL_PROJECT } from '@/constants/project';
import { useI18n } from '@/locales/client';
import Image from 'next/image';

export default function BabyAll() {
  const t = useI18n();
  return (
    <>
      <div className="flex flex-col items-center desktop:gap-20 tablet:gap-20 gap-10 desktop:p-10 tablet:p-10 py-10 w-full min-w-[320px] px-2">
        <div className="flex flex-col items-center gap-2">
          <h3>
            <a href="https://arambookclub.com/smart/book/MA029000">{t('aramBookClub')}: Baby All</a>
          </h3>
          <p className="font-normal">
            {t('babyAllDescription')} <br /> (typescript, vue2, pixijs )
          </p>
        </div>

        <ul className="grid grid-cols-1 gap-10">
          {BABY_ALL_PROJECT.map(({ label, src }, i) => (
            <li key={`${label}-${i}`} className="flex flex-col gap-2">
              <p>{label}</p>
              <video
                className="desktop:w-[640px] tablet:w-[640px] w-[320px] h-auto aspect-video"
                controls
                preload={i > 3 ? 'none' : 'metadata'}
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
