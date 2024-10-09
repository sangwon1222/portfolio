import { createI18nMiddleware } from "next-international/middleware";
import { NextRequest } from "next/server";

const i18nOption = createI18nMiddleware({
  locales: ["ko", "en"],
  defaultLocale: "ko",
  urlMappingStrategy: "rewriteDefault",
});

export async function middleware(req: NextRequest) {
  return i18nOption(req);
}

// (1) 커스텀 `matcher`를 config에 설정한다.
// (2) 미들웨어 내에서의 condition으로 분기한다.
export const config = {
  /*
   * api (API 라우트)
   * _next/static (정적 파일)
   * _next/image (이미지 최적화 파일)
   * _vercel
   * favicon.ico (파비콘 파일)
   * 로 시작하지 않는 모든 요청 경로와 일치합니다.
   */
  matcher: [
    "/((?!api|static|_next|asset|firebase-messaging-sw.js|manifest.webmanifest|sw.js|favicon.ico|robots.txt).*)",
  ],
};
