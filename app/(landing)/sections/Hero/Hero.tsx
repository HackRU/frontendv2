'use client';
import Image from 'next/image';
import Navbar from './Navbar';
import React, { useState, useEffect, useRef } from 'react';
import clsx from 'clsx';

const FIRE_IMG = [
  '/landing/fire-1.png',
  '/landing/fire-2.png',
  '/landing/fire-3.png',
];

const animationTime = 800;
const fireImageQuality = 10;

export default function Hero() {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [animationComplete, setAnimationComplete] = useState(true);
  const animationPromise = useRef(null);

  useEffect(() => {
    const waitForAnimation = () => {
      return new Promise((resolve) => {
        if (animationComplete) {
          resolve(undefined);
        } else {
          const checkComplete = setInterval(() => {
            if (animationComplete) {
              clearInterval(checkComplete);
              resolve(undefined);
            }
          }, 100);
        }
      });
    };

    const animate = async () => {
      while (true) {
        await waitForAnimation();
        setAnimationComplete(false);

        setCurrentImageIndex((prevIndex) => (prevIndex + 1) % FIRE_IMG.length);

        await new Promise((resolve) => setTimeout(resolve, animationTime));

        setAnimationComplete(true);
      }
    };

    animate();

    return () => {
      animationPromise.current = null;
    };
  }, []);

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

        <div className="relative h-[40vh] w-full pt-10 text-center md:pt-0 md:w-2/5">
          <div
            className="flex h-[40vh] w-full flex-col justify-center space-y-4 text-5xl
                       md:absolute md:-left-16 md:min-w-fit md:space-y-7 md:text-4xl
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
        <div className="relative">
          <Image
            src={FIRE_IMG[currentImageIndex]}
            quality={fireImageQuality}
            width="900"
            height="900"
            alt="Fire"
            // https://stackoverflow.com/questions/69230343/nextjs-image-component-with-fixed-witdth-and-auto-height
            className={
              'mb-32 h-auto w-[790px] pl-8 md:w-[500px] md:min-w-[500px] lg:w-[600px] xl:mb-10 xl:w-[650px]'
            }
            priority
          />
          <div>
            <button
              className="absolute items-center justify-center bg-black 
                         xl:left-[232px] xl:top-[550px] xl:h-[49px] xl:w-[191px]
                         lg:left-[215px] lg:top-[506px] lg:h-[45px] lg:w-[176px]
                         md:left-[183px] md:top-[417px] md:h-[37px] md:w-[145px]
                         top-0 bottom-0 left-0 right-0
                         "
            />
          </div>
        </div>
      </div>
    </>
  );
}
