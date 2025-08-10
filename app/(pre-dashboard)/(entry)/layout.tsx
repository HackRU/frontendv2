import Image from 'next/image';

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <main
        className="h-fit w-fit bg-off_white-100"
        style={
          {
            '--bg-color': '#FFFFFF',
            '--bg-color2': '#e5e7eb',
            '--mainText-color': '#172335',
            '--border-color': '#453148',
            '--placeholder-color': '#6b7280',
            '--error-color': '#ef4444',
            '--success-color': '#ef4444',
            '--hover-color': '#141719',
            backgroundImage: 'url("/backgrounds/hero.jpg")',
          } as React.CSSProperties
        }
      >

        {children}

        <div id="entry-radial" className="absolute top-0 -z-10 h-full w-full" />
      </main>
    </>
  );
}
