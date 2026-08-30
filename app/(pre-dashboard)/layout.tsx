'use client';

import { Suspense } from 'react';
import { usePathname } from 'next/navigation';
import Cursor from '../ui/cursor';
import Navbar from './(landing)/sections/Hero/Navbar';

export default function Layout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isAuthRoute =
    pathname === '/login' ||
    pathname === '/signup' ||
    pathname === '/forgot' ||
    pathname.startsWith('/verify/') ||
    pathname.startsWith('/magic/');

  return (
    <>
      {/* f2026-cursor: see cursor.css. Here rather than on <body> so it
          stops at the dashboard. */}
      <main className="f2026-cursor relative min-h-screen w-full">
        {!isAuthRoute && <Navbar />}
        {!isAuthRoute && (
          <Suspense>
            {/* mounts the Luge trail only - the pocket-watch image is gone */}
            <Cursor />
          </Suspense>
        )}
        {children}
        <Suspense></Suspense>
      </main>
    </>
  );
}
