export default function Layout({ children
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <main
        className="w-fit h-fit "
        style={{
        '--bg-color': '#172335',
        '--bg-color2': '#453148',
        '--mainText-color': '#FFFFFF',
        '--border-color': '#e5e7eb',
        '--placeholder-color': '#6b7280',
        '--error-color': '#ef4444',
        '--hover-color': '#141719',
        backgroundImage: 'url("/backgrounds/hero.jpg")',
      } as React.CSSProperties}
      >
        {children}
        <div
          id="entry-radial"
          className="top-0 w-full h-full absolute -z-10"
        />
      </main>
    </>
  )
}