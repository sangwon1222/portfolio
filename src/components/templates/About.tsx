'use client';

import { useCurrentLocale, useI18n } from '@/locales/client';

export default function About() {
  const t = useI18n();
  const currentLocale = useCurrentLocale();
  return (
    <>
      <div id="about" className="h-20" />
      <div className="flex flex-col items-center gap-10 px-2 w-full ">
        {/* Title */}
        <h3 className="px-2 m-auto w-fit text-center relative after:contents-[''] after:block after:absolute after:w-full after:h-2 after:bg-red-400 after:z-[1] after:left-0 after:bottom-0 after:animate-pulse animate-pulse">
          <span className="relative z-[2] py-6">{t('about').toUpperCase()}</span>
        </h3>

        {/* 소개 글 */}
        <div className="min-w-[320px] max-w-[700px] w-full p-2 desktop:p-2 tablet:p-7">
          <ul className="flex flex-col gap-5 border p-2">
            <li className="flex flex-col gap-3">
              <p className="font-bold text-xl">
                {t('aboutMe')}
                <br /> <span className="text-main-2">{t('myName')}</span>
                {currentLocale == 'ko' && '입니다.'}
              </p>

              <p></p>
            </li>

            <li>
              <ul className="list-disc px-5 font-normal">
                <li>{t('aboutMeSub1')}</li>
                <li>{t('aboutMeSub2')}</li>
                <li>{t('aboutMeSub3')}</li>
              </ul>
            </li>
          </ul>
        </div>
      </div>
    </>
  );
}
