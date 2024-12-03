'use client';
import RecoilRootProvider from './recoil/recoilRootProvider';
import ListMobileProvider from './listMobile/ListProvider';
import LoadingProvider from './loading/LoadingProvider';
import DarkModeProvider from './theme/themeProvider';
import { type ReactNode } from 'react';
import { I18nProviderClient } from '@/locales/client';

type ProviderProps = {
  locale: 'ko' | 'en';
  children: ReactNode;
};

export function Provider({ locale, children }: ProviderProps) {
  return (
    <DarkModeProvider>
      <ListMobileProvider>
        <LoadingProvider>
          <RecoilRootProvider>
            <I18nProviderClient locale={locale}>{children}</I18nProviderClient>
          </RecoilRootProvider>
        </LoadingProvider>
      </ListMobileProvider>
    </DarkModeProvider>
  );
}
