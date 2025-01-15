const CACHE_NAME = 'lsw-page-cache-v1';

// 오프라인 캐싱할 리소스 목록
const PRECACHE_URLS = [
  '/', // 루트 페이지
  '/index.html', // 메인 HTML
  '/css/styles.css',
  '/js/app.js',
  '/images/logo.png',
];

// 1. 서비스 워커 설치(Install) 단계
self.addEventListener('install', (event) => {
  console.log('[Service Worker] Install');
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      console.log('[Service Worker] Caching offline page & assets');
      return cache.addAll(PRECACHE_URLS);
    })
  );
});

// 2. 서비스 워커 활성화(Activate) 단계
self.addEventListener('activate', (event) => {
  console.log('[Service Worker] Activate');
  event.waitUntil(
    // 이전 버전의 캐시가 있으면 정리
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          // 현재 버전과 다른 캐시는 삭제
          if (cacheName !== CACHE_NAME) {
            console.log('[Service Worker] Deleting old cache:', cacheName);
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
});

// 3. fetch 이벤트 - 오프라인 캐싱 로직
self.addEventListener('fetch', (event) => {
  // 예: 네트워크 요청을 가로채, 캐시 우선(Cache First) 전략 사용
  event.respondWith(
    caches.match(event.request).then((cachedResponse) => {
      // 캐시에 존재하면 즉시 반환
      if (cachedResponse) {
        return cachedResponse;
      }
      // 캐시에 없으면 네트워크로 요청 후 캐시에 저장
      return fetch(event.request).then((networkResponse) => {
        return caches.open(CACHE_NAME).then((cache) => {
          // 요청에 성공했다면 캐시에 추가
          cache.put(event.request, networkResponse.clone());
          return networkResponse;
        });
      });
    })
  );
});
