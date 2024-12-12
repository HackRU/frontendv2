"use client"; 

import { useState } from 'react';
import Image from 'next/image';
import { Button } from '@/app/ui/button';
 
export default function OffseasonPage() {
  return (
    <main className="flex h-[100vh] w-[100vw] flex-col items-center justify-center  relative">
      
      {/* HackRU Information Section */}
      <section className="relative z-10 mt-20 text-center">
        <h1 className="text-6xl font-extrabold text-white drop-shadow-lg">
          HackRU Offseason
        </h1>
        <p className="mt-4 text-2xl text-gray-300 drop-shadow-md">
          Thanks for your interest in HackRU! Our registrations are not open yet, but you can follow us on our social channels to stay updated.
        </p>
        <Button
          className="text-s text-grey-500 mt-2 hover:text-blue-500 cursor-pointer bg-green-600"
          onClick={() => window.open('https://www.instagram.com/thehackru/', '_blank')}
        >
          Follow us on Instagram
        </Button>
      </section>

      {/* Photos from the Last HackRU Section */}
      <section className="relative z-10 mt-20">
        <h2 className="text-4xl font-semibold text-gray-200 text-center drop-shadow-md">
          Photos from the last HackRU
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 mt-8">
          <div className="relative w-80 h-60 overflow-hidden rounded-lg shadow-lg transform transition hover:scale-105 hover:shadow-2xl justify-self-center">
            <Image src="/offseason/offseason1.jpg" alt="Photo 1" layout="fill" objectFit="cover" />
          </div>
          <div className="relative w-80 h-60 overflow-hidden rounded-lg shadow-lg transform transition hover:scale-105 hover:shadow-2xl justify-self-center">
            <Image src="/offseason/offseason2.jpg" alt="Photo 2" layout="fill" objectFit="cover" />
          </div>
          <div className="relative w-80 h-60 overflow-hidden rounded-lg shadow-lg transform transition hover:scale-105 hover:shadow-2xl justify-self-center">
            <Image src="/offseason/offseason3.jpg" alt="Photo 3" layout="fill" objectFit="cover" />
          </div>
        </div>
      </section>

      {/* Linktree Section */}
      <section className="relative z-10 mt-20 text-center">
        <h2 className="text-3xl font-semibold text-gray-200 drop-shadow-md">
          Explore More
        </h2>
        <p className="mt-4 text-lg text-gray-300 drop-shadow-sm">
          Check out all our links and resources on our Linktree!
        </p>
        <Button
          className="text-s text-grey-500 m-2 cursor-pointer bg-green-600"
          onClick={() => window.open('https://linktr.ee/thehackru', '_blank')}
        >
          Visit Our Linktree
        </Button>
        <Button
          className="text-s text-grey-500  m-2 cursor-pointer bg-green-600"
          onClick={() => window.open('http://mlh.io/code-of-conduct', '_blank')}
        >
          Code of Conduct
        </Button>
      </section>
    </main>
  );
}
