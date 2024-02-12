import AcmeLogo from "@/app/ui/acme-logo";
import { ArrowRightIcon } from "@heroicons/react/24/outline";
import Link from "next/link";
import { lusitana } from "@/app/ui/fonts";
import Image from "next/image";
import Hero from "./sections/Hero/Hero";
import Schedule from "./sections/Schedule";
import { Suspense, useEffect } from "react";
import Sponsors from "./sections/Sponsors";
import About from "./sections/About";
import FAQ from "./sections/FAQ/FAQ";
import GenericSection from "./sections/GenericSection";
import Cursor from '@/app/ui/cursor';
import { StarryBackground } from "./misc/StarsBackground";

export default function Page() {
  return (
    <main className="flex flex-col h-fit relative">
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

        <GenericSection title="Schedule">
          <Suspense fallback={<>Loading Schedule!</>}>
            <Schedule />
          </Suspense>
        </GenericSection>
        <GenericSection title="Sponsors">
          <Suspense fallback={<>Loading Sponsors!</>}>
            <Sponsors />
          </Suspense>
        </GenericSection>
        <GenericSection title="FAQ" color="bg-gray-900">
          <FAQ />
          <Image
            src="/landing/wand-cats-combined.png"
            alt="bottom image"
            object-fit="cover"
            style={{
              width: '100%',
              height: 'auto',
            }}
            width={500}
            height={300}
          />
        </GenericSection>
      </div>
      <Suspense>
        <StarryBackground numberOfStars={150} />
      </Suspense>
    </main>
  );
}
