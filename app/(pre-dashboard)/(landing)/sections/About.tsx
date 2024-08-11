'use client';
import Image from 'next/image';
import clsx from 'clsx';
import { useWindowSize } from '@/app/lib/useWindowSize';
import GenericSection from './GenericSection';
import SectionTitle from './SectionTitle';

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
          'z-10 h-fit w-full p-5 md:w-1/2 md:grow md:justify-end md:p-20',
          {
            'text-end': reverse,
          },
        )}
      >
        <h1 className="drop-shadow-glow text-3xl font-extrabold md:text-5xl">
          {title}
        </h1>
        {children}
      </div>
    );
  }

  function AboutImage() {
    return (
      <div
        className={clsx('z-10 flex h-fit w-full justify-center md:w-1/2', {
          'md:justify-start': !reverse,
          'md:justify-end': reverse,
        })}
      >
        <Image
          src={imageSrc}
          width="400"
          height="400"
          className="w-[400px] lg:w-[600px]"
          alt={alt}
          quality={animalQuality}
        />
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

  if (
    size.width &&
    size.width < TAILWIND_MD_SIZE_DEFINE____REPLACE___LATER____
  ) {
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
    <>
      <div
        className="from-dark_blue_figma relative flex  h-fit w-full
        flex-col flex-wrap bg-gradient-to-b
        from-5% to-[#213537] pb-20 text-base
        md:flex-row md:px-4 md:text-lg xl:text-xl 2xl:text-2xl "
        id="About"
      >
        <AboutInfo title="WHAT" imageSrc="/landing/catPawn.png" alt="Python" reverse>
          <div className="pt-6">
            <p className="inline">HackRU is a</p>
            <p className="inline font-bold"> 24-hour hackathon </p>
            <p className="inline">at Rutgers University. We welcome</p>
            <p className="inline font-bold"> hundreds of students </p>
            <p className="inline">to join us in building</p>
            <p className="inline font-bold"> awesome tech projects.</p>
            <p className="inline font-bold"> Industry experts</p>
            <p className="inline"> and</p>
            <p className="inline font-bold"> mentors</p>
            <p className="inline"> help foster an atmosphere of</p>
            <p className="inline font-bold"> learning</p>
            <p className="inline"> through</p>
            <p className="inline font-bold"> tech-talks</p>
            <p className="inline"> and</p>
            <p className="inline font-bold">
              {' '}
              one-on-one guidance. We encourage
            </p>
            <p className="inline font-bold"> all students,</p>
            <p className="inline">
              {' '}
              no matter their experience level or educational background, to
            </p>
            <p className="inline font-bold"> challenge themselves</p>
            <p className="inline">
              {' '}
              and expand their creative, technical, and collaboration skills
            </p>
            <p className="inline font-bold"> at HackRU.</p>
          </div>
        </AboutInfo>

        <AboutInfo
          title="TRACKS"
          imageSrc="/landing/catQueenKing.png"
          alt="Python"
          
        >
          <div className="pt-6">
            <p className="inline font-bold">Social Good:</p>
            <p className="inline pb-4 pt-4">
              {' '}
              Hacks that betters the community.
            </p>

            <div className="pt-6">
              <p className="inline font-bold">Health:</p>
              <p className="inline pb-4">
                {' '}
                Hacks that improving the mind or body, aiding with health,
                wellness, and fitness.
              </p>
            </div>

            <div className="pt-6">
              <p className="inline font-bold">Education:</p>
              <p className="inline pb-4">
                {' '}
                Hacks that improving the mind or body, aiding with health,
                wellness, and fitness.
              </p>
            </div>

            <div className="pt-6">
              <p className="inline font-bold">Maverick:</p>
              <p className="inline pb-4"> Any other hack! The</p>
              <p>opportunities are limitless.</p>
            </div>

            <div className="pt-6">
              <p className="inline">And more</p>
              <p className="inline font-bold"> sponsor prizes!</p>
            </div>
          </div>
        </AboutInfo>

        <AboutInfo
          title="JOIN US"
          imageSrc="/landing/catKnight.png"
          alt="Python"
          reverse
        >
          <div className="pb-6 pt-6">
            <p className="inline font-bold">Apply</p>
            <p className="inline"> to attend our </p>
            <p className="inline font-bold">Fall 2024 HackRU!</p>
            <p className="inline"> The event will be on</p>
            <p className="inline font-bold"> October 26th-27th</p>
            <p className="inline"> at the</p>
            <p className="inline font-bold"> Busch Student Center.</p>
          </div>

          <div className="pb-6">
            <p className="inline">Want to help? Sign up to</p>
            <p className="inline font-bold"> volunteer</p>
            <p className="inline"> and/or</p>
            <p className="inline font-bold"> mentor!</p>
            <p className="inline">
              {' '}
              To know when organizer applications open subscribe to our
              newsletter!
            </p>
          </div>
          <div className="pb-6">
            <p className="inline">Want to receive updates? </p>
            <a
              href="https://hackru.us3.list-manage.com/subscribe?u=457c42db47ebf530a0fc733fb&id=fb01885829"
              className="inline font-bold underline"
              target="_blank"
            >
              Subscribe here!
            </a>
          </div>
        </AboutInfo>
      </div>
    </>
  );
}
