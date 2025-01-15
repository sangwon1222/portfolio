import { MetadataRoute } from 'next';

export default function manifest(): MetadataRoute.Manifest {
  return {
    theme_color: '#97282C',
    background_color: '#ffffff',
    display: 'standalone',
    scope: '/',
    start_url: '/',
    name: '프론트엔드 이상원 | 포트폴리오',
    description:
      '프론트엔드 개발자 이상원의 포트폴리오. React, Next.js, TypeScript 등을 활용한 UI/UX 경험을 소개합니다.',
    short_name: '프론트엔드 이상원 | 포트폴리오',
    icons: [
      {
        src: '/assets/icon-192x192.png',
        sizes: '192x192',
        type: 'image/png',
      },
      {
        src: '/assets/icon-256x256.png',
        sizes: '256x256',
        type: 'image/png',
      },
      {
        src: '/assets/icon-384x384.png',
        sizes: '384x384',
        type: 'image/png',
      },
      {
        src: '/assets/icon-512x512.png',
        sizes: '512x512',
        type: 'image/png',
      },
    ],
    id: 'https://lsw.kr/',
    dir: 'ltr',
    lang: 'ko',
    orientation: 'natural',
    display_override: ['window-controls-overlay'],
  };
}
