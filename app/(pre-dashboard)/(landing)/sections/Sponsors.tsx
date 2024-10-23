import React from 'react';
import Image from 'next/image';
import Link from 'next/link'
export default async function Sponsors() {
  const sponsors = [
     '/sponsors/NJTRANSIT.png',
     '/sponsors/RHNIC_RED_WHITE_RBG.png',
     '/sponsors/CAIT2.png',
     '/sponsors/iCIMSWhite.png',
     '/sponsors/GoogleCloud.png',
     '/sponsors/RGC_Logo_Default.png',
     '/sponsors/godspeed.png',
     '/sponsors/saily-logo-yellow_2.png'
  ];

  const sponsorsLinks = [
    'https://www.njtransit.com/innovation',
    'https://www.canva.com/design/DAGSRyhN4jE/q65xcClKrYfxJka-VgXBwA/watch?utm_content=DAGSRyhN4jE&utm_campaign=share_your_design&utm_medium=link&utm_source=shareyourdesignpanel',
    'https://cait.rutgers.edu/about/',
    'https://www.icims.com',
    'https://cloud.google.com',
    'https://rutgers.campuslabs.com/engage/organization/rgc',
    'https://saily.com/',
    'https://godspeedapp.com/'
 ];

  return (
    <div
      className="relative z-10 mb-20 flex w-[100vw] justify-center"
      id="Sponsors"
    >
      <div className="flex h-fit w-[100vw] flex-col items-center">
        <div className="transparent-black-background text-text relative flex w-full flex-col items-center rounded-3xl md:flex-row md:items-start justify-evenly">
          <div className="mx-2">
            {sponsors
              .filter((_, index) => index % 2 != 0)
              .map((sponsorURL, index) => {
                return (
                  <div
                    key={index}
                    className="relative mb-4 h-[30vh] md:w-[40vw] w-[80vw]"
                  >
                    <Link href={sponsorsLinks[(index*2)+1]}>
                    <Image
                      src={sponsorURL}
                      alt="Sponsor Logo"
                      layout="fill"
                      objectFit="contain"
                    />
                    </Link>
                  </div>
                );
              })}
          </div>
          <div className="mx-2">
            {sponsors
              .filter((_, index) => index % 2 == 0)
              .map((sponsorURL, index) => {
                return (
                  <div
                    key={index}
                    className="relative mb-4 h-[30vh] md:w-[30vw] w-[70vw]"
                  >
                    <Link href={sponsorsLinks[index*2]}>
                    <Image
                      src={sponsorURL}
                      alt="Sponsor Logo"
                      layout="fill"
                      objectFit="contain"
                    />
                    </Link>
                  </div>
                );
              })}
          </div>
        </div>
      </div>
      <Image
        src={"/landing/cat poker cards 2.png"}
        width="300"
        height="300"
        className="w-[300px] lg:w-[400px] absolute left-0 -bottom-[500px] lg:-bottom-[700px] z-30"
        alt={'cool'}
        quality={50}
      />
    </div>
  );
}
