"use client";
import Image from 'next/image';
import clsx from 'clsx';
import { useWindowSize } from '@/app/lib/useWindowSize';

const animalQuality = 50;

function AboutInfo({
  children,
  title,
  imageSrc,
  alt,
  reverse,
}: {
  children: React.ReactNode;
  title: string;
  imageSrc: string;
  alt: string;
  reverse?: boolean;
}) {
  const size = useWindowSize();
  /* Defined in tailwind.config.ts file. Probably better to have some common area for constants. */
  const TAILWIND_MD_SIZE_DEFINE____REPLACE___LATER____ = 768;

  function AboutInfoContent() {
    return (
      <div
        className={clsx(
          'h-fit w-full p-20 md:w-1/2 md:grow md:justify-end z-10',
          {
            'text-end': reverse,
          },
        )}
      >
        <h1 className="text-5xl font-extrabold">{title}</h1>
        {children}
      </div>
    );
  }

  function AboutImage() {
    return (
      <div
        className={clsx(
          'flex h-fit w-full justify-center md:w-1/2',
          {
            'md:justify-start': !reverse,
            'md:justify-end': reverse,
          },
        )}
      >
        <Image src={imageSrc} width="600" height="600" alt={alt} quality={animalQuality} />
      </div>
    );
  }

  if (reverse) {
    return (
      <>
        <AboutImage />
        <AboutInfoContent />
      </>
    );
  }

  if (size.width && size.width < TAILWIND_MD_SIZE_DEFINE____REPLACE___LATER____) {
    return (
      <>
        <AboutImage />
        <AboutInfoContent />
      </>
    );
  }

  return (
    <>
      <AboutInfoContent />
      <AboutImage />
    </>
  );
}

export default function About() {
  return (
    <div
      className="flex h-fit w-full
      flex-col flex-wrap
      from-dark_blue_figma from-5% to-[#213537] bg-gradient-to-b
      md:flex-row"
    >
      <AboutInfo title="WHAT" imageSrc="/landing/roar.js.png" alt="Python">
        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed
          imperdiet, nibh nec dictum consectetur, lorem nisi Lorem ipsum dolor
          sit amet, consectetur adipiscing elit. Sed imperdiet, nibh nec dictum
          consectetur, lorem nisi Lorem ipsum dolor sit amet, consectetur
          adipiscing elit. Sed imperdiet, nibh nec dictum consectetur, lorem
          nisi
        </p>
      </AboutInfo>

      <AboutInfo
        title="TRACKS"
        imageSrc="/landing/bitsprout.png"
        alt="Python"
        reverse
      >
        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed
          imperdiet, nibh nec dictum consectetur, lorem nisi Lorem ipsum dolor
          sit amet, consectetur adipiscing elit. Sed imperdiet, nibh nec dictum
          consectetur, lorem nisi Lorem ipsum dolor sit amet, consectetur
          adipiscing elit. Sed imperdiet, nibh nec dictum consectetur, lorem
          nisi Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed
          imperdiet, nibh nec dictum consectetur, lorem nisi
        </p>
      </AboutInfo>

      <AboutInfo title="JOIN US" imageSrc="/landing/pseudoclaw.png" alt="Python">
        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed
          imperdiet, nibh nec dictum consectetur, lorem nisi Lorem ipsum dolor
          sit amet, consectetur adipiscing elit. Sed imperdiet, nibh nec dictum
          consectetur, lorem nisi Lorem ipsum dolor sit amet, consectetur
          adipiscing elit. Sed imperdiet, nibh nec dictum consectetur, lorem
          nisi Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed
          imperdiet, nibh nec dictum consectetur, lorem nisi
        </p>
      </AboutInfo>
    </div>
  );
}
