import { ArrowRightIcon } from '@heroicons/react/24/outline';
import Link from 'next/link';
import { azeret } from '@/app/ui/fonts';
import Image from 'next/image';
import Hero from './sections/Hero/Hero';
import Hero2 from './sections/Hero/Hero2';
import Schedule from './sections/Schedule';
import { Suspense, useEffect } from 'react';
import Sponsors from './sections/Sponsors';
import About from './sections/About';
import FAQ from './sections/FAQ/FAQ';
import Team from './sections/Team/Team';
import PastTeam from './sections/PastTeam/PastTeam';
import GenericSection from './sections/GenericSection';
import { getSponsors } from '@/app/lib/data';
import React from 'react';

import { redirect } from 'next/navigation';

export default async function Page() {
  return (
    <main
      className={`relative flex h-fit flex-col ${azeret.className} bg-gradient-to-b from-[#DBF5F8] to-[#54A0A8] text-s2025black-100`}
    >
      <div className="overflow-x-hidden overflow-y-hidden">
        <Hero2 />

        <About />
        {/**
         * We are using Suspense because Schedule and Sponsors will eventually
         * pull from the backend. Also, we will need to replace the fallback
         * component to a relevant loading component.
         */}
        <GenericSection title="Schedule">
          <Suspense fallback={<>Loading Schedule!</>}>
            <Schedule />
          </Suspense>
        </GenericSection>
        <GenericSection title="Sponsors">{<Sponsors />}</GenericSection>
        <GenericSection title="FAQ" color="from-blue-500">
          <FAQ />
        </GenericSection>
        {/* { <GenericSection title="Meet the Team"> 
          <Team />
        </GenericSection> }
        { <GenericSection title="Past Team Members"> 
          <PastTeam />
        </GenericSection> } */}
        <div className="-mt-[1000px]">
          <Image
            src="/landing/F2025/bottom.png"
            alt="bottom image"
            layout="responsive"
            width={400}
            height={300}
            loading="lazy"
          />
        </div>
      </div>
    </main>
  );
}
