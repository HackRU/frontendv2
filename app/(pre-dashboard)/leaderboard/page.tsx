'use client';
import React, { useEffect, useState } from 'react';
import { getLeaderboard } from '@/app/lib/data';
import GenericSection from '../(landing)/sections/GenericSection';
import Image from 'next/image';
import { fuzzy } from '@/app/ui/fonts';

interface LeaderboardEntry {
  place: string;
  id: string;
  points: number;
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
  const [leaderboard, setLeaderboard] = useState<LeaderboardEntry[]>([
    { id: 'Loading...', points: 0 },
    { id: 'Loading...', points: 0 },
    { id: 'Loading...', points: 0 },
    { id: 'Loading...', points: 0 },
  ]);


  const fetchData = async () => {
    try {
      const data = await getLeaderboard();
      const mappedData = data.map((entry: any) => ({
        id: entry._id,
        points: entry.total_points,
      }));

      const sortedData = quickSort(mappedData, 0, mappedData.length - 1);

      setLeaderboard(sortedData);
    } catch (err) {
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
    <main className={`flex h-[100vh] w-[100vw] flex-col items-center justify-center overflow-hidden md:flex ${fuzzy.className}`}>
      <div className="z-10 flex justify-center text-blue-100">
        <table className="w-[90vw] border-separate rounded-3xl bg-gradient-to-b from-offblack-100 to-[#453148]   [border-spacing:1.00rem]">
          <thead className="rounded-3xl ring-1 ring-pink-100 sm:ring-4">
            <tr className="text-lg sm:text-2xl md:text-3xl lg:text-4xl ">
              <th className="w-[20%] py-4 font-extrabold">Place</th>
              <th className="w-[20%] font-extrabold">Player</th>
              <th className="w-[20%] text-center font-extrabold">Points</th>
            </tr>
          </thead>
          <tbody className="rounded-3xl ring-1 ring-pink-100 sm:ring-4 ">
            {leaderboard.map((Leaderboard, index) => {
              console.log(Leaderboard);
              if (Leaderboard.id === 'Loading...') {
                return (
                  <tr
                    key={index}
                    className=" lx:text-5xl text-xs  sm:text-lg md:text-2xl lg:text-4xl"
                  >
                    <td className="text-center font-extrabold">
                      <div className="flex min-h-[90px] items-center">
                        <div>{Leaderboard.id}</div>
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
                    <div className="flex flex-row justify-center">
                      <div className="flex w-[75%] flex-row items-center justify-between">
                        {Leaderboard.id}
                        <div className="relative h-[100px] w-[100px]">

                        </div>
                      </div>
                    </div>
                  </td>
                  
                  <td className="text-center font-extrabold">
                    {Leaderboard.points}
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
