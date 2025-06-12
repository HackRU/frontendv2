'use client';

import React from 'react';
import { MdOutlineMenu } from 'react-icons/md';
import { Fragment } from 'react';
import { redirect, usePathname, useRouter } from 'next/navigation';
import { Menu, Transition } from '@headlessui/react';
import Image from 'next/image';
import Link from 'next/link';
import { bizUdg } from '@/app/ui/fonts';
import { longCang, brush } from '@/app/ui/fonts';
import clsx from 'clsx';

function scrollToSectionName(sectionName: string) {
  const section = document.getElementById(sectionName);
  if (section) {
    section.scrollIntoView({ behavior: 'smooth' });
  }
}

function MenuItem(props: { sectionName: string }) {
  const { sectionName } = props;
  return (
    <Menu.Item>
      {({ active }) => (
        <button
          className={`${
            active ? 'bg-f23-lightGreen text-white' : 'text-gray-900'
          }
                    group flex w-full items-center rounded-md px-2 py-2 text-lg`}
          onClick={() => scrollToSectionName(sectionName)}
        >
          {sectionName}
        </button>
      )}
    </Menu.Item>
  );
}
function OtherPageMenuItem(props: { sectionName: string }) {
  const { sectionName } = props;
  const history = useRouter();
  return (
    <Menu.Item>
      {({ active }) => (
        <button
          className={`${
            active ? 'bg-f23-lightGreen text-white' : 'text-gray-900'
          }
                    group flex w-full items-center rounded-md px-2 py-2 text-lg`}
          onClick={() => {
            history.push('/contact');
          }}
        >
          {sectionName}
        </button>
      )}
    </Menu.Item>
  );
}

function CollapsedMenu() {
  const pathname = usePathname();
  return (
    <div
      className={clsx(
        'bg-f23-mediumGreen absolute right-28 top-4 z-40 rounded-md text-right lg:hidden',
        {
          hidden: pathname !== '/',
        },
      )}
    >
      <Menu as="div" className="relative inline-block text-left">
        <div>
          <Menu.Button className="inline-flex w-full justify-center rounded-md px-2 py-2 text-sm font-medium text-white hover:bg-black hover:bg-opacity-20 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75">
            <MdOutlineMenu color="white" size={40} />
          </Menu.Button>
        </div>
        <Transition
          as={Fragment}
          enter="transition ease-out duration-100"
          enterFrom="transform opacity-0 scale-95"
          enterTo="transform opacity-100 scale-100"
          leave="transition ease-in duration-75"
          leaveFrom="transform opacity-100 scale-100"
          leaveTo="transform opacity-0 scale-95"
        >
          <Menu.Items className="absolute right-0 mt-2 w-56 origin-top-right divide-y divide-gray-100 rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
            <div className="px-1 py-1">
              <MenuItem sectionName="Home" />
              <MenuItem sectionName="About" />
              <MenuItem sectionName="Schedule" />
              <MenuItem sectionName="FAQ" />
              <MenuItem sectionName="Team" />
              {/* <MenuItem sectionName="Sponsors" /> */}
              {<OtherPageMenuItem sectionName="Contact" />}
            </div>
          </Menu.Items>
        </Transition>
      </Menu>
    </div>
  );
}

/**
 * TODO: Make navbar sticky and then change the glow to the section that is currently present ??
 */

function Navbar() {
  const pathname = usePathname();
  const router = useRouter();
  const isHomePage = pathname === '/';
  const sections = ['About', 'Schedule', 'FAQ'];

  return (
    <div
      className={`z-40 flex w-full justify-end
        md:fixed ${brush.className}`}
      id="navbar"
    >
      <div
        style={{ left: '5%', top: '24px' }}
        className="hover:drop-shadow-inner absolute z-50 w-16 hover:scale-105 sm:w-16 md:w-24 lg:w-24"
        onClick={() => router.push('/')}
      >
        <Image
          width={100}
          height={100}
          src="/landing/S2025/hackru-generic-logo.png"
          alt="generic hackru logo"
        />
      </div>
      
      <a
        href="https://mlh.io/na?utm_source=na-hackathon&utm_medium=TrustBadge&utm_campaign=2026-season&utm_content=yellow"
        target="_blank"
        rel="noopener noreferrer"
        className="absolute right-2 top-0 z-50 w-12 sm:w-16 md:w-20 lg:w-24"
      >
        <Image
          width={100}
          height={100}
          src="https://s3.amazonaws.com/logged-assets/trust-badge/2026/mlh-trust-badge-2026-yellow.svg"
          alt="Major League Hacking 2026 Hackathon Season"
        />
      </a>
      <CollapsedMenu />
      <div
        className="absolute right-20 top-0 z-40 hidden w-full
        justify-end pr-2 pt-4 text-sm font-light text-dark_red-100 sm:pr-4 sm:pt-6 sm:text-base md:pr-6 md:pt-8 md:text-lg lg:flex lg:pr-8 lg:pt-10 lg:text-xl"
      >
        {isHomePage && (
          <div className="relative flex items-center justify-start">
            <Image
              src="/landing/S2025/navbar-header.png"
              alt="Navigation background"
              width={1200}
              height={150}
              className="absolute -top-10 right-0 -z-10 scale-110"
            />
            {sections.map((section) => (
              <button
                style={{
                  color: '#6D1E00',
                  textTransform: 'lowercase',
                }}
                className="glow-center ms-4 text-lg font-medium uppercase transition-shadow hover:drop-shadow-blueGlow sm:mr-3 sm:text-xl md:mr-4 md:text-2xl lg:mr-5 lg:text-3xl"
                onClick={() => scrollToSectionName(section)}
                key={section}
              >
                {section}
              </button>
            ))}
            <button
              style={{
                color: '#6D1E00',
                textTransform: 'lowercase',
              }}
              className="glow-center ms-4 text-lg font-medium uppercase transition-shadow hover:drop-shadow-blueGlow sm:mr-3 sm:text-xl md:mr-4 md:text-2xl lg:mr-5 lg:text-3xl"
              onClick={() => router.push('/leaderboard')}
            >
              Leaderboard
            </button>

            <Link href="https://linktr.ee/thehackru">
              <button
                style={{
                  color: '#6D1E00',
                  textTransform: 'lowercase',
                }}
                className="glow-center ms-4 text-lg font-medium uppercase transition-shadow hover:drop-shadow-blueGlow sm:mr-3 sm:text-xl md:mr-4 md:text-2xl lg:mr-5 lg:text-3xl"
              >
                Contact
              </button>
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}

export default Navbar;
