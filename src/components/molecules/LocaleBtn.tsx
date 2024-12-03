import { useChangeLocale, useCurrentLocale } from '@/locales/client';

export const LocaleBtn = () => {
  const currentLocale = useCurrentLocale();
  const changeLocale = useChangeLocale();

  const isKorean = currentLocale === 'ko';

  const onChangeLocale = () => {
    const newLocale = isKorean ? 'en' : 'ko';
    changeLocale(newLocale);
  };

  return (
    <button
      className="overflow-hidden group w-10 h-10 border-2 dark:border-slate-600 rounded"
      onClick={onChangeLocale}
    >
      <div
        className={`overflow-hidden relative flex w-20 rounded shadow duration-200 ${currentLocale === 'ko' ? '-left-10 group-hover:left-0' : 'left-0 group-hover:-left-10'}`}
      >
        <div className="flex items-center justify-center w-1/2 h-10">EN</div>
        <div className="flex items-center justify-center w-1/2 h-10">KO</div>
      </div>
    </button>
  );
};
