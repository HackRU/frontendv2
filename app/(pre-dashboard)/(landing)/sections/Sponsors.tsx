import React from 'react';
import Image from 'next/image';
import Link from 'next/link'
export default async function Sponsors() {
  const sponsors = [
     '/landing/S2025/foodplaceholderflat.png',
  ];

  const sponsorsLinks = [
    'https://www.hackru.org',
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
        src={"/landing/S2025/foodplaceholder.png"}
        width="300"
        height="300"
        className="w-[300px] lg:w-[400px] absolute left-0 -bottom-[200px] lg:-bottom-[300px] z-30"
        alt={'cool'}
        quality={50}
      />
    </div>
  );
}
