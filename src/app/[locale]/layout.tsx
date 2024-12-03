import { SpeedInsights } from '@vercel/speed-insights/next';
import InstallPrompt from '@templates/pwa/InstallPrompt';
import { Analytics } from '@vercel/analytics/react';
import { Noto_Sans_KR } from 'next/font/google';
import Loading from '@/components/loading';
import { Toaster } from 'react-hot-toast';
import { Provider } from '@app/providers/provider';
import type { Metadata } from 'next';
import { Suspense } from 'react';
import '@/app/globals.css';
import Navigation from '@templates/Navigation';

export const metadata: Metadata = {
  title: 'LSW',
  description: 'LSW: 개발 포트폴리오',
  openGraph: {
    title: 'LSW',
    description: 'LSW: 개발 포트폴리오',
    url: 'https://www.lsw.kr',
  },
  icons: [{ rel: 'icon', url: '/assets/icon-192x192.png', sizes: '192x192' }],
};

export default async function RootLayout({
  children,
  params: { locale },
}: Readonly<{
  children: React.ReactNode;
  params: { locale: 'ko' | 'en' };
}>) {
  return (
    <html suppressHydrationWarning lang={locale}>
      <body className="min-w-[320px]">
        <Analytics />
        <SpeedInsights />

        <Toaster />
        <InstallPrompt />

        <Provider locale={locale}>
          <Suspense fallback={<Loading />}>
            <div>
              <Navigation />
              <main className="min-w-[320px] w-full h-full overflow-hidden duration-300">
                <div className="relative w-full h-full m-auto">{children}</div>
              </main>
            </div>
          </Suspense>
        </Provider>
      </body>
    </html>
  );
}
