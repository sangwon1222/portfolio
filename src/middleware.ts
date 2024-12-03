import { createI18nMiddleware } from "next-international/middleware";
import { NextRequest } from "next/server";

const i18nOption = createI18nMiddleware({
  locales: ["ko", "en"],
  defaultLocale: "ko",
  //   urlMappingStrategy: "rewriteDefault",
});

export async function middleware(req: NextRequest) {
  console.log({ req });
  return i18nOption(req);
}

export const config = {
  matcher: [
    "/((?!api|static|_next|asset|firebase-messaging-sw.js|manifest.webmanifest|sw.js|favicon.ico|robots.txt).*)",
  ],
};
