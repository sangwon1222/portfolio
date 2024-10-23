"use client";
import RecoilRootProvider from "./recoil/recoilRootProvider";
import ListMobileProvider from "./listMobile/ListProvider";
import LoadingProvider from "./loading/LoadingProvider";
import DarkModeProvider from "./theme/themeProvider";
import { type ReactNode } from "react";

type ProviderProps = {
  children: ReactNode;
};

export function Provider({ children }: ProviderProps) {
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
