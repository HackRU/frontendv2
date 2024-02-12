import { Suspense } from "react";
import Cursor from "../ui/cursor";
import Navbar from "./(landing)/sections/Hero/Navbar";

export default function Layout({ children
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <main>
        <Navbar />
        <Suspense>
          <Cursor />
        </Suspense>
        {children}
      </main>
    </>
  )
}