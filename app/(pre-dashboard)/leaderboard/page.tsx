'use client';
import React, { useEffect, useState } from 'react';
import { getLeaderboard } from '@/app/lib/data';
import GenericSection from '../(landing)/sections/GenericSection';
import Image from 'next/image';

interface LeaderboardEntry {
  place: string;
  points: number;
  house: string;
  logo: string;
}

function quickSort(
  arr: LeaderboardEntry[],
  low = 0,
  high = arr.length - 1,
): LeaderboardEntry[] {
  if (low < high) {
    const pivotIndex = partition(arr, low, high);
    quickSort(arr, low, pivotIndex - 1);
    quickSort(arr, pivotIndex + 1, high);
  }
  return arr;
}

function partition(arr: LeaderboardEntry[], low: number, high: number): number {
  const pivot = arr[high];
  let i = low - 1;

  for (let j = low; j < high; j++) {
    if (arr[j].points >= pivot.points) {
      i++;
      [arr[i], arr[j]] = [arr[j], arr[i]];
    }
  }

  [arr[i + 1], arr[high]] = [arr[high], arr[i + 1]];
  return i + 1;
}

const Leaderboard = () => {
  const [leaderboard, setLeaderboard] = useState<any[]>([
    { house: 'Loading...' },
    { house: 'Loading...' },
    { house: 'Loading...' },
    { house: 'Loading...' },
  ]);

  const logoImage = [
    '/landing/bitsprout.png',
    '/landing/python.png',
    '/landing/pseudoclaw.png',
    '/landing/roar.js.png',
  ];

  const fetchData = async () => {
    try {
      const data = await getLeaderboard();
      const updatedData = quickSort(data, 0, data.length - 1);

      for (let i = 0; i < updatedData.length; i++) {
        if (updatedData[i].house == 'Bitsprout') {
          updatedData[i].logo = '/landing/bitsprout.png';
        }
        if (updatedData[i].house == 'Python') {
          updatedData[i].logo = logoImage[1];
        }
        if (updatedData[i].house == 'Pseudoclaw') {
          updatedData[i].logo = logoImage[2];
        }
        if (updatedData[i].house == 'Roar.js') {
          updatedData[i].logo = logoImage[3];
        }
      }
      setLeaderboard(updatedData);
    } catch (err) {
      // TODO I wanna show this on screen
      console.error('Unable to fetch leaderboard data', err);
    }
  };
  useEffect(() => {
    fetchData();

    const interval = setInterval(() => {
      fetchData();
    }, 120000);

    return () => clearInterval(interval);
  }, []);

  return (
    <main className="flex h-[100vh] w-[100vw] flex-col items-center justify-center overflow-hidden md:flex">
      <div className="z-10 flex justify-center text-orange-300">
        <table className="w-[90vw] border-separate rounded-3xl bg-black bg-opacity-[50%] font-mono [border-spacing:1.00rem]">
          <thead className="rounded-3xl ring-1 ring-orange-300 sm:ring-4">
            <tr className="text-xs sm:text-lg md:text-xl lg:text-2xl ">
              <th className="w-[20%] py-4 font-extrabold">Place</th>
              <th className="w-[20%] font-extrabold">Points</th>
              <th className="w-[60%] text-center font-extrabold">House</th>
            </tr>
          </thead>
          <tbody className="rounded-3xl ring-1 ring-orange-300 sm:ring-4 ">
            {leaderboard.map((Leaderboard, index) => {
              console.log(Leaderboard);
              if (Leaderboard.house === 'Loading...') {
                return (
                  <tr
                    key={index}
                    className=" lx:text-5xl text-xs  sm:text-lg md:text-2xl lg:text-4xl"
                  >
                    <td className="text-center font-extrabold">
                      <div className="flex min-h-[90px] items-center">
                        <div>{Leaderboard.house}</div>
                      </div>
                    </td>
                  </tr>
                );
              }
              return (
                <tr
                  key={index}
                  className="lx:text-5xl text-xs sm:text-lg md:text-2xl lg:text-4xl"
                >
                  <td className="text-center font-extrabold">{index + 1}</td>
                  <td className="text-center font-extrabold">
                    {Leaderboard.points}
                  </td>
                  <td className="text-center font-extrabold">
                    <div className="flex flex-row justify-center">
                      <div className="flex w-[75%] flex-row items-center justify-between">
                        {Leaderboard.house}
                        <div className="relative h-[100px] w-[100px]">
                          <Image
                            src={Leaderboard.logo}
                            alt="logo"
                            layout="fill"
                            objectFit="contain"
                          />
                        </div>
                      </div>
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </main>
  );
};
export default Leaderboard;
