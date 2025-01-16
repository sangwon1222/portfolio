/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: 'https://lsw.kr', // 사이트의 기본 URL
  generateRobotsTxt: true, // robots.txt 파일 생성
  changefreq: 'daily',
  priority: 0.7,
  exclude: ['/manifest.webmanifest'],
  i18n: {
    locales: ['en', 'ko'], // 지원하는 언어
    defaultLocale: 'ko', // 기본 언어
    localeDetection: false,
  },
  additionalPaths: async (config) => {
    // 동적 경로 수동 추가
    const dynamicPaths = [
      { loc: '/game', priority: 0.8 },
      { loc: '/game/breakTheLog', priority: 0.7 },
      { loc: '/game/cooking', priority: 0.7 },
      { loc: '/project/babyall', priority: 0.7 },
      { loc: '/project/hangul', priority: 0.7 },
    ];

    // 모든 로케일 경로 생성
    const paths = dynamicPaths.flatMap((route) =>
      config.i18n.locales.map((locale) => ({
        loc: `/${locale}${route.loc}`,
        lastmod: new Date().toISOString(),
        changefreq: config.changefreq,
        priority: route.priority,
      }))
    );

    console.log('Generated additional paths:', paths); // 디버깅 로그
    return paths;
  },
};
