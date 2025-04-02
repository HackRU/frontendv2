import { Suspense } from "react";

export default function Layout({ children
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <main className="w-fit h-fit "
      style={{
        '--bg-color': '#C49D52',
        '--text-color': '#1E1E1E',
        '--border-color': '#4C855A',
      } as React.CSSProperties}>
        {children}
        <div
          id="entry-radial"
          className="top-0 w-full h-full absolute -z-10"
        />
      </main>
    </>
  )
}