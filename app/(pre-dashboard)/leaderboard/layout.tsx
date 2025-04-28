import { Suspense } from 'react';

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <main
        className="h-fit w-fit "
        style={
          {
            '--bg-color': '#C49D52',
            '--text-color': '#1E1E1E',
            '--border-color': '#4C855A',
          } as React.CSSProperties
        }
      >
        {children}
        <div id="entry-radial" className="absolute top-0 -z-10 h-full w-full" />
      </main>
    </>
  );
}
