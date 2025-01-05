'use client';
import Image from 'next/image';
import clsx from 'clsx';
import { useWindowSize } from '@/app/lib/useWindowSize';
import { longCang, brush } from '@/app/ui/fonts';

const animalQuality = 100;

function AboutInfo({
  children,
  title,
  imageSrc,
  alt,
  reverse,
  titleColor = '#C3557D',
}: {
  children: React.ReactNode;
  title: string;
  imageSrc: string;
  alt: string;
  reverse?: boolean;
  titleColor: string;
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
        <h1
          className={clsx('text-3xl md:text-5xl', brush.className)}
          style={{ color: titleColor }}
        >
          {title}

        </h1>
        <div className={clsx('text-2xl', brush.className)}>
          {children}
        </div>

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
          className="w-[600px] lg:w-[700px]"
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
      <div className='flex  justify-center items-center p-4'>
        <Image
          src={"/landing/S2025/aboutbanner.png"}
          width="300"
          height="300"
          className="w-[400px]  z-30"
          alt={'about'}
          quality={50}
        />
      </div>

      <div
        className="from-dark_blue_figma relative flex  h-fit w-full
        flex-col flex-wrap
         pb-20 text-base
        md:flex-row md:px-4 md:text-lg xl:text-xl 2xl:text-2xl"

        id="About"
      >
        <Image
          src={"/landing/S2025/minichef 5.png"}
          width="600"
          height="600"
          className="absolute -top-36 right-14 w-[140px] invisible md:visible"
          alt={'chef decoration'}
          quality={50}
        />
        <AboutInfo title="WHAT" imageSrc="/landing/S2025/lumpia.png" alt="Python" reverse titleColor='s2025black'>
          <div className="pt-6 border-t-8 border-cyan-100">
            <p className="inline">HackRU is a</p>
            <p className="inline "> 24-hour hackathon </p>
            <p className="inline">at Rutgers University. We welcome</p>
            <p className="inline"> hundreds of students </p>
            <p className="inline">to join us in building</p>
            <p className="inline"> awesome tech projects.</p>
            <p className="inline"> Industry experts</p>
            <p className="inline"> and</p>
            <p className="inline"> mentors</p>
            <p className="inline"> help foster an atmosphere of</p>
            <p className="inline"> learning</p>
            <p className="inline"> through</p>
            <p className="inline "> tech-talks</p>
            <p className="inline"> and</p>
            <p className="inline ">
              {' '}
              one-on-one guidance.
            </p>
            <p className='inline '> We encourage</p>
            <p className="inline "> all students,</p>
            <p className="inline">
              {' '}
              no matter their experience level or educational background, to
            </p>
            <p className="inline "> challenge themselves</p>
            <p className="inline">
              {' '}
              and expand their creative, technical, and collaboration skills
            </p>
            <p className="inline"> at HackRU.</p>
          </div>
        </AboutInfo>

        <AboutInfo
          title="TRACKS"
          imageSrc="/landing/S2025/sushiAsset 1.png"
          alt="Python"
          titleColor="s2025black"
        >
          <div className="pt-6 border-t-8 border-cyan-100">
            <p className="inline ">Social Good:</p>
            <p className="inline pb-4 pt-4">
              {' '}
              Hacks that better the community
            </p>

            <div className="pt-6">
              <p className="inline ">NeuroTech presented by NTICe:</p>
              <p className="inline pb-4">
                {' '}
                Hacks that advance technology for treating brain dysfunction.
              </p>
            </div>

            <div className="pt-6">
              <p className="inline   ">Education:</p>
              <p className="inline pb-4">
                {' '}
                Hacks that focus on building an educated community.
              </p>
            </div>

            <div className="pt-6">
              <p className="inline   ">Maverick:</p>
              <p className="inline pb-4"> Any other hack! The opportunities are limitless.</p>
            </div>

            <div className="pt-6">
              <p className="inline">And more</p>
              <p className="inline  "> sponsor prizes!</p>
            </div>
          </div>
        </AboutInfo>

        <AboutInfo
          title="JOIN US"
          imageSrc="/landing/S2025/ratatoullie.png"
          alt="Python"
          reverse
          titleColor="s2025black"

        >
          <div className="pb-6 pt-6 border-t-8 border-cyan-100">
            <p className="inline  ">Apply</p>
            <p className="inline"> to attend our </p>
            <p className="inline   ">Spring 2025 HackRU!</p>
            <p className="inline"> The event will be on</p>
            <p className="inline   "> February 1 - 2</p>
            <p className="inline"> at the</p>
            <p className="inline   "> Busch Student Center.</p>
          </div>

          <div className="pb-6">
            <p className="inline">Want to help? Sign up to</p>
            <p className="inline   "> volunteer</p>
            <p className="inline"> and/or</p>
            <p className="inline  "> mentor!</p>
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
              className="inline  underline"
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
