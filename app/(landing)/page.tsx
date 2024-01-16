import AcmeLogo from '@/app/ui/acme-logo';
import { ArrowRightIcon } from '@heroicons/react/24/outline';
import Link from 'next/link';
import { lusitana } from '@/app/ui/fonts';
import Image from 'next/image';
import Hero from './sections/Hero';
import Schedule from './sections/Schedule';
import { Suspense } from 'react';

export default function Page() {
  return (
    <main className="flex min-h-screen flex-col p-6">
      <div>
        <Hero />
        <Suspense fallback={<>Loading Schedule!</>}>
          <Schedule />
        </Suspense>
      </div>
    </main>
  );
}
