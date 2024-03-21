import React from 'react';
import Image from 'next/image';
export default async function Sponsors() {
  const sponsors = [
    '/sponsors/icims.png',
    '/sponsors/wakefern.png',
    '/sponsors/RU-climate-action.png',
    '/sponsors/cloudflare.jpeg',
  ];

  return (
    <div
      className="relative z-10 mb-20 flex w-full justify-center"
      id="Sponsors"
    >
      <div className="flex h-fit w-full max-w-7xl flex-col items-center">
        <div className="transparent-black-background text-text relative flex flex-col items-center rounded-3xl md:flex-col md:items-start">
          {sponsors.map((sponsorURL, index) => {
            console.log(sponsorURL);
            console.log('=====================');
            return (
              <div key={index} className="relative mb-4 h-[20vh] w-[50vw]">
                <Image
                  src={sponsorURL}
                  alt="Sponsor Logo"
                  // height={150}
                  // width={300}
                  layout="fill"
                  objectFit="contain"
                />
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
