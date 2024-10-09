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
          <RecoilRootProvider>{children}</RecoilRootProvider>
        </LoadingProvider>
      </ListMobileProvider>
    </DarkModeProvider>
  );
}

{
  /* <I18nProviderClient locale={locale}></I18nProviderClient> */
}
