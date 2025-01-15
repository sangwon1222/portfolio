import type { Metadata } from 'next';
import '@/app/globals.css';
import { SpeedInsights } from '@vercel/speed-insights/next';
import InstallPrompt from '@templates/pwa/InstallPrompt';
import { Analytics } from '@vercel/analytics/react';
import { Toaster } from 'react-hot-toast';
import { Provider } from '@app/providers/provider';
import ClientLayout from '@/components/pages/ClientLayout';
import Script from 'next/script';
import ServiceWorkerRegister from '@/components/ServiceWorker';

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
        {/* <!-- Google tag (gtag.js) --> */}
        <Script async src="https://www.googletagmanager.com/gtag/js?id=G-KRPLHM3RN1"></Script>
        <Script>
          {`window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());

  gtag('config', 'G-KRPLHM3RN1');`}
        </Script>

        <ServiceWorkerRegister />
        <Analytics />
        <SpeedInsights />
        <Toaster />
        <InstallPrompt />

        <Provider locale={locale}>
          <ClientLayout>{children}</ClientLayout>
        </Provider>
      </body>
    </html>
  );
}
