import SectionTitle from './SectionTitle';
import { ReactNode } from 'react';
import Image from 'next/image';

type GenericSectionProps = {
  children: ReactNode;
  title: string;
  color?: string;
};

export default function GenericSection(props: GenericSectionProps) {
  const defaultColor = 'yellow-100';
  const bgColorNew = props.color ? `${props.color}` : defaultColor;

  return (
    <div
      id={props.title}
      className={'sections flex w-full flex-col  items-center'}
    >
      {/* <SectionTitle title={props.title} /> */}
      {props.title == 'Sponsors' ? (
        <div className="flex  items-center justify-center p-4">
          <Image
            src={'/landing/S2025/sponsorsflag.png'}
            width="300"
            height="300"
            className="z-30  w-[400px]"
            alt={'about'}
            quality={50}
          />
        </div>
      ) : (
        <div>
          {props.title == 'Schedule' ? (
            <div className="flex  items-center justify-center p-4">
              <Image
                src={'/landing/S2025/schedulebanner.png'}
                width="300"
                height="300"
                className="z-30  w-[400px]"
                alt={'about'}
                quality={50}
              />
            </div>
          ) : (
            <div> 
              {props.title == 'FAQ' ? (
                <div className="flex  items-center justify-center p-4">
                  <Image
                    src={'/landing/S2025/faqflag.png'}
                    width="300"
                    height="300"
                    className="z-30  w-[400px]"
                    alt={'about'}
                    quality={50}
                  />
                </div>
              ) : (
                <SectionTitle title={props.title} />
              )}
            </div>
          )}
        </div>
      )}

      <div className="sections relative h-fit w-full">
        <div className="absolute  top-0 h-full w-full " />
        {props.children}
      </div>
      <div className={`h-[15vh] w-full ${bgColorNew}`}></div>
    </div>
  );
}
