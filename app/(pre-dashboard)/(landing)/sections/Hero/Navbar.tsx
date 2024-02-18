'use client';

import React from 'react';
import { MdOutlineMenu } from 'react-icons/md';
import { Fragment } from 'react';
// import { scrollToSectionName } from "./utilities";
import { usePathname, useRouter } from 'next/navigation';
import { Menu, Transition } from '@headlessui/react';
import Image from 'next/image';
import Link from 'next/link';

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
          className={`${active ? 'bg-f23-lightGreen text-white' : 'text-gray-900'
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
          className={`${active ? 'bg-f23-lightGreen text-white' : 'text-gray-900'
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
  return (
    <div className="bg-f23-mediumGreen absolute right-32 xs:right-36 top-4 z-40 rounded-md text-right md:hidden ">
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
  const isHomePage = pathname === '/';
  const sections = ['Home', 'About', 'Schedule', 'FAQ'];

  return (
    <div className="z-40 flex w-full justify-end md:fixed">
      <Image
        width={0}
        height={0}
        sizes={'100vw'}
        src="/landing/yellow_hackru.png"
        alt="yellow hackru logo"
        className="absolute left-4 top-0 z-50 w-24"
      />

      <a
        href="https://mlh.io/na?utm_source=na-hackathon&utm_medium=TrustBadge&utm_campaign=2024-season&utm_content=white"
        target="_blank"
        rel="noopener noreferrer"
      >
        <Image
          width={0}
          height={0}
          className="absolute right-9 top-0 z-50 w-24"
          src="https://s3.amazonaws.com/logged-assets/trust-badge/2024/mlh-trust-badge-2024-yellow.svg"
          alt="Major League Hacking 2024 Hackathon Season"
        />
      </a>

      <CollapsedMenu />
      <div
        className="text-text from-f23-lightGreen absolute top-0 z-40 hidden
                w-[100%] justify-end bg-gradient-to-b pr-20 pt-8 text-lg font-light md:flex"
      >
        {isHomePage && (
          <>
            {sections.map((section) => {
              return (
                <button
                  className="glow-center mr-5 font-medium uppercase"
                  onClick={() => scrollToSectionName(section)}
                  key={section}
                >
                  {section}
                </button>
              );
            })}
            <Link href="/contact">
              <button className="glow-center mr-5 font-medium uppercase">
                Contact
              </button>
            </Link>
          </>
        )}

        {!isHomePage && (
          <Link href="/">
            <button className="glow-center mr-5 font-medium uppercase">
              Home
            </button>
          </Link>
        )}
      </div>
    </div>
  );
}

export default Navbar;
