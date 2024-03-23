'use client';

import { Dialog, Transition } from '@headlessui/react';
import { useState, Fragment } from 'react';
import Image from 'next/image';

function ScheduleOfTheDay(props: { dayInfo: DayInfo }) {
  const { dayInfo } = props;
  const { day, times } = dayInfo;
  return (
    <div className="my-5 flex w-full flex-col">
      <div className="glow-subtitles text-textSubtitle mb-4 w-full text-center text-5xl font-semibold md:text-7xl">
        {dayInfo.day}
      </div>
      <div className="w-full">
        {times.map((timeInfo, index) => (
          <div
            className="my-2 flex w-full flex-row pr-4 text-xl md:my-5 md:px-3"
            key={`${day}-${index}`}
          >
            <div className="h-fit w-2/5 pr-2 text-right font-black">
              {timeInfo.time}
            </div>
            <div className="flex w-3/5 flex-col">
              <div className="text-md w-3/5">{timeInfo.event}</div>
              <div className="w-3/5 text-sm">{timeInfo.location}</div>
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
        time: '10:00 AM',
        event: 'Check-in Starts',
        location: 'Center Lobby',
      },
      {
        time: '11:00 AM',
        event: 'Opening Ceremony',
        location: 'Hacking Area',
      },
      { time: '12:00 PM', event: 'Team Building', location: 'Hacking Area' },
      { time: '12:00 PM', event: 'Hacking Starts', location: 'Hacking Area' },
      { time: '1:00 PM', event: 'Lunch', location: 'In Front of MPR' },
      {
        time: '2:00 PM',
        event: 'Wakefern Tech Talk',
        location: 'Room 120',
      },
      { time: '2:30 PM', event: 'API Demo', location: 'Room 122' },
      { time: '3:00 PM', event: 'iCIMS Tech Talk', location: 'Room 120' },
      { time: '3:30 PM', event: 'RUSA Workshop', location: 'Room 122' },
      { time: '3:30 PM', event: 'USACS Resume Workshop', location: 'Room 120' },
      {
        time: '4:30 PM',
        event: 'Cloudflare Tech Talk',
        location: 'Room 122',
      },
      {
        time: '5:00 PM',
        event: 'MLH Intro to Github Copilot Workshop',
        location: 'Room 120',
      },
      {
        time: '6:30 PM',
        event: 'MLH Soroban Quest Mini Event',
        location: 'Room 120',
      },
      {
        time: '7:30 PM',
        event: 'ex-Meta SWE Tech Talk',
        location: 'Room 120',
      },
      { time: '7:30 PM', event: 'RUCP Workshop', location: 'Room 117' },
      { time: '8:30 PM', event: 'Dinner', location: 'In Front of MPR' },
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
      { time: '8:00 AM', event: 'Breakfast', location: 'In Front of MPR' },
      {
        time: '12:00 PM',
        event: 'Submissions Due',
        location: 'Hacking Area',
      },
      { time: '12:30 PM', event: 'Lunch', location: 'In Front of MPR' },
      { time: '1:00 PM', event: 'Judging Begins', location: 'Hacking Area' },
      { time: '3:00 PM', event: 'Judging Ends', location: 'Hacking Area' },
      {
        time: '3:30 PM',
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
      className="relative z-10 mb-20 flex w-full justify-center"
      id="Schedule"
    >
      <div className="w-0 lg:w-1/3">
        <Image
          src={'/landing/python.png'}
          quality={10}
          width="900"
          height="900"
          alt="Fire"
          className="absolute opacity-0 md:left-[-175px] md:top-[-100px]
                     md:w-[700px] lg:left-[-175px] lg:top-[-100px]
                     lg:w-[700px] lg:opacity-100 xl:left-[-200px]
                     xl:top-[-200px] xl:w-[900px]"
        />
      </div>
      <div className="flex h-fit w-full max-w-7xl flex-col items-center">
        <div
          className="transparent-black-background text-text relative flex
                              w-full flex-col items-center rounded-3xl md:flex-row md:items-start"
        >
          <ScheduleOfTheDay dayInfo={schedule['Saturday']} />
          <div className="bg-text h-2 w-20 rounded-sm md:invisible md:absolute" />
          <div className="flex w-full flex-col items-center">
            <ScheduleOfTheDay dayInfo={schedule['Sunday']} />
            <button
              onClick={() => {
                setMapOpen(true);
              }}
              className="hover:drop-shadow-blueGlow border-brown-200 to-brown-100 
                         text-md z-30 h-10 w-3/5
                         items-center justify-center rounded-3xl
                         border-x-4 border-y-2 border-solid
                         bg-black bg-gradient-to-t from-blue-300 text-blue-200
                         transition-all duration-100 
                         "
            >
              <strong>Show Event Map</strong>
            </button>
          </div>
          <div className="w-0 lg:w-1/3"></div>
          <div className="flex h-1/3 justify-center md:w-0 lg:h-0">
            <Image
              src={'/landing/python.png'}
              quality={10}
              width="900"
              height="900"
              alt="Fire"
              className="w-3/4 opacity-100 md:opacity-0"
            />
          </div>
        </div>
      </div>

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
