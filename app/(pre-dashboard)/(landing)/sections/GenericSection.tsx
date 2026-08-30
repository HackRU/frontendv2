import SectionTitle from './SectionTitle';
import { ReactNode } from 'react';
import Image from 'next/image';
import { fredoka } from '@/app/ui/fonts';

// F26 needs three different section headers, so the old nested ternaries
// became a lookup table. Adding a section is one entry now.
type HeaderStyle =
  | { kind: 'ribbon'; src: string; labelPb: string }
  | { kind: 'pill' }
  | { kind: 'default' };

// A title with no entry here falls through to <SectionTitle />.
// labelPb seats the label on the banner. It differs per label because the
// banner's top edge is an arch, so a wider word sits lower. ABOUT's is in
// About.tsx (11.1%) - change both together.
const HEADER_BY_TITLE: Record<string, HeaderStyle> = {
  Schedule: {
    kind: 'ribbon',
    src: '/landing/F2026/ribbon-blue.png',
    labelPb: '7.3%',
  },
  FAQ: {
    kind: 'ribbon',
    src: '/landing/F2026/ribbon-pink.png',
    labelPb: '13.0%',
  },
  Sponsors: { kind: 'pill' },
};

function SectionHeader({ title }: { title: string }) {
  const style = HEADER_BY_TITLE[title] ?? { kind: 'default' };

  if (style.kind === 'ribbon') {
    // The ribbon PNG is 28% transparent margin top and bottom, so the negative
    // margins cancel it and pull the panel below up against the banner.
    // pointer-events-none: the label box is the full square and would
    // otherwise swallow clicks on whatever it overlaps.
    return (
      <div className="pointer-events-none relative z-20 -mt-[68px] mb-[-56px] flex items-center justify-center p-4 md:-mt-[135px] md:mb-[-112px]">
        <Image
          src={style.src}
          width={700}
          height={700}
          // same size as the ABOUT ribbon
          className="w-[58vw] max-w-[240px] md:w-[480px] md:max-w-none"
          alt=""
          aria-hidden="true"
          quality={60}
        />
        {/* The banner sits at 44% of the box, not 50%, and 0.75% right of
            centre, so the label needs padding rather than plain centring.
            paddingBottom is inline because the JIT won't emit a built class. */}
        <p
          style={{ paddingBottom: style.labelPb }}
          className={`${fredoka.className} absolute inset-0 z-10 flex items-center justify-center pl-[16.4%] pr-[14.9%] text-[2rem] font-bold leading-none tracking-[-0.02em] text-[#FBE8E9] md:text-[4rem]`}
        >
          {title.toUpperCase()}
        </p>
      </div>
    );
  }

  if (style.kind === 'pill') {
    // half the pill overhangs the panel below, like the About cards
    return (
      <div className="pointer-events-none relative z-20 mb-[-22px] flex items-center justify-center p-4 md:mb-[-30px]">
        <span
          className={`${fredoka.className} inline-block rounded-full bg-[#C0392B] px-7 py-2 text-xl font-bold text-[#FBE8D7] shadow-[0_4px_0_#7B241C,0_8px_18px_rgba(0,0,0,0.35)] md:px-14 md:py-3 md:text-5xl`}
        >
          {title.toUpperCase()}
        </span>
      </div>
    );
  }

  return <SectionTitle title={title} />;
}

type GenericSectionProps = {
  children: ReactNode;
  title: string;
  /** Tailwind class for the spacer strip below the section. */
  color?: string;
};

export default function GenericSection(props: GenericSectionProps) {
  const spacerColor = props.color ?? 'yellow-100';

  // scroll-mt keeps the fixed navbar off the header we just scrolled to
  return (
    <div
      id={props.title}
      className="sections flex w-full scroll-mt-28 flex-col items-center"
    >
      <SectionHeader title={props.title} />

      <div className="sections relative h-fit w-full">{props.children}</div>

      {/* vw not vh - the whole layout scales to width, and a vh gap here grew
          with window height and left a canyon between every section */}
      <div className={`h-[6vw] w-full ${spacerColor}`} />
    </div>
  );
}
