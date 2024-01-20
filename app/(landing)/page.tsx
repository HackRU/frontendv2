import AcmeLogo from '@/app/ui/acme-logo';
import { ArrowRightIcon } from '@heroicons/react/24/outline';
import Link from 'next/link';
import { lusitana } from '@/app/ui/fonts';
import Image from 'next/image';
import Hero from './sections/Hero/Hero';
import Schedule from './sections/Schedule';
import { Suspense } from 'react';
import Sponsors from './sections/Sponsors';
import About from './sections/About';
import FAQ from './sections/FAQ';

export default function Page() {
  return (
    <main className="flex min-h-screen flex-col">
      <div>
        <Hero />
        <About />
        {
          /**
           * We are using Suspense because Schedule and Sponsors will eventually
           * pull from the backend. Also, we will need to replace the fallback
           * component to a relevant loading component.
           */
        }
        <Suspense fallback={<>Loading Schedule!</>}>
          <Schedule />
        </Suspense>
        <Suspense fallback={<>Loading Sponsors!</>}>
          <Sponsors />
        </Suspense>
        <FAQ />
      </div>
    </main>
  );
}
