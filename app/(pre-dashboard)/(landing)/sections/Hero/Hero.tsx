'use client';
import Image from 'next/image';
import Navbar from './Navbar';
import React, { useState, useEffect, useRef } from 'react';
import clsx from 'clsx';
import { useRouter } from 'next/navigation';
import { getSelf } from '@/app/lib/data';
import { bigelowRules, bizUdg } from '@/app/ui/fonts';

const FIRE_IMG = [
  '/landing/FFire1.png',
  '/landing/FFire2.png',
  '/landing/FFire3.png',
  '/landing/FFire4.png',
];

const animationTime = 800;
const fireImageQuality = 10;
/*
 * Gives time to load the images. There must be a better way to do this...
 * If the images aren't loaded yet, they flash a bit when the animation first starts.
 * This will probably not get fixed. And it will be destroyed by next hackathon.
 * There isn't time to find a better solution. :(
 */
const initialWaitTime = 1500;

async function fetchUser(cb: (isLogged: boolean) => void) {
  try {
    const data = await getSelf();

    console.log(data);

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
  const [isLogged, setIsLogged] = useState(false);
  const router = useRouter();

  useEffect(() => {
    console.log('fetching user');
    fetchUser(setIsLogged);
  }, []);

  useEffect(() => {
    let interval: NodeJS.Timeout;

    const timeout = setTimeout(() => {
      interval = setInterval(() => {
        setCurrentImageIndex((prevIndex) => (prevIndex + 1) % FIRE_IMG.length);
      }, animationTime);
    }, initialWaitTime);

    return () => {
      clearTimeout(timeout);
      clearInterval(interval);
    };
  }, []);

  return (
    <>
      <Navbar />
      <div
        className="relative flex
        w-full flex-col items-center
        justify-center overflow-hidden
        md:flex
        md:h-[100vh]
        md:flex-row-reverse
        "
        id="Home"
      >
        <Image
          src="/landing/blobs.svg"
          fill
          objectFit="cover"
          objectPosition="center"
          alt="Blobs"
          className="z-0 opacity-60"
        />
        <div className="relative z-10 w-full pt-10 text-center md:h-[26rem] md:w-2/5 md:pt-0">
          <div
            className={`drop-shadow-blueGlow flex h-[40vh] w-full flex-col justify-center
                      space-y-4
                       pr-3 md:pr-0 ${bigelowRules.className} inline-block h-fit bg-gradient-to-b
                       from-[#51F4FF] to-[#FFB464] bg-clip-text
                       pt-[10rem]
                       text-7xl text-transparent sm:text-[5.5rem] md:absolute
                       md:-left-16
                       md:min-w-fit md:space-y-7 md:pt-0 lg:-left-10 xl:space-y-8 xl:text-[7rem]
                       `}
          >
            <div
              className={`mb-2 ${bizUdg.className} xs:text-3xl text-2xl md:mb-0 lg:text-3xl xl:text-4xl`}
            >
              WELCOME TO OUR
            </div>
            <div>SCHOOL OF</div>
            <div>CODECRAFT&nbsp;&</div>
            <div>CIRCUITRY!</div>
          </div>
        </div>
        <div className="relative z-10">
          <div
            className="xs:max-w-[320px] relative left-0 top-0 mb-32 h-auto
                       w-[790px] sm:max-w-[576px] md:w-[500px] md:min-w-[500px]
                       md:pl-8 lg:w-[600px] xl:mb-10 xl:w-[650px]"
          >
            <Image
              src={FIRE_IMG[0]}
              quality={fireImageQuality}
              width="900"
              height="900"
              alt="Fire"
              // https://stackoverflow.com/questions/69230343/nextjs-image-component-with-fixed-witdth-and-auto-height
              className={
                currentImageIndex === 0
                  ? 'relative opacity-100'
                  : 'absolute left-0 top-0 opacity-0'
              }
              priority
            />
            <Image
              src={FIRE_IMG[1]}
              quality={fireImageQuality}
              width="900"
              height="900"
              alt="Fire"
              className={
                currentImageIndex === 1
                  ? 'relative opacity-100'
                  : 'absolute left-0 top-0 opacity-0'
              }
              // https://stackoverflow.com/questions/69230343/nextjs-image-component-with-fixed-witdth-and-auto-height
              priority
            />
            <Image
              src={FIRE_IMG[2]}
              quality={fireImageQuality}
              width="900"
              height="900"
              alt="Fire"
              className={
                currentImageIndex === 2
                  ? 'relative opacity-100'
                  : 'absolute left-0 top-0 opacity-0'
              }
              // https://stackoverflow.com/questions/69230343/nextjs-image-component-with-fixed-witdth-and-auto-height
              priority
            />
            <Image
              src={FIRE_IMG[3]}
              quality={fireImageQuality}
              width="900"
              height="900"
              alt="Fire"
              className={
                currentImageIndex === 3
                  ? 'relative opacity-100'
                  : 'absolute left-0 top-0 opacity-0'
              }
              // https://stackoverflow.com/questions/69230343/nextjs-image-component-with-fixed-witdth-and-auto-height
              priority
            />
          </div>

          <div>
            <button
              className="hover:drop-shadow-blueGlow border-brown-200 to-brown-100 xs:left-[103px]
                         xs:top-[285px] xs:h-[26px] xs:w-[99px] absolute
                         z-30 items-center justify-center rounded-lg
                         border-x-4 border-y-2 border-solid
                         bg-black bg-gradient-to-t from-blue-300
                         text-sm text-blue-200 transition-all duration-100
                         sm:left-[185px] sm:top-[513px] sm:h-[45px] sm:w-[179px]
                         sm:text-lg md:left-[183px] md:top-[417px] md:h-[37px]
                         md:w-[145px] lg:left-[208px] lg:top-[485px] lg:h-[42px]
                         lg:w-[168px] xl:left-[208px] xl:top-[485px] xl:h-[42px]
                         xl:w-[168px]
                         "
              onClick={() => {
                if (isLogged) {
                  router.push('/dashboard');
                } else {
                  router.push('/login');
                }
              }}
            >
              {!isLogged ? 'LOG IN' : 'DASHBOARD'}
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
