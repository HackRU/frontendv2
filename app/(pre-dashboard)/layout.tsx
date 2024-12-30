import { Suspense } from 'react';
import Cursor from '../ui/cursor';
import Navbar from './(landing)/sections/Hero/Navbar';

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <main className="relative h-fit w-fit ">
        <Navbar />
        {/* <Suspense>
          <Cursor />
        </Suspense> */}
        {children}
        <Suspense></Suspense>
      </main>
    </>
  );
}
