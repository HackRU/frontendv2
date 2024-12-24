'use client';
import Image from 'next/image';
import Navbar from './Navbar';
import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { getSelf } from '@/app/lib/data';
import { bigelowRules, fuzzy } from '@/app/ui/fonts';

const FIRE_IMG = ['/landing/S2025/HACKRU_main_title.png'];
const POKER_IMG = ['/landing/S2025/hero-main-art.png'];

const animationTime = 800;
const fireImageQuality = 10;
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
        className="relative flex w-full flex-col items-center justify-center overflow-hidden sm:flex sm:h-[100vh] sm:flex-row-reverse"
        id="Home"
      >
        <div className='relative flex w-full justify-center'>
          <div className='flex w-full items-end justify-end'>
            <div className='h-auto w-[790px] xs:max-w-[400px] md:w-[800px] lg:w-[900px] xl:w-[1000px] relative'>

              <div className="md:absolute -bottom-[200px] right-[100px] md:right-[0px] z-10">
                <Image
                  src={POKER_IMG[0]}
                  alt="Poker"
                  width="1000"
                  height="1000"
                  priority
                />
              </div>

            </div>
          </div>

        </div>
        <div className="relative flex flex-col items-center justify-center h-auto z-20">
          <div
            className="relative left-0 top-0 h-auto w-[790px]
        xs:max-w-[320px] sm:max-w-[576px] md:w-[500px]
        md:pl-8 lg:w-[700px] xl:w-[800px]"
          >
            <Image
              src={FIRE_IMG[0]}
              quality={fireImageQuality}
              width="900"
              height="900"
              alt="Fire"
              className={
                "relative"
              }
              priority
            />
          </div>
          <div className="items-left flex-col">
            <p
              className={`${fuzzy.className} text-2xl`}
            >
              <span className="text-[#536F91]">THE GAMES ARE </span>
              <span className="text-[#ADD8E6]">ON!</span>
            </p>
            <p
              className={`${fuzzy.className} text-2xl`}
            >
              <span className="text-[#ADD8E6]">Oct 26-27! </span>
            </p>
            <div className="mt-10 flex justify-center space-x-4">
              <button
                className="z-30 items-center justify-center
            rounded-lg border-x-4 border-y-2 border-solid
            border-[#C3557D] bg-transparent text-sm text-[#C3557D]
            transition-all duration-100 hover:drop-shadow-[0_0_20px_#C3557D]
            xs:h-[26px] xs:w-[99px]
            sm:h-[45px] sm:w-[179px]
            sm:text-lg md:h-[37px]
            md:w-[145px] lg:h-[42px]
            lg:w-[168px]"
                onClick={() => router.push('/signup')}
              >
                SIGN UP
              </button>
              <button
                className="z-30 items-center justify-center
            rounded-lg border-x-4 border-y-2 border-solid
            border-[#EC9655] bg-transparent text-sm text-[#EC9655]
            transition-all duration-100 hover:drop-shadow-[0_0px_20px_#EC9655]
            xs:h-[26px] xs:w-[99px]
            sm:h-[45px] sm:w-[179px]
            sm:text-lg md:h-[37px]
            md:w-[145px] lg:h-[42px]
            lg:w-[168px]"
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
      </div>
    </>
  );
}
