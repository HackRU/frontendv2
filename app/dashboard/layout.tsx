import { Suspense } from "react";
import Cursor from "../ui/cursor";
import Navbar from "../(pre-dashboard)/(landing)/sections/Hero/Navbar";
//import { StarryBackground } from "../(pre-dashboard)/(landing)/misc/StarsBackground";


export default function Layout({ children
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <main
        className="w-screen h-screen relative"
        id="entry-radial"
      >
        <Navbar />
        <Suspense>
          <Cursor />
        </Suspense>
        {children}
        <Suspense>
          {/* <StarryBackground /> */}
        </Suspense>
      </main>
    </>
  )
}