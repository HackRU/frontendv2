'use client';
import Image from 'next/image';
import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { getSelf } from '@/app/lib/data';
import { fredoka } from '@/app/ui/fonts';

/**
 * F2026 hero. tree-background.png and frog.png are two layers of one artwork,
 * both 3500x7665, so stacking them at inset-0 keeps them aligned at any width.
 * The wordmark and the two pills are type and CSS - F26 ships no art for them.
 */

const BG_W = 3500;
const BG_H = 7665;

async function fetchUser(cb: (isLogged: boolean) => void) {
  try {
    const data = await getSelf();
    if (data.error !== '') {
      cb(false);
      return;
    }
    cb(true);
  } catch (error) {
    console.log(error);
  }
}

export default function Hero() {
  const [isLogged, setIsLogged] = useState(false);
  const router = useRouter();

  // Unchanged from F2025: decides whether the second button reads LOG IN or
  // DASHBOARD. Kept deliberately - this is auth behaviour, not styling.
  useEffect(() => {
    fetchUser(setIsLogged);
  }, []);

  return (
    <section className="relative w-full overflow-hidden">
      {/* in flow, so this image sets the section height - everything else is
          positioned against it */}
      <Image
        src="/landing/F2026/tree-background.png"
        alt=""
        aria-hidden="true"
        width={BG_W}
        height={BG_H}
        priority
        className="h-auto w-full select-none"
      />

      {/* same intrinsic size as the backdrop, so inset-0 lines them up */}
      <Image
        src="/landing/F2026/frog.png"
        alt="A frog in a mushroom cap working on a laptop"
        width={BG_W}
        height={BG_H}
        priority
        className="pointer-events-none absolute inset-0 h-auto w-full select-none"
      />

      {/* darkens the top so the nav reads against it */}
      <div
        className="pointer-events-none absolute inset-x-0 top-0 z-0 h-[16%]"
        // inline, not Tailwind: the JIT dropped the stops and this div then
        // inherited <main>'s, repainting the page gradient over the hero
        style={{
          backgroundImage:
            'linear-gradient(to bottom, rgba(0,0,0,0.55) 0%, rgba(0,0,0,0.18) 45%, rgba(0,0,0,0) 100%)',
        }}
      />

      {/* % padding, not px - the copy has to scale with the artwork */}
      <div className="absolute inset-x-0 top-0 z-10 flex flex-col items-center pt-[15%]">
        {/* paint-order puts the stroke behind the fill, otherwise the outline
            eats into the letterforms */}
        <h1
          className={`${fredoka.className} f2026-wordmark select-none text-center text-[2.75rem] font-black
            leading-[0.95] md:text-8xl lg:text-[8.5rem]`}
          style={{
            color: '#FBF3D0',
            paintOrder: 'stroke fill',
            letterSpacing: '-0.01em',
          }}
        >
          HACKRU
        </h1>

        <div className="mt-[2%] flex items-center justify-center gap-4 md:gap-10">
          {/* SIGN UP - pink pill */}
          <button
            onClick={() => router.push('/signup')}
            className={`${fredoka.className} rounded-full bg-[#E8579A] px-7 py-2
              text-base font-extrabold text-white
              shadow-[0_6px_0_#A82F6B,0_10px_22px_rgba(0,0,0,0.45)]
              transition-transform duration-100 hover:scale-105
              md:px-14 md:py-4 md:text-4xl`}
          >
            SIGN UP
          </button>

          {/* label and destination still come from the auth check above */}
          <button
            onClick={() => router.push(isLogged ? '/dashboard' : '/login')}
            className={`${fredoka.className} rounded-full bg-[#4A9FE0] px-7 py-2
              text-base font-extrabold text-white
              shadow-[0_6px_0_#2A6FA8,0_10px_22px_rgba(0,0,0,0.45)]
              transition-transform duration-100 hover:scale-105
              md:px-14 md:py-4 md:text-4xl`}
          >
            {!isLogged ? 'LOG IN' : 'DASHBOARD'}
          </button>
        </div>
      </div>
    </section>
  );
}
