"use client";
import RecoilRootProvider from "./recoil/recoilRootProvider";
import ListMobileProvider from "./listMobile/ListProvider";
import LoadingProvider from "./loding/LoadingProvider";
import { I18nProviderClient } from "@/locales/client";
import DarkModeProvider from "./theme/themeProvider";
import { type ReactNode } from "react";

type ProviderProps = {
  locale: string;
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
