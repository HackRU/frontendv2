import { Suspense } from "react";

export default function Layout({ children
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <main className="w-fit h-fit relative">
        {children}
        <div
          id="entry-radial"
          className="top-0 w-full h-full absolute -z-10"
        />

        <div
          id="dialog"
          className="fixed top-0 left-0 w-full h-full flex justify-center items-center bg-black bg-opacity-60 z-50"
        >
          <div className="bg-white p-4 rounded-lg">
            <p>HackRU is currently experiencing issues with login and registration. Please come back later!</p>
          </div>
        </div>
      </main>
    </>
  )
}