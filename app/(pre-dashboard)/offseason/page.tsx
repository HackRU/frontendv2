'use client';

import { useState } from 'react';
import Image from 'next/image';
import { Button } from '@/app/ui/button';
import InterestForm from '@/app/ui/interestForm';

export default function ComingSoonPage() {
  return (
    <main className="relative flex min-h-screen w-screen flex-col items-center overflow-y-auto bg-gray-900 pt-28 text-white">
      <h1 className="mt-4 text-center text-6xl font-bold">
        HackRU Coming Soon
      </h1>
      <p className="mt-4 px-4 text-center text-lg">
        HackRU is back in{' '}
        <span className="font-bold text-teal-400">the Fall </span>
        Registration will open in the Fall, so stay tuned for more information.
      </p>

      <div className="mt-8 px-4 text-center">
        <p className="mb-4 text-lg">
          Follow us on our socials through Linktree to stay updated and never
          miss an announcement!
        </p>
        <Button
          className="rounded-full bg-teal-500 px-6 py-3 font-medium text-white shadow-lg transition duration-300 hover:bg-teal-400 hover:shadow-2xl"
          onClick={() => window.open('https://linktr.ee/thehackru', '_blank')}
        >
          Visit Our Linktree
        </Button>
      </div>

      <div className="mt-12 w-full max-w-6xl px-4">
        <h2 className="mb-8 text-center text-4xl font-semibold">
          Memories from HackRU
        </h2>
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3">
          {[1, 2, 3].map((i) => (
            <div
              key={i}
              className="relative h-60 w-full transform justify-self-center overflow-hidden rounded-lg shadow-lg transition hover:scale-105 hover:shadow-2xl"
            >
              <Image
                src={`/offseason/offseason${i}.jpg`}
                alt={`Photo ${i}`}
                layout="fill"
                objectFit="cover"
              />
            </div>
          ))}
        </div>
      </div>

      {/* Interest Form Section */}
      <div className="mt-12 w-full max-w-4xl px-4">
        <InterestForm />
      </div>

      <div className="mt-12 px-4 text-center">
        <Button
          className="mb-8 mt-4 rounded-full bg-blue-500 px-6 py-3 font-medium text-white shadow-lg transition duration-300 hover:bg-blue-400 hover:shadow-2xl"
          onClick={() => window.open('http://mlh.io/code-of-conduct', '_blank')}
        >
          MLH Code of Conduct
        </Button>
      </div>
    </main>
  );
}
