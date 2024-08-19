import Loading from "@/components/loading";
import InstallPrompt from "@/components/pwa/InstallPrompt";
import RecoilRootProvider from "@/components/recoilRootProvider";
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/next";
import type { Metadata } from "next";
import { Noto_Sans_KR } from "next/font/google";
import { Suspense } from "react";
import { Toaster } from "react-hot-toast";
import "../globals.css";
import { Provider } from "./provider";
import Navigation from "@/components/template/navigation";
import DarkModeProvider from "./themeProvider";
const notoSansKr = Noto_Sans_KR({
  subsets: ["latin"],
  weight: ["100", "400", "700", "900"],
});

export const metadata: Metadata = {
  title: "LSW",
  description: "LSW: 개발 포트폴리오",
  openGraph: {
    title: "LSW",
    description: "LSW: 개발 포트폴리오",
    url: "https://www.lsw.kr",
  },
  icons: [{ rel: "icon", url: "/assets/icon-192x192.png", sizes: "192x192" }],
};

export default async function RootLayout({
  children,
  params: { locale },
}: Readonly<{
  children: React.ReactNode;
  params: { locale: string };
}>) {
  return (
    <html lang={locale} suppressHydrationWarning>
      <body className={`${notoSansKr.className} min-w-[320px]`}>
        <Analytics />
        <SpeedInsights />

        <DarkModeProvider>
          <RecoilRootProvider>
            <Toaster />
            <InstallPrompt />

            <Provider locale={locale}>
              <Navigation />
              <main className="min-w-[320px] w-full  duration-300">
                <div className="relative max-w-[1280px] w-full m-auto">
                  <Suspense fallback={<Loading />}>
                    <div className="m-auto  w-full">{children}</div>
                  </Suspense>
                </div>
              </main>
            </Provider>
          </RecoilRootProvider>
        </DarkModeProvider>
      </body>
    </html>
  );
}
