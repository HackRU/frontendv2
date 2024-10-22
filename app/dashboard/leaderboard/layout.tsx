import { Suspense } from "react";

export default function Layout({ children
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <main className="w-fit h-fit ">
        {children}
        <div
          id="entry-radial"
          className="top-0 w-full h-full absolute -z-10"
        />
      </main>
    </>
  )
}