'use client';
import Image from 'next/image';
import clsx from 'clsx';
import { useWindowSize } from '@/app/lib/useWindowSize';
import GenericSection from './GenericSection';
import SectionTitle from './SectionTitle';
import { longCang, fuzzy } from '@/app/ui/fonts';

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
          className={clsx('text-3xl md:text-5xl', fuzzy.className)}
          style={{ color: titleColor }}
        >
          {title}

        </h1>
        <div className={clsx('text-2xl', fuzzy.className)}>
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
          className="w-[600px] lg:w-[800px]"
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
        flex-col flex-wrap 
         pb-20 text-base
        md:flex-row md:px-4 md:text-lg xl:text-xl 2xl:text-2xl bg-blue-500"

        id="About"
      >
        <div>


        </div>
        <AboutInfo title="WHAT" imageSrc="/landing/catPawn.png" alt="Python" reverse titleColor='#C3557D'>
          <div className="pt-6">
            <p className="inline">HackRU is a</p>
            <p className="inline text-blue-100"> 24-hour hackathon </p>
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
            <p className="inline text-blue-100"> tech-talks</p>
            <p className="inline"> and</p>
            <p className="inline text-blue-100">
              {' '}
              one-on-one guidance.
            </p>
            <p className='inline '> We encourage</p>
            <p className="inline text-blue-100"> all students,</p>
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
          imageSrc="/landing/catQueenKing.png"
          alt="Python"
          titleColor="#EC9655"
        >
          <div className="pt-6">
            <p className="inline  text-pink-100">Social Good:</p>
            <p className="inline pb-4 pt-4">
              {' '}
              Hacks that betters the community.
            </p>

            <div className="pt-6">
              <p className="inline  text-pink-100">Health:</p>
              <p className="inline pb-4">
                {' '}
                Hacks that improve the mind or body, aiding with health,
                wellness, and fitness.
              </p>
            </div>

            <div className="pt-6">
              <p className="inline   text-pink-100">Education:</p>
              <p className="inline pb-4">
                {' '}
                Hacks that focus on building an educated community.
              </p>
            </div>

            <div className="pt-6">
              <p className="inline   text-pink-100">Maverick:</p>
              <p className="inline pb-4"> Any other hack! The</p>
              <p>opportunities are limitless.</p>
            </div>

            <div className="pt-6">
              <p className="inline">And more</p>
              <p className="inline  text-blue-100"> sponsor prizes!</p>
            </div>
          </div>
        </AboutInfo>

        <AboutInfo
          title="JOIN US"
          imageSrc="/landing/catKnight.png"
          alt="Python"
          reverse
          titleColor="#1ED4FE"
        >
          <div className="pb-6 pt-6">
            <p className="inline  text-pink-100">Apply</p>
            <p className="inline"> to attend our </p>
            <p className="inline   text-pink-100">Fall 2024 HackRU!</p>
            <p className="inline"> The event will be on</p>
            <p className="inline   text-pink-100"> October 26th-27th</p>
            <p className="inline"> at the</p>
            <p className="inline   text-pink-100"> College Ave Student Center.</p>
          </div>

          <div className="pb-6">
            <p className="inline">Want to help? Sign up to</p>
            <p className="inline   text-pink-100"> volunteer</p>
            <p className="inline"> and/or</p>
            <p className="inline  text-pink-100"> mentor!</p>
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
              className="inline   text-pink-100 underline"
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
