'use client';

import type { Metadata } from 'next';
export const metadata: Metadata = {
  title: 'LSW|ERROR',
  description: 'LSW ERROR PAGE',
};

export default function ErrorPage({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <div>error page</div>
      <div>{children}</div>
    </>
  );
}
