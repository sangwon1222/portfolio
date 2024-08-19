"use client";
import { useChangeLocale, useCurrentLocale } from "@/locales/client";
import { KR, US } from "country-flag-icons/react/3x2";

export default function LocaleButton({ customCss }: { customCss?: string | undefined }) {
  const getLocale = useCurrentLocale();
  const changeLocale = useChangeLocale();

  const defaultStyle = "w-20 cursor-pointer";
  const styleClass = `${defaultStyle} ${customCss ? customCss : ""}`;
  return getLocale == "en" ? (
    <KR title="KOREA" onClick={() => changeLocale("ko")} className={styleClass} />
  ) : (
    <US title="United States" onClick={() => changeLocale("en")} className={styleClass} />
  );
}
