'use client';
import Image from 'next/image';
import Navbar from './Navbar';
import React, { useState, useEffect, useRef } from 'react';
import clsx from 'clsx';
import { useRouter } from 'next/navigation';
import { getSelf } from '@/app/lib/data';

const FIRE_IMG = [
  '/landing/fire-1.png',
  '/landing/fire-2.png',
  '/landing/fire-3.png',
];

const animationTime = 800;
const fireImageQuality = 10;

async function fetchUser(cb: (isLogged: boolean) => void) {
  try {
    const data = await getSelf();

    console.log(data)

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
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [animationComplete, setAnimationComplete] = useState(true);
  const [isLogged, setIsLogged] = useState(false);
  const animationPromise = useRef(null);
  const router = useRouter();

  useEffect(() => {
    console.log('fetching user')
    fetchUser(setIsLogged);
  }, []);

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
        flex-col items-center justify-center
        md:flex md:h-[100vh] md:flex-row-reverse
        relative overflow-hidden"
        id="hero"
      >
        {/* <div className="w-full h-[75vh] bg-red-100" />
        <div className="w-full h-10 bg-red-500" /> */}

        <div className="relative h-[40vh] w-full pt-10 text-center md:w-2/5 md:pt-0">
          <div
            className="flex h-[40vh] w-full flex-col justify-center space-y-4
                       pr-3 md:pr-0
                       text-4xl sm:text-5xl
                       md:absolute md:-left-16 md:min-w-fit md:space-y-7 md:text-4xl
                       lg:-left-10 lg:text-5xl xl:space-y-8 xl:text-6xl"
          >
            <div className="mb-2 text-lg sm:text-xl md:mb-0 lg:text-3xl xl:text-4xl">
              WELCOME TO OUR
            </div>
            <div>SCHOOL OF</div>
            <div>CODECRAFT&nbsp;&</div>
            <div>CIRCUITRY!</div>
          </div>
        </div>
        <div className="relative z-10">
          <Image
            src={FIRE_IMG[currentImageIndex]}
            quality={fireImageQuality}
            width="900"
            height="900"
            alt="Fire"
            // https://stackoverflow.com/questions/69230343/nextjs-image-component-with-fixed-witdth-and-auto-height
            className="mb-32 h-auto w-[790px] xs:max-w-[320px] sm:max-w-[576px]
                       md:w-[500px] md:min-w-[500px] md:pl-8 lg:w-[600px]
                       xl:mb-10 xl:w-[650px]"
            priority
          />
          <div>
            <button
              className="absolute
                         items-center justify-center bg-black rounded-lg
                         border-solid border-y-2 border-x-4 border-brown-200
                         bg-gradient-to-t from-blue-300 to-brown-100
                         text-blue-200 text-sm sm:text-lg
                         xs:left-[103px] xs:top-[285px] xs:h-[26px] xs:w-[99px]
                         sm:left-[185px] sm:top-[513px] sm:h-[45px] sm:w-[179px]
                         md:left-[183px] md:top-[417px] md:h-[37px] md:w-[145px]
                         lg:left-[208px] lg:top-[485px] lg:h-[42px] lg:w-[168px]
                         xl:left-[208px] xl:top-[485px] xl:h-[42px] xl:w-[168px]
                         z-30
                         "
              onClick={() => {
                if (isLogged) {
                  router.push('/dashboard');
                } else {
                  router.push('/login');
                }
              }}
            >
              {!isLogged ? "LOG IN" : "DASHBOARD"}
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
