'use client';

import { Fragment, useEffect, useState } from 'react';
import { MdClose, MdOutlineMenu } from 'react-icons/md';
import { Menu, Transition } from '@headlessui/react';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { fredoka } from '@/app/ui/fonts';
import clsx from 'clsx';

const sections = ['Home', 'About', 'Schedule', 'FAQ'];

function scrollToSectionName(sectionName: string) {
  if (sectionName === 'Home') {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    return;
  }

  const section = document.getElementById(sectionName);
  if (section) {
    section.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }
}

function Navbar() {
  const pathname = usePathname();
  const router = useRouter();
  const isHomePage = pathname === '/';

  const [pastHero, setPastHero] = useState(false);

  useEffect(() => {
    const onScroll = () => setPastHero(window.scrollY > window.innerHeight * 0.9);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const handleSectionClick = (sectionName: string) => {
    if (!isHomePage) {
      router.push('/');
      return;
    }

    scrollToSectionName(sectionName);
  };

  return (
    <header className={clsx('fixed inset-x-0 top-0 z-50', fredoka.className)} id="navbar">
      <div
        aria-hidden="true"
        className={clsx(
          'pointer-events-none absolute inset-x-0 top-0 hidden h-28 transition-opacity duration-300 lg:block',
          pastHero ? 'opacity-100' : 'opacity-0',
        )}
        style={{
          backgroundImage:
            'linear-gradient(to bottom, rgba(20,34,16,0.72) 0%, rgba(20,34,16,0.45) 55%, rgba(20,34,16,0) 100%)',
        }}
      />

      <div className="relative mx-auto flex w-full max-w-[1600px] items-center justify-between px-4 pt-4 sm:px-6 sm:pt-5 lg:px-8 lg:pt-6">
        <button
          type="button"
          onClick={() => router.push('/')}
          className="group relative z-50 w-20 transition-transform duration-200 hover:scale-105 sm:w-24 lg:w-28"
          aria-label="Go to home"
        >
          <Image
            priority
            width={200}
            height={200}
            src="/landing/F2026/hackru-logo-f26.png"
            alt="HackRU logo"
            className="drop-shadow-[0_6px_18px_rgba(0,0,0,0.35)]"
          />
        </button>

        <div className="hidden items-center lg:flex">
          {isHomePage && (
            <div className="relative flex items-center justify-end gap-7 rounded-full border border-white/15 bg-[#0f2d1e]/30 px-4 py-3 shadow-[0_12px_30px_rgba(0,0,0,0.22)] backdrop-blur-md md:gap-10 lg:gap-12">
              {sections.map((section) => (
                <button
                  key={section}
                  type="button"
                  onClick={() => handleSectionClick(section)}
                  className="glow-center whitespace-nowrap text-sm font-semibold tracking-wide text-white transition-all duration-200 hover:-translate-y-0.5 hover:text-f23-lightGreen md:text-base lg:text-lg"
                  style={{ textTransform: 'none' }}
                >
                  {section}
                </button>
              ))}
              <Link
                href="https://linktr.ee/thehackru"
                target="_blank"
                rel="noreferrer"
                className="glow-center whitespace-nowrap text-sm font-semibold tracking-wide text-white transition-all duration-200 hover:-translate-y-0.5 hover:text-f23-lightGreen md:text-base lg:text-lg"
              >
                Contact
              </Link>
            </div>
          )}
        </div>

        {isHomePage && (
          <div className="relative z-50 lg:hidden">
            <Menu as="div" className="relative inline-block text-left">
              <Menu.Button className="flex h-11 w-11 items-center justify-center rounded-full border border-white/20 bg-[#123d2d]/80 text-white shadow-[0_12px_24px_rgba(0,0,0,0.22)] backdrop-blur-md transition-all duration-200 hover:bg-[#184b39] focus:outline-none focus-visible:ring-2 focus-visible:ring-white/80 focus-visible:ring-offset-2 focus-visible:ring-offset-[#123d2d]">
                {({ open }) => (
                  <span className="flex items-center justify-center">
                    {open ? <MdClose size={24} /> : <MdOutlineMenu size={24} />}
                  </span>
                )}
              </Menu.Button>

              <Transition
                as={Fragment}
                enter="transition ease-out duration-200"
                enterFrom="opacity-0 -translate-y-2 scale-95"
                enterTo="opacity-100 translate-y-0 scale-100"
                leave="transition ease-in duration-150"
                leaveFrom="opacity-100 translate-y-0 scale-100"
                leaveTo="opacity-0 -translate-y-2 scale-95"
              >
                <Menu.Items className="absolute right-0 mt-3 w-[min(80vw,20rem)] origin-top-right overflow-hidden rounded-2xl border border-white/20 bg-[#123d2d]/95 p-2 shadow-[0_20px_50px_rgba(0,0,0,0.32)] ring-1 ring-black/10 backdrop-blur-xl focus:outline-none">
                  <div className="space-y-1">
                    {sections.map((section) => (
                      <Menu.Item key={section}>
                        {({ active }) => (
                          <button
                            type="button"
                            onClick={() => handleSectionClick(section)}
                            className={clsx(
                              'flex w-full items-center justify-between rounded-xl px-3 py-3 text-left text-base font-medium tracking-wide transition-colors duration-150',
                              active ? 'bg-white/10 text-white' : 'text-white/90',
                            )}
                          >
                            <span>{section}</span>
                          </button>
                        )}
                      </Menu.Item>
                    ))}

                    <Menu.Item>
                      {({ active }) => (
                        <Link
                          href="https://linktr.ee/thehackru"
                          target="_blank"
                          rel="noreferrer"
                          className={clsx(
                            'flex w-full items-center justify-between rounded-xl px-3 py-3 text-left text-base font-medium tracking-wide transition-colors duration-150',
                            active ? 'bg-white/10 text-white' : 'text-white/90',
                          )}
                        >
                          Contact
                        </Link>
                      )}
                    </Menu.Item>
                  </div>
                </Menu.Items>
              </Transition>
            </Menu>
          </div>
        )}
      </div>
    </header>
  );
}

export default Navbar;
