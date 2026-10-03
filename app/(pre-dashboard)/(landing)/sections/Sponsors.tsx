import React from 'react';
import Image from 'next/image';
export default async function Sponsors() {
  const sponsorSlots = [
    {
      name: 'Pure Buttons',
      image: '/sponsors/Pure-Buttons-Blue-Gradient-Logo-RGB.png',
      href: 'https://www.purebuttons.com/',
    },
    {
      name: 'Google',
      image: '/sponsors/google.png',
      href: 'https://www.google.com/',
    },
    {
      name: 'Lucera',
      image: '/sponsors/lucera.png',
      href: 'https://lucera.com/',
    },
    {
      name: 'Rutgers New Brunswick Career Exploration and Success',
      image: '/sponsors/RNBCES_H_RED_BLACK_RGB.png',
      href: 'https://careers.rutgers.edu/',
    },
    {
      name: 'Gemini',
      image: '/sponsors/gemini.png',
      href: 'https://gemini.google.com/',
    },
    {
      name: 'Adobe',
      image: '/sponsors/adobe.png',
      href: 'https://www.adobe.com/',
    },
  ];

  return (
    <div className="relative z-10 mb-20 flex w-full justify-center px-6">
      <div
        className="w-full max-w-3xl rounded-3xl p-8"
        style={{
          aspectRatio: '4 / 3',
          backgroundColor: 'rgba(91,102,96,0.85)',
        }}
      >
        <div className="grid h-full w-full grid-cols-2 grid-rows-3 gap-x-8 gap-y-4">
          {sponsorSlots.map((sponsor, index) => (
            <div
              key={index}
              className="relative min-h-0 min-w-0"
            >
              {sponsor && (
                <a
                  href={sponsor.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`Visit ${sponsor.name}`}
                  className="relative block h-full w-full transition-transform hover:scale-105"
                >
                  <Image
                    src={sponsor.image}
                    alt={sponsor.name}
                    fill
                    sizes="(min-width: 768px) 360px, 40vw"
                    className="object-contain"
                  />
                </a>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
