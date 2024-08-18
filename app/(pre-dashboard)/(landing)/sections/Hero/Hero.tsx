'use client';
import Image from 'next/image';
import Navbar from './Navbar';
import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { getSelf } from '@/app/lib/data';
import { bigelowRules, longCang } from '@/app/ui/fonts';

const FIRE_IMG = ['/landing/logo_F24.png'];
const POKER_IMG = ['/landing/hackru_asset.png'];

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
        className="relative flex w-full flex-col items-center justify-center overflow-hidden md:flex md:h-[100vh] md:flex-row-reverse"
        id="Home"
      >
        <div className='relative flex w-full justify-center'>
          <div className = 'h-auto w-[790px] xs:max-w-[400px] sm:max-w-[500px] md:w-[600px] md:min-w-[700px] lg:w-[800px] xl:w-[900px] z-10'>
        <Image
          src={POKER_IMG[0]}
          alt="Poker"
          width="900"
          height="900"
          className={'relative right-0 top-0'}
          priority
        />
        </div>
        </div>
        <div className="relative flex flex-col items-center justify-center min-h-[400px] z-20">
          <div
            className="relative left-0 top-0 h-auto w-[790px]
        xs:max-w-[320px] sm:max-w-[576px] md:w-[500px] md:min-w-[600px]
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
          <div className="items-left flex-col  ">
            <p
              className={`${longCang.className} text-2xl`}
            >
              <span className = "text-[#536F91]">THE GAMES ARE </span>
              <span className = "text-[#ADD8E6]">ON!</span>
            </p>
            <div className="mt-10 flex justify-center space-x-4">
              <button
                className="z-30 items-center justify-center
            rounded-lg border-x-4 border-y-2 border-solid
            border-pink-500 bg-transparent text-sm text-pink-500
            transition-all duration-100 hover:drop-shadow-[0_0_8px_pink]
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
            border-orange-500 bg-transparent text-sm text-orange-500
            transition-all duration-100 hover:drop-shadow-[0_0_8px_orange]
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
