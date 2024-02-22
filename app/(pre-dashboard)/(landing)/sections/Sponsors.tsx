/*export default function Sponsors() {
  return (
    <div
      className="flex h-[100vh] max-h-[1300px] w-full
      flex-col items-center justify-center"
    >
      <h1 className="text-5xl font-extrabold">Sponsors</h1>
    </div>
  );
}*/
import React from 'react';
import Image from 'next/image';
import { getSponsors } from '@/app/lib/data';
export default async function Sponsors() {
  const sponsors = await getSponsors();

  return (
    <div className="relative mb-20 flex w-full justify-center z-10" id="Sponsors">
      <div className="flex h-fit w-full max-w-7xl flex-col items-center">
        <div className="transparent-black-background text-text relative flex flex-col items-center rounded-3xl md:flex-col md:items-start">
          {sponsors && sponsors.map((sponsorURL, index) => (
            <div key={index} className="mb-4">
              <Image src={sponsorURL} alt='Sponsor Logo' height={150} width={300} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}