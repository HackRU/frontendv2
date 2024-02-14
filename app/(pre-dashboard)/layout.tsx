import { Suspense } from "react";
import Cursor from "../ui/cursor";
import Navbar from "./(landing)/sections/Hero/Navbar";
import { StarryBackground } from "./(landing)/misc/StarsBackground";

export default function Layout({ children
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <main className="w-fit h-fit relative">
        <Navbar />
        <Suspense>
          <Cursor />
        </Suspense>
        {children}
        <Suspense>
          <StarryBackground />
        </Suspense>
      </main>
    </>
  )
}