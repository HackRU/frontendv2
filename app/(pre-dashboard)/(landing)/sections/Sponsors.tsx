import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
export default async function Sponsors() {
  const sponsors = [
    '/sponsors/wakefern2.png',
    '/sponsors/cloudflare.png',
    '/sponsors/Pure-Buttons-Blue-Gradient-Logo-RGB.png',
    '/sponsors/RNBCES_H_RED_BLACK_RGB.png',
    '/sponsors/GoogleCloud.png',
    '/sponsors/nexos-ai-logo-MAIN-black-horizontal.png',
    '/sponsors/RHNIC_RED_WHITE_RBG.png',
    '/sponsors/saily-logo-yellow_2.png',
    '/sponsors/NordVPN_Logo_RGB_Primary_Blue_Black.png',
    '/sponsors/Bloomberg_Engineering_black.png',
    '/sponsors/nord1.png',
    '/sponsors/nord2.png',
    '/sponsors/nord3.png',
  ];

  const sponsorsLinks = [
    'https://www2.wakefern.com/',
    'https://www.cloudflare.com/',
    'https://www.purebuttons.com/',
    'https://careers.rutgers.edu/',
    'https://cloud.google.com/',
    'https://nexos.ai/',
    'https://brainhealthinstitute.rutgers.edu/',
    'https://saily.com/',
    'https://nordvpn.com/',
    'https://www.bloomberg.com/company/what-we-do/engineering-cto/',
    'https://nordprotect.com/',
    'https://nordpass.com/',
    'https://incogni.com/',
    '',
  ];

  return (
    <div className="relative z-10 mb-20 flex w-full justify-center px-6">
      {/* empty board - none confirmed yet. The lists above are kept so the
          grid is one map away when they are. */}
      <div
        className="w-full max-w-3xl rounded-3xl"
        // inline: the JIT never emitted bg-[#5B6660]/85 and this went transparent
        style={{
          aspectRatio: '4 / 3',
          backgroundColor: 'rgba(91,102,96,0.85)',
        }}
        aria-label="Sponsors to be announced"
      />
    </div>
  );
}
