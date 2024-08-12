'use client';

import React from 'react';
import { MdOutlineMenu } from 'react-icons/md';
import { Fragment } from 'react';
import { redirect, usePathname, useRouter } from 'next/navigation';
import { Menu, Transition } from '@headlessui/react';
import Image from 'next/image';
import Link from 'next/link';
import { bizUdg } from '@/app/ui/fonts';
import { longCang } from '@/app/ui/fonts';
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
        'bg-f23-mediumGreen absolute right-28 top-4 z-40 rounded-md text-right md:hidden',
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
  const sections = ['Home', 'About', 'Schedule', 'FAQ'];

  return (
    <div
      className={`z-40 flex w-full justify-end md:fixed ${longCang.className}`}
      id="navbar"
    >
      <div
        style={{ left: '5%', top: '24px' }}
        className="absolute z-50 w-16 sm:w-20 md:w-24"
        onClick={() => router.push('/')}
      >
        <Image
          width={84}
          height={84}
          src="/landing/hrulogo_nav.png"
          alt="neon hackru logo"
          layout="responsive"
        />
      </div>
      <a
        href="https://mlh.io/na?utm_source=na-hackathon&utm_medium=TrustBadge&utm_campaign=2025-season&utm_content=yellow"
        target="_blank"
        rel="noopener noreferrer"
        className="absolute right-2 top-0 z-50 w-16 sm:w-20 md:w-24"
      >
        <Image
          width={100}
          height={100}
          src="https://s3.amazonaws.com/logged-assets/trust-badge/2025/mlh-trust-badge-2025-yellow.svg"
          alt="Major League Hacking 2024 Hackathon Season"
          layout="responsive"
        />
      </a>
      <CollapsedMenu />
      <div
        className="text-mediumBlue absolute top-0 z-40 hidden w-full
        justify-end bg-gradient-to-b pr-4 pt-8 text-lg font-light sm:pr-8 sm:text-xl md:flex md:pr-16 md:text-2xl lg:pr-32"
      >
        {isHomePage && (
          <>
            {sections.map((section) => (
              <button
                style={{
                  color: '#536F91',
                  textTransform: 'lowercase',
                  fontSize: '32px',
                  marginRight: '3rem',
                }}
                className="glow-center mr-4 font-medium uppercase transition-shadow hover:drop-shadow-blueGlow sm:mr-3 md:mr-5"
                onClick={() => scrollToSectionName(section)}
                key={section}
              >
                {section}
              </button>
            ))}
            {
              <Link href="/contact">
                <button
                  style={{
                    color: '#536F91',
                    textTransform: 'lowercase',
                    fontSize: '32px',
                    marginRight: '3rem',
                  }}
                  className="glow-center mr-4 font-medium uppercase transition-shadow hover:drop-shadow-blueGlow sm:mr-3 md:mr-5"
                >
                  Contact
                </button>
              </Link>
            }
          </>
        )}
      </div>
    </div>
  );
}

export default Navbar;
