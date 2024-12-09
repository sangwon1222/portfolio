'use client';

import { ProjectCard } from './ProjectCard';
import { Grid1Ratio2 } from './Grid1Ratio2';
import { useI18n } from '@/locales/client';

export default function Experience() {
  const t = useI18n();
  return (
    <>
      <div id="experience" className="h-20" />
      <div className="flex flex-col items-center gap-10 px-2 w-full">
        {/* Title */}
        <h3 className="px-2 m-auto w-fit text-center relative after:contents-[''] after:block after:absolute after:w-full after:h-2 after:bg-red-400 after:z-[1] after:left-0 after:bottom-0 after:animate-pulse animate-pulse">
          <span className="relative z-[2] py-6">{t('experience').toUpperCase()}</span>
        </h3>

        {/* 이력 나열 */}
        <div className="flex flex-col gap-5 p-2 desktop:p-2 tablet:p-7 min-w-[320px] max-w-[700px] w-full">
          <Grid1Ratio2 label={t('sonid')} period="2023.03 ~ 2024.07" href="http://www.sonid.co.kr/">
            <ProjectCard
              label={t('thinkTag')}
              hashtagList={['Next.js', 'React', 'Vercel', 'PostgresQL', 'PWA', 'Typescript']}
              projectLink=""
            />
            <ProjectCard
              label={t('sonidInspect')}
              hashtagList={['React', 'Electron.js', 'SQLite', 'Node.js', 'Typescript']}
              projectLink=""
            />
            <ProjectCard label={t('sonidHyoSung')} hashtagList={['c#']} projectLink="" />
            <ProjectCard label={t('sonidLF')} hashtagList={['c#']} projectLink="" />
          </Grid1Ratio2>

          <Grid1Ratio2
            label={t('aionco')}
            period="2021.11 ~ 2023.02"
            href="https://home.yesbee.com/"
          >
            <ProjectCard
              label={t('yesbee')}
              hashtagList={['Nextjs', 'React', 'React-Query', 'Typescript']}
              projectLink=""
            />
            <ProjectCard label={t('hiveCenter')} hashtagList={['Vue3', 'Ag-Grid']} projectLink="" />
            <ProjectCard
              label={t('hiveCenterPDA')}
              hashtagList={['Vue3', 'Ag-Grid']}
              projectLink=""
            />
          </Grid1Ratio2>

          <Grid1Ratio2
            label={t('miniGate')}
            period="2020.05 ~ 2021.08"
            href="https://www.minigate.net/"
          >
            <ProjectCard
              label={t('babyall')}
              hashtagList={['Vue2', 'Pixi.js', 'Typescript']}
              projectLink="/project/babyall"
            />
            <ProjectCard
              label={t('haruhangul')}
              hashtagList={['Vue2', 'Pixi.js', 'Typescript']}
              projectLink="/project/hangul"
            />
            <ProjectCard
              label={t('iceCream')}
              hashtagList={['Vue2', 'Pixi.js', 'Typescript']}
              projectLink=""
            />
            <ProjectCard
              label={t('chunjaeEducation')}
              hashtagList={['Vue2', 'Pixi.js', 'Typescript']}
              projectLink=""
            />
            <ProjectCard
              label={t('miniGateProject')}
              hashtagList={['Vue2', 'Pixi.js', 'Typescript']}
              projectLink=""
            />
          </Grid1Ratio2>
        </div>
      </div>
    </>
  );
}
