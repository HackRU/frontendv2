'use client';

import { Dialog, Transition } from '@headlessui/react';
import { useState, Fragment } from 'react';
import Image from 'next/image';
import { fredoka } from '@/app/ui/fonts';

function ScheduleOfTheDay(props: { dayInfo: DayInfo }) {
  const { dayInfo } = props;
  const { day, times } = dayInfo;
  return (
    /* plain two-column list - F2025's serif day name and vertical rule are gone */
    <div
      className="relative z-[2] my-1 flex w-full flex-col md:my-2"
      style={{ fontFamily: fredoka.style.fontFamily }}
    >
      <div className="mb-2 text-left text-[15px] font-extrabold uppercase tracking-wide text-[#5E8C1F] md:text-xl">
        {day}
      </div>

      <div className="w-full">
        {times.map((timeInfo, index) => (
          <div
            className="mb-3 flex w-full flex-row gap-3 md:mb-4 md:gap-4"
            key={`${day}-${index}`}
          >
            {/* px below md: the root font-size is vw-tied and bottoms out at
                13px on a phone, where rem sizes came out at 8px */}
            <div className="w-[38%] shrink-0 text-[14px] font-bold leading-tight text-[#15170F] md:text-base">
              {timeInfo.time}
            </div>
            <div className="flex flex-col">
              <span className="text-[14px] font-bold leading-tight text-[#15170F] md:text-base">
                {timeInfo.event}
              </span>
              {timeInfo.location ? (
                <span className="text-[13px] font-normal leading-tight text-[#15170F] md:text-base">
                  {timeInfo.location}
                </span>
              ) : null}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

const schedule = {
  Saturday: {
    day: 'Saturday',
    times: [
      { time: '10:00 AM', event: 'Check-In Starts', location: 'Center Lobby' },
      { time: '11:00 AM', event: 'Opening Ceremony', location: 'Hacking Area' },
      { time: '12:00 PM', event: 'Hacking Starts', location: 'Hacking Area' },
      { time: '1:00 PM', event: 'Lunch', location: 'In Front of MPR' },
      { time: '2:00 PM', event: 'Workshop #1', location: 'Room TBA' },
      { time: '2:30 PM', event: 'Workshop #2', location: 'Room TBA' },
      { time: '3:00 PM', event: 'Workshop #3', location: 'Room TBA' },
      { time: '7:00 PM', event: 'Dinner', location: 'In Front of MPR' },
    ],
  },
  Sunday: {
    day: 'Sunday',
    times: [
      {
        time: '12:00 AM',
        event: 'Midnight Surprise',
        location: 'Hacking Area',
      },
      { time: '8:00 AM', event: 'Breakfast', location: 'In front of MPR' },
      { time: '12:00 PM', event: 'Submissions Due', location: 'Hacking Area' },
      { time: '12:30 PM', event: 'Lunch', location: 'In Front of MPR' },
      { time: '1:00 PM', event: 'Judging Begins', location: 'Hacking Area' },
      { time: '3:00 PM', event: 'Judging Ends', location: '' },
      { time: '3:30 PM', event: 'Closing Ceremony', location: 'Hacking Area' },
    ],
  },
};

export default function Schedule() {
  const [mapOpen, setMapOpen] = useState(false);
  return (
    <div className="relative z-10 mx-auto mb-20 flex w-full max-w-7xl justify-center px-4 md:px-0">
      <div className="flex h-fit w-full max-w-7xl flex-col items-center ">
        {/* below md the days stack and the card supplies its own surface -
            the % insets only exist to sit inside the vine frame */}
        <div className="f2026-schedule-card text-text relative flex w-full flex-col items-stretch gap-6 px-6 py-8 md:flex-row md:items-start md:gap-2 md:px-0 md:py-0 md:pb-[14%] md:pl-[15%] md:pr-[14%] md:pt-[19%]">
          {/* The frame PNG has ~200px of transparent margin on every side, so
              it is scaled and offset to land its painted box on the card edges.
              border-image can't do it: the frame is hand-drawn and skewed. */}
          {/* cream interior, bounded to the frame's measured inner rectangle
              so it can never spill outside the vines */}
          <div
            className="pointer-events-none absolute hidden md:block"
            style={{
              top: '14.2%',
              bottom: '11.4%',
              left: '10.5%',
              right: '9.3%',
              backgroundColor: 'rgba(247,243,215,0.95)',
            }}
          />
          <img
            src="/landing/F2026/schedule-frame.png"
            alt=""
            aria-hidden="true"
            className="pointer-events-none absolute z-[1] hidden select-none md:block"
            style={{
              width: '144.9%',
              height: '150.3%',
              left: '-20.4%',
              top: '-22.8%',
              maxWidth: 'none',
            }}
          />
          <ScheduleOfTheDay dayInfo={schedule['Saturday']} />
          <div className="flex w-full flex-col items-center">
            <ScheduleOfTheDay dayInfo={schedule['Sunday']} />
            <button
              onClick={() => {
                setMapOpen(true);
              }}
              className="hidden items-center
              justify-center rounded-lg border-x-4 border-y-2
              border-solid border-orange-500 bg-transparent text-xl
              text-orange-500 transition-all duration-100 hover:drop-shadow-[0_0_8px_orange]
                           "
            >
              <strong>Show Event Map</strong>
            </button>
          </div>
        </div>
      </div>

      {/* <Image
          src={"/landing/S2025/foodplaceholder.png"}
          width="300"
          height="300"
          className="w-[300px] lg:w-[400px] absolute right-0 -bottom-[200px] lg:-bottom-[300px] z-30"
          alt={'cool'}
          quality={50}
        /> */}

      <Transition appear show={mapOpen} as={Fragment}>
        <Dialog
          as="div"
          className="relative z-10"
          onClose={() => setMapOpen(false)}
        >
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black/25" />
          </Transition.Child>

          <div className="fixed inset-0 overflow-y-auto">
            <div className="flex min-h-full min-w-full items-center justify-center p-4 text-center">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Dialog.Panel className="h-[80vh] w-[90vw] transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all md:w-[60vw]">
                  <button onClick={() => setMapOpen(false)}>
                    <Image
                      src="/map.png"
                      alt="bottom image"
                      layout="fill"
                      objectFit="contain"
                    ></Image>

                    <Image
                      src="/map.png"
                      alt="bottom image"
                      layout="fill"
                      objectFit="contain"
                    ></Image>
                  </button>
                  <div className="mt-4"></div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </div>
  );
}
