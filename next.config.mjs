/** @type {import('next').NextConfig} */
import withPWA from 'next-pwa';

const PWAoption = withPWA({
  dest: 'public', // 서비스 워커 파일과 관련된 파일들을 public 폴더에 저장
  disable: process.env.NODE_ENV === 'development',
  register: true, // 서비스 워커를 자동으로 등록하도록 설정
  skipWaiting: true, // 새로운 서비스 워커가 설치되자마자 이전 버전의 서비스 워커를 대체하도록 설정. => 업데이트시 빠르게 적용됨
  customWorkerDir: 'worker', // 커스텀 서비스 워커 폴더를 지정
  // runtimeCaching, //PWA가 오프라인 작동을 지원하기 위해 캐싱해주는 역할
});

const nextConfig = {
  reactStrictMode: true,
  trailingSlash: true, // 모든 URL에 슬래시를 추가 (정적 파일 경로와 호환성 확보)

  async headers() {
    return [
      {
        // matching all API routes
        source: '/api/:path*',
        headers: [
          { key: 'Accept', value: 'application/json' },
          { key: 'Content-Type', value: 'application/json' },
          { key: 'Access-Control-Allow-Credentials', value: 'true' },
          { key: 'Access-Control-Allow-Origin', value: '*' },
          {
            key: 'Access-Control-Allow-Methods',
            value: 'GET,OPTIONS,PATCH,DELETE,POST,PUT',
          },
          {
            key: 'Access-Control-Allow-Headers',
            value:
              'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version',
          },
        ],
      },
    ];
  },
};
export default PWAoption(nextConfig);
