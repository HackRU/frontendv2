import { ArrowRightIcon } from '@heroicons/react/24/outline';
import Link from 'next/link';
import { brush } from '@/app/ui/fonts';
import Image from 'next/image';
import Hero from './sections/Hero/Hero';
import Schedule from './sections/Schedule';
import { Suspense, useEffect } from 'react';
import Sponsors from './sections/Sponsors';
import About from './sections/About';
import FAQ from './sections/FAQ/FAQ';
//import Team from './sections/Team';
import GenericSection from './sections/GenericSection';
import { getSponsors } from '@/app/lib/data';
import React from 'react';

import { redirect } from 'next/navigation';

export default async function Page() {
  return (
    <main
      className={`relative flex h-fit flex-col ${brush.className} text-s2025black-100 bg-gradient-to-b from-tan_2-100 to-off_white-100`}
    >
      <div className="overflow-x-hidden overflow-y-hidden">
        <Hero />


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
        {/* <GenericSection title="Team">
          <Team />
        </GenericSection> */}
        <div className="">
          <Image
            src="/landing/S2025/bottomofpage.png"
            alt="bottom image"
            object-fit="cover"
            style={{
              width: '100%',
              height: 'auto',
            }}
            width={400}
            height={300}
            quality={100}
            unoptimized
          />
        </div>
      </div>
    </main>
  );
}
