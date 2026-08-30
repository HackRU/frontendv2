'use client';
import Image from 'next/image';
import Link from 'next/link';
import clsx from 'clsx';
import { useWindowSize } from '@/app/lib/useWindowSize';
import { fredoka } from '@/app/ui/fonts';

const animalQuality = 100;

const NEWSLETTER =
  'https://hackru.us3.list-manage.com/subscribe?u=457c42db47ebf530a0fc733fb&id=fb01885829';

// links are underlined so they read differently from plain bold emphasis
const LINK =
  'font-bold text-white underline decoration-2 underline-offset-2 hover:decoration-4';

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
  imageSrc?: string;
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
          'relative z-10 h-fit w-full px-4',
          imageSrc
            ? 'md:w-1/2 md:grow'
            : title === 'TRACKS'
              ? 'mx-auto w-[90%] md:w-[52vw] md:max-w-[47rem]'
              : 'mx-auto md:w-[60vw] md:max-w-[54rem]',
        )}
      >
        {/* in flow now, not an absolute backdrop, so it fits the copy and the
            pill can hang off its top edge */}
        <div
          className={clsx(
            'relative mb-10 mt-10 rounded-3xl border border-black/20 backdrop-blur-sm md:mb-14 md:mt-14',
            'px-8 pb-10 pt-14 md:px-12 md:pb-12 md:pt-16',
            'bg-[#2B3A3F]/70',
          )}
        >
          {/* -translate-y-1/2 keeps it on the edge at every breakpoint */}
          <span
            className={clsx(
              'absolute left-1/2 top-0 -translate-x-1/2 -translate-y-1/2',
              'whitespace-nowrap rounded-full bg-[#C0392B] px-7 py-2 md:px-14 md:py-3',
              'text-xl font-bold text-[#FBE8D7] shadow-[0_4px_0_#7B241C,0_8px_18px_rgba(0,0,0,0.35)] md:text-5xl',
              fredoka.className,
            )}
          >
            {title}
          </span>

          {/* was centred monospace at text-2xl, which is not reading type */}
          <div
            className={clsx(
              'text-left text-base leading-relaxed text-white/90 md:text-lg',
              fredoka.className,
            )}
          >
            {children}
          </div>
        </div>
      </div>
    );
  }

  function AboutImage() {
    // F2026: no decorative side art in the design, so this renders nothing.
    // Guard also protects next/image, which throws on an undefined src.
    if (!imageSrc) return null;
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
    <section id="About" className="scroll-mt-28">
      {/* the PNG is 28% transparent margin top and bottom - these margins
          cancel it so WHAT sits against the ribbon */}
      <div className="pointer-events-none relative -mt-[68px] mb-[-56px] flex items-center justify-center p-4 pt-16 md:-mt-16 md:mb-[-112px] md:pt-24">
        {/* label anchors to the image, not this wrapper - the wrapper's pt
            would put "centred" above the ribbon */}
        <div className="relative">
          <Image
            src={'/landing/F2026/ribbon-pink.png'}
            // 700: at 300 next/image served a source narrower than we render
            width="700"
            height="700"
            className="w-[58vw] max-w-[240px] md:w-[480px] md:max-w-none"
            alt={'about'}
            quality={50}
          />
          <p
            /* the banner sits at 44% of the box, not 50%, and slightly right
               of centre. pb differs per label because the top edge is an arch,
               so a wider word sits lower - the others are in GenericSection. */
            className={`${fredoka.className} absolute inset-0 z-10 flex items-center justify-center pb-[11.1%] pl-[16.4%] pr-[14.9%] text-[2rem] font-bold leading-none tracking-[-0.02em] text-[#FBE8E9] md:text-[4rem]`}
          >
            ABOUT
          </p>
        </div>
      </div>

      <div
        className="2xl:text-2xl relative flex  h-fit w-full
        flex-col flex-wrap
         from-dark_blue_figma pb-20
        text-base md:flex-row md:px-4 md:text-lg xl:text-xl"
      >
        <AboutInfo title="WHAT" alt="Python" reverse titleColor="s2025black">
          <div className="space-y-6 text-white/90">
            <p>
              HackRU is a 24-hour hackathon at Rutgers University. We welcome
              hundreds of students to join us in building awesome tech projects.
              Industry experts and mentors help foster an atmosphere of learning
              through tech-talks and one-on-one guidance.
            </p>
            <p>
              We encourage all students, no matter their experience level or
              educational background, to challenge themselves and expand their
              creative, technical, and collaboration skills at HackRU.
            </p>
          </div>
        </AboutInfo>

        <AboutInfo title="TRACKS" alt="Python" titleColor="s2025black">
          {/* rendered from a list - the old hand-built markup styled each
              label separately and they drifted apart. NeuroTech is a sponsor
              track and is not in the F2026 design. */}
          <ul className="flex flex-col gap-4">
            {[
              ['Social Good', 'Hacks that better the community.'],
              [
                'Health',
                'Hacks that improve the mind or body, aid with health, wellness, and fitness.',
              ],
              [
                'Education',
                'Hacks that focus on building an educated community.',
              ],
              ['Maverick', 'Any other hack! The opportunities are limitless.'],
            ].map(([label, description]) => (
              <li key={label}>
                <span className="font-bold text-white">{label}:</span>{' '}
                <span className="text-white/90">{description}</span>
              </li>
            ))}
          </ul>

          <p className="pt-4 text-white/90">
            And more{' '}
            <span className="font-bold text-white">sponsor prizes!</span>
          </p>
        </AboutInfo>

        <AboutInfo title="JOIN US" alt="Python" reverse titleColor="s2025black">
          {/* Only real links get the underline. Bold on its own is emphasis -
              styling both the same made three of these look clickable. */}
          <div className="space-y-6 text-white/90">
            <p>
              Register to attend our{' '}
              <Link href="/signup" className={LINK}>
                Fall 2026 HackRU!
              </Link>{' '}
              The hackathon will be held on October 10-11 at the Busch Student Center.
            </p>
            <p>
              Want to help?{' '}
              <span className="font-bold text-white">Sign up</span> to volunteer
              and/or mentor!
            </p>
            <p>
              To know when organizer applications open, subscribe to{' '}
              <a
                href={NEWSLETTER}
                className={LINK}
                target="_blank"
                rel="noreferrer"
              >
                our newsletter!
              </a>
            </p>
            <p>
              Want to receive updates?{' '}
              <a
                href={NEWSLETTER}
                className={LINK}
                target="_blank"
                rel="noreferrer"
              >
                Subscribe here!
              </a>
            </p>
          </div>
        </AboutInfo>
      </div>
    </section>
  );
}
