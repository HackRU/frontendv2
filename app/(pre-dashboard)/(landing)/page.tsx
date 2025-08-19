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
      {/* Cloud Background Assets */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* Large Clouds - Top */}
        <Image
          src="/landing/F2025/cloud1.png"
          alt=""
          width={200}
          height={120}
          className="absolute top-10 left-10 opacity-60 animate-float-slow"
          priority={false}
        />
        <Image
          src="/landing/F2025/cloud2.png"
          alt=""
          width={250}
          height={150}
          className="absolute top-20 right-16 opacity-50 animate-float-medium"
          priority={false}
        />
        
        {/* Medium Clouds - Middle */}
        <Image
          src="/landing/F2025/cloud11.png"
          alt=""
          width={180}
          height={108}
          className="absolute top-[40%] left-[5%] opacity-40 animate-float-fast"
          priority={false}
        />
        <Image
          src="/landing/F2025/cloud12.png"
          alt=""
          width={160}
          height={96}
          className="absolute top-[50%] right-[8%] opacity-45 animate-float-slow"
          priority={false}
        />
        
        {/* Small Clouds - Bottom */}
        <Image
          src="/landing/F2025/cloud21.png"
          alt=""
          width={140}
          height={84}
          className="absolute top-[70%] left-[15%] opacity-35 animate-float-medium"
          priority={false}
        />
        <Image
          src="/landing/F2025/cloud22.png"
          alt=""
          width={120}
          height={72}
          className="absolute top-[80%] right-[12%] opacity-30 animate-float-fast"
          priority={false}
        />
      </div>

      <div className="overflow-x-hidden overflow-y-hidden relative z-10">
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