'use client';
import Image from 'next/image';
import Navbar from './Navbar';
import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { getSelf } from '@/app/lib/data';
import { bigelowRules, brush } from '@/app/ui/fonts';

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
        className="flex h-full w-full items-center justify-center
        bg-[url('/landing/S2025/texture-background.png')] bg-cover bg-center bg-no-repeat"
      >
        <div
          className="relative flex w-full max-w-[1100px] flex-col items-center
           justify-center sm:flex sm:h-[100vh] md:flex-row-reverse"
          id="Home"
        >
          <div className="relative flex w-full justify-center">
            <div className="flex w-full items-end justify-end">
              <div className="relative h-auto w-[790px] xs:w-[400px] md:w-[400px] lg:w-[500px]">
                <div className="-bottom-[200px] right-[100px] z-10 -mb-10 mt-20 md:absolute md:-bottom-[200px] md:right-[0px] md:-mb-0 md:mt-0 md:w-[500px] lg:-bottom-[350px] lg:w-[700px]">
                  <Image
                    src={POKER_IMG[0]}
                    alt="Poker"
                    width="2000"
                    height="2000"
                    priority
                  />
                  <Image
                    src="/landing/S2025/smoke.png"
                    alt="smoke"
                    width="2000"
                    height="2000"
                    className="absolute -left-32 top-5 scale-[1.8] sm:-left-72 sm:-top-14 sm:scale-[2.8] md:-top-20 md:scale-[3]"
                  />
                </div>
              </div>
            </div>
          </div>
          <div className="relative z-20 mb-40 flex h-auto flex-col items-center justify-center">
            <div
              className="relative left-0 top-0 h-auto w-[790px]
            xs:max-w-[320px] sm:-mt-52 sm:max-w-[576px]
            md:w-[500px] md:pl-8 lg:w-[700px] xl:w-[800px]"
            >
              <Image
                src={FIRE_IMG[0]}
                quality={fireImageQuality}
                width="900"
                height="900"
                alt="Fire"
                className={'relative'}
                priority
              />
            </div>
            <div className="items-left flex-col">
              <p className={`${brush.className} text-2xl`}>
                <span className="text-[#6D1E00]">it&apos;s time to cook! </span>
                {/* <span className="text-[#ADD8E6]">ON!</span> */}
              </p>
              <p className={`${brush.className} text-2xl`}>
                <span className="text-white">
                  October 4th - 5th, TBD{' '}
                </span>
              </p>
              <div className="mt-10 flex justify-center space-x-4">
                <button
                  className="relative z-30 items-center justify-center
                bg-transparent text-sm text-[#C3557D]
                transition-all duration-100 hover:drop-shadow-[0_0_10px_#62a99d]
                xs:h-[26px] xs:w-[99px]
                sm:h-[45px] sm:w-[179px]
                sm:text-lg md:h-[37px]
                md:w-[145px] lg:h-[42px]
                lg:w-[168px]"
                  onClick={() => router.push('/signup')}
                >
                  <div className="relative h-full w-full">
                    <Image
                      src="/landing/S2025/signup-button.png"
                      alt="Sign up icon"
                      width={400}
                      height={400}
                      className="absolute top-0"
                    />
                    <p className="relative pt-2 text-lg text-white sm:text-4xl md:pt-4 md:text-2xl lg:text-4xl">
                      SIGN UP
                    </p>
                  </div>
                </button>
                <button
                  className="relative z-30 items-center justify-center
                bg-transparent text-sm text-[#EC9655]
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
                  <Image
                    src="/landing/S2025/login-button.png"
                    alt="Sign up icon"
                    width={400}
                    height={400}
                    className="absolute top-0 "
                  />
                  <p className="relative pt-2 text-lg text-white sm:text-4xl md:pt-4 md:text-2xl lg:text-4xl">
                    {!isLogged ? 'LOG IN' : 'DASHBOARD'}
                  </p>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
