"use client";
import Image from 'next/image';
import Navbar from './Navbar';
import React, { useState, useEffect } from "react";
import clsx from 'clsx';

const FIRE_IMG = [
  "/landing/fire3.png",
  "/landing/fire1.png",
  "/landing/fire2.png",
];

const animationTime = 700;

export default function Hero() {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [completelyLoadedImages, setCompletedLoadedImages] = useState(0);

  useEffect(() => {
    let intervalId: NodeJS.Timeout | undefined;

    if (completelyLoadedImages >= 3) {
      intervalId = setInterval(() => {
        setCurrentImageIndex((prevIndex) => (prevIndex + 1) % FIRE_IMG.length);
      }, animationTime);
    }


    return () => {
      if (intervalId) {
        clearInterval(intervalId);
      }
    };
  }, [completelyLoadedImages]);

  return (
    <>
      <Navbar />
      <div
        className="flex w-full
        flex-col items-center justify-center bg-gray-100
        md:flex md:h-[100vh] md:flex-row-reverse
        "
      >
        {/* <div className="w-full h-[75vh] bg-red-100" />
        <div className="w-full h-10 bg-red-500" /> */}

        <div className="relative h-[40vh] w-full pt-10 text-center md:pt-0 lg:w-2/5">
          <div
            className="flex h-[40vh] w-full flex-col justify-center space-y-4 text-5xl
                       md:absolute md:-left-20 md:min-w-fit md:space-y-7 md:text-4xl
                       lg:-left-10 lg:text-5xl xl:space-y-8 xl:text-6xl"
          >
            <div className="mb-2 text-xl md:mb-0 lg:text-3xl xl:text-4xl">
              WELCOME TO OUR
            </div>
            <div>SCHOOL OF</div>
            <div>CODECRAFT&nbsp;&</div>
            <div>CIRCUITRY!</div>
          </div>
        </div>

        <Image
          src={FIRE_IMG[0]}
          width="0"
          height="0"
          sizes="100vw"
          alt="Fire"
          // https://stackoverflow.com/questions/69230343/nextjs-image-component-with-fixed-witdth-and-auto-height
          className={clsx("h-auto w-[790px] pl-8 md:w-[800px] lg:w-[800px]", {
            "opacity-100": currentImageIndex === 0,
            "opacity-0 absolute": currentImageIndex !== 0,
          })}
          priority
          onLoad={() => {
            setCompletedLoadedImages((prev) => prev + 1);
          }}
        />
        <Image
          src={FIRE_IMG[1]}
          width="0"
          height="0"
          sizes="100vw"
          alt="Fire"
          // https://stackoverflow.com/questions/69230343/nextjs-image-component-with-fixed-witdth-and-auto-height
          className={clsx("h-auto w-[790px] pl-8 md:w-[800px] lg:w-[800px]", {
            "opacity-100": currentImageIndex === 1,
            "opacity-0 absolute ": currentImageIndex !== 1,
          })}
          onLoad={() => {
            setCompletedLoadedImages((prev) => prev + 1);
          }}
        />
        <Image
          src={FIRE_IMG[2]}
          width="0"
          height="0"
          sizes="100vw"
          alt="Fire"
          // https://stackoverflow.com/questions/69230343/nextjs-image-component-with-fixed-witdth-and-auto-height
          className={clsx("h-auto w-[790px] pl-8 md:w-[800px] lg:w-[800px]", {
            "opacity-100": currentImageIndex === 2,
            "opacity-0 absolute ": currentImageIndex !== 2,
          })}
          onLoad={() => {
            setCompletedLoadedImages((prev) => prev + 1);
          }}
        />
      </div>
    </>
  );
}
