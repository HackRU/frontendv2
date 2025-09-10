'use client';

import { Dialog, Transition } from '@headlessui/react';
import { useState, Fragment } from 'react';
import Image from 'next/image';

function ScheduleOfTheDay(props: { dayInfo: DayInfo }) {
  const { dayInfo } = props;
  const { day, times } = dayInfo;
  return (
    <div className="my-5 flex w-full flex-col text-white">
      <div className="glow-subtitles text-textSubtitle mb-4 w-full text-center text-xl font-semibold md:text-5xl">
        {dayInfo.day}
      </div>
      <div className="w-full">
        {times.map((timeInfo, index) => (
          <div
            className="mt-4 flex w-full flex-row pr-4 text-xl md:my-6 md:px-3"
            key={`${day}-${index}`}
          >
            <div className="text-white-100 h-fit w-1/3 pr-4 text-right font-black">
              {timeInfo.time}
            </div>
            <div className="flex w-2/3 flex-col pl-6 border-l border-gray-600">
              <div className="text-lg font-semibold">{timeInfo.event}</div>
              <div className="text-sm text-gray-300">{timeInfo.location}</div>
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
      {
        time: '9:00 AM',
        event: 'Check-in Starts',
        location: 'Center Lobby',
      },
      {
        time: '10:45 AM',
        event: 'Delayed Check-in',
        location: 'Center Lobby',
      },
      {
        time: '11:00 AM',
        event: 'Opening Ceremony',
        location: 'Hacking Area',
      },
      { time: '12:00 PM', event: 'Team Building', location: 'tbd' },
      { time: '12:00 PM', event: 'Hacking Starts', location: 'Hacking Area' },
      { time: '12:30 PM', event: 'Lunch', location: 'In Front of MPR' },
      {
        time: 'TBD',
        event: 'TBD',
        location: 'TBD',
      },
      { time: '8:00 PM', event: 'Dinner', location: 'In Front of MPR' },
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
      { time: '8:15 AM', event: 'Breakfast', location: 'In Front of MPR' },
      { time: '11:00 AM', event: 'Lunch', location: 'In Front of MPR' },
      {
        time: '10:00 AM',
        event: 'Devpost Submissions Due',
        location: 'Hacking Area',
      },
      {
        time: '12:00 PM',
        event: 'Submissions Due',
        location: 'Hacking Area',
      },
      { time: '12:30 PM', event: 'Judging Begins', location: 'Hacking Area' },
      { time: '2:30 PM', event: 'Judging Ends', location: 'Hacking Area' },
      {
        time: '3:00 PM',
        event: 'Closing Ceremony',
        location: 'Hacking Area',
      },
    ],
  },
};

export default function Schedule() {
  const [mapOpen, setMapOpen] = useState(false);
  return (
    <div
      className="relative z-10 mx-auto mb-20 flex w-full max-w-7xl justify-center"
      id="Schedule"
    >
      <div className="flex h-fit w-full max-w-7xl flex-col items-center ">
        <div
          className="text-text relative flex w-full flex-col items-center bg-gray-900/80 backdrop-blur-sm
p-8 md:p-12 rounded-2xl shadow-2xl border border-gray-700/50 md:flex-row md:items-start "
        >
          <ScheduleOfTheDay dayInfo={schedule['Saturday']} />
          <div className="bg-text h-2 w-20 rounded-sm md:invisible md:absolute" />
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

      <Image
        src={'/landing/F2025/mini dragons/mini 5.png'}
        width="500"
        height="500"
        className="absolute -bottom-[100px] right-[10px] w-[250px] md:right-[50px] md:w-[400px] lg:-bottom-[150px]"
        alt={'cool'}
        quality={50}
      />

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
