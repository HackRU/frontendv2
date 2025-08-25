import { Suspense } from 'react';
import Cursor from '../ui/cursor';
import Navbar from '../(pre-dashboard)/(landing)/sections/Hero/Navbar';
import { inter } from '@/app/ui/fonts';
//import { StarryBackground } from "../(pre-dashboard)/(landing)/misc/StarsBackground";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <main className={`relative h-screen w-screen ${inter.className}`} id="entry-radial">
        <Navbar />
        <Suspense>
          <Cursor />
        </Suspense>
        {children}
        <Suspense>{/* <StarryBackground /> */}</Suspense>
      </main>
    </>
  );
}
