import { ArrowRightIcon } from '@heroicons/react/24/outline';
import Link from 'next/link';
import { fredoka } from '@/app/ui/fonts';
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

export default async function Page() {

  redirect("/offseason")

  return (
    <main
      className={`f2026-landing-page relative flex h-fit flex-col ${fredoka.className} text-s2025black-100`}
      /* flat ground plus a glow tiled per viewport. Inline because the JIT
         drops these stops, and a partial Tailwind gradient would inherit
         someone else's. The page is far too tall for one page-sized glow. */
      style={{
        backgroundColor: '#C4D4A2',
        backgroundImage:
          'radial-gradient(75% 45% at 50% 38%, rgba(247,250,178,0.95) 0%, rgba(233,240,164,0.35) 45%, rgba(233,240,164,0) 75%)',
        backgroundSize: '100% 100vh',
        backgroundRepeat: 'repeat-y',
      }}
    >
      <div className="overflow-x-hidden overflow-y-hidden">
        <Hero2 />

        {/* pulls About up into the transparent centre channel of frog.png.
            vw because the artwork's height scales with viewport width. */}
        <div className="relative z-10 mt-[-153vw]">
          <About />
        </div>
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
        <div className="relative w-full">
          <Image
            src="/landing/F2026/fairy-bottom.png"
            alt="Fairy at the bottom of the page"
            // the asset's real size - the old 400x300 was from bottom.png
            width={1440}
            height={1471}
            // h-auto instead of the deprecated layout="responsive"
            className="h-auto w-full"
            loading="lazy"
          />
        </div>
      </div>
    </main>
  );
}
