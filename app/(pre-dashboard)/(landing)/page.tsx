import AcmeLogo from "@/app/ui/acme-logo";
import { ArrowRightIcon } from "@heroicons/react/24/outline";
import Link from "next/link";
import { bigelowRules, bizUdg } from "@/app/ui/fonts";
import Image from "next/image";
import Hero from "./sections/Hero/Hero";
import Schedule from "./sections/Schedule";
import { Suspense, useEffect } from "react";
import Sponsors from "./sections/Sponsors";
import About from "./sections/About";
import FAQ from "./sections/FAQ/FAQ";
import GenericSection from "./sections/GenericSection";
import { BASE } from "@/app/lib/definitions";
import { getSponsors } from "@/app/lib/data";

export default async function Page() {

  return (
    <main className={`flex flex-col h-fit relative ${bizUdg.className} text-orange-100`}>
      <div className="overflow-y-hidden overflow-x-hidden">
        <Hero />
        <About />
        {
          /**
           * We are using Suspense because Schedule and Sponsors will eventually
           * pull from the backend. Also, we will need to replace the fallback
           * component to a relevant loading component.
           */
        }
        <GenericSection title="Schedule">
          <Suspense fallback={<>Loading Schedule!</>}>
            <Schedule />
          </Suspense>
        </GenericSection>
        {/* {sponsors &&
          <GenericSection title="Sponsors">
            <Suspense fallback={<>Loading Sponsors!</>}>
              <Sponsors sponsors={sponsors} />
            </Suspense>
          </GenericSection>
        } */}
        <GenericSection title="FAQ" color="from-dark_blue_figma">
          <FAQ />
        </GenericSection>
        <div className="bg-gradient-to-b from-dark_blue_figma to-[#1B1F23]">
          <Image
            src="/landing/kittywizards.svg"
            alt="bottom image"
            object-fit="cover"
            style={{
              width: '100%',
              height: 'auto',
            }}
            width={400}
            height={300}
          />
        </div>
      </div>
    </main>
  );
}
