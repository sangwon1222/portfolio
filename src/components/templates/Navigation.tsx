'use client';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import ListBtn from '@atoms/ListBtn';
import ThemeBtn from '@molecules/ThemeBtn';
import useTheme from '@/app/providers/theme/useTheme';
import useListMobile from '@/app/providers/listMobile/useListMobile';
import { memo } from 'react';
import { NAV_LIST } from '@/constants/nav';
import { GitBtn } from '@molecules/GitBtn';
import { LocaleBtn } from '@molecules/LocaleBtn';

const Navigation: React.FC = memo(() => {
  const router = useRouter();
  const { theme } = useTheme();
  const { open, setListMobile } = useListMobile();

  const goPage = (pageName: string) => {
    setListMobile(false);
    router.push(pageName);
  };

  const pathname = usePathname();
  const hasNotNavigation = pathname.split('/').length > 3 && pathname.includes('/game/');
  if (hasNotNavigation) return null;

  return (
    <div className="sticky top-0 z-20 min-w-[320px] w-full shadow-lg backdrop-blur-3xl h-20">
      <div className="flex flex-col justify-start w-full max-w-[1280px] m-auto font-bold">
        <div className="flex justify-between items-center w-full px-4">
          <ListBtn />

          <Link href="/">
            <Image
              src={theme === 'dark' ? '/assets/logo-white.png' : '/assets/logo-color.png'}
              alt="logo"
              width={100}
              height={50}
              placeholder="blur"
              blurDataURL="/assets/logo-white.png"
              style={{ width: 100, height: 50 }}
              loading="eager"
              priority={true}
            />
          </Link>
          <div className="flex items-center h-20 gap-10">
            <div className="items-center h-full hidden desktop:flex tablet:flex ">
              {NAV_LIST.map(({ label, href }, i) => (
                <Link
                  href={href}
                  key={`${label}-i`}
                  aria-label={`${label}-button`}
                  className="px-2 center-layout h-full hover:animate-wiggle dark:hover:text-red-400 hover:text-red-600"
                >
                  {label}
                </Link>
              ))}
            </div>

            <div className="flex items-center gap-2">
              <ThemeBtn />
              <LocaleBtn />
              <GitBtn />
            </div>
          </div>
        </div>

        {/* MOBILE NAV */}
        <div
          className={`desktop:hidden tablet:hidden ${open ? 'flex' : 'hidden'} flex-col w-full h-screen dark:bg-gray-800 bg-gray-200 text-base`}
        >
          {NAV_LIST.map(({ label, href }, i) => (
            <button
              onClick={() => goPage(href)}
              key={`${label}-button-${i}`}
              className="py-5 px-7 text-start"
              aria-label={`go ${label} page`}
            >
              {label}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
});

Navigation.displayName = 'Navigation';

export default Navigation;
