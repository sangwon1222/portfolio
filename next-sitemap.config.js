module.exports = {
  siteUrl: "https://lsw.kr",
  generateRobotsTxt: true,
  changefreq: "weekly",
  priority: 0.8,
  sitemapSize: 5000,
  exclude: ["/404"],
  robotsTxtOptions: {
    policies: [{ userAgent: "*", allow: "/" }],
  },
  additionalPaths: async (config) => [
    {
      loc: "/game", // game 페이지 추가
      changefreq: "weekly",
      priority: 0.8,
    },
  ],
};
