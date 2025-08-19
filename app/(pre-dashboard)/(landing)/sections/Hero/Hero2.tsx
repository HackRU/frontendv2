'use client';
import Image from 'next/image';
import Navbar from './Navbar';
import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { getSelf } from '@/app/lib/data';
import { bigelowRules, azeret } from '@/app/ui/fonts';

const FIRE_IMG = ['/landing/F2025/title.png'];
const POKER_IMG = ['/landing/F2025/dragon.png'];

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
      <div className="grid w-full items-center gap-0 lg:grid-cols-2">
        <div className="z-200 justify-top flex h-auto flex-col items-center lg:-mt-[600px]">
          <div
            className="relative left-0 top-0 h-auto w-[790px]
            xs:max-w-[320px] sm:max-w-[576px]
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
            <p className={`${azeret.className} text-2xl`}>
              <span className="text-[#6D1E00]"></span>
              {/* <span className="text-[#ADD8E6]">ON!</span> */}
            </p>
            <p className={`${azeret.className} text-center text-2xl`}>
              <span className="text-black">October 4th - 5th, College Ave Student Center </span>
            </p>
            <div className="mt-10 flex justify-center space-x-4">
              <button
                className="relative z-30 items-center justify-center
                bg-transparent text-sm text-[#C3557D]
                transition-all duration-100 hover:drop-shadow-[0_0_20px_#7F9901]
                xs:h-[26px] xs:w-[99px]
                sm:h-[45px] sm:w-[179px]
                sm:text-lg md:h-[37px]
                md:w-[145px] lg:h-[42px]
                lg:w-[400px]"
                onClick={() => router.push('/signup')}
              >
                <Image
                  src="/landing/F2025/button1.png"
                  alt="Sign up icon"
                  width={900}
                  height={400}
                  className="absolute top-0"
                />
                <div className="relative h-full w-full">
                  <p className="text-l relative pt-6 text-white sm:text-2xl md:pt-4 md:text-xl lg:pt-16 lg:text-4xl">
                    SIGN UP
                  </p>
                </div>
              </button>
              <button
                className="relative z-30 items-center justify-center
                bg-transparent text-sm text-[#EC9655]
                transition-all duration-100 hover:drop-shadow-[0_0px_20px_#1A3127]
                xs:h-[26px] xs:w-[99px]
                sm:h-[45px] sm:w-[179px]
                sm:text-lg md:h-[37px]
                md:w-[145px] lg:h-[42px]
                lg:w-[400px]"
                onClick={() => {
                  if (isLogged) {
                    router.push('/dashboard');
                  } else {
                    router.push('/login');
                  }
                }}
              >
                <Image
                  src="/landing/F2025/button2.png"
                  alt="Sign up icon"
                  width={900}
                  height={400}
                  className="absolute top-0"
                />
                <p className="text-l relative pt-6 text-white sm:text-2xl md:pt-4 md:text-xl lg:pt-16 lg:text-4xl">
                  {!isLogged ? 'LOG IN' : 'DASHBOARD'}
                </p>
              </button>
            </div>
          </div>
        </div>
        <div className="flex">
          <Image
            src={'/landing/F2025/dragon.png'}
            alt="Dragon"
            width="1500"
            height="1500"
            priority
          />
        </div>
      </div>
    </>
  );
}
