'use client';

import Loading from '@/components/Loading';
import { Suspense } from 'react';
import Navigation from '@templates/Navigation';

export default function ClientLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Suspense fallback={<Loading />}>
        <div>
          <Navigation />
          <main className="min-w-[320px] w-full h-full overflow-hidden duration-300">
            <div className="relative w-full h-full m-auto">{children}</div>
          </main>
        </div>
      </Suspense>
    </>
  );
}
