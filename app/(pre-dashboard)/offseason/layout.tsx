import { Suspense } from 'react';

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <main className="h-fit w-fit ">
        {children}
        <div id="entry-radial" className="absolute top-0 -z-10 h-full w-full" />
      </main>
    </>
  );
}
