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
      className={'flex w-full flex-col items-center  sections'}
    >
      {/* <SectionTitle title={props.title} /> */}
      {props.title == "Sponsors" ?       
      <div className='flex  justify-center items-center p-4'>
        <Image
          src={"/landing/S2025/sponsorsflag.png"}
          width="300"
          height="300"
          className="w-[400px]  z-30"
          alt={'about'}
          quality={50}
        />
      </div>
      :
      <div>
        {props.title == "Schedule" ?       
          <div className='flex  justify-center items-center p-4'>
            <Image
              src={"/landing/S2025/schedulebanner.png"}
              width="300"
              height="300"
              className="w-[400px]  z-30"
              alt={'about'}
              quality={50}
            />
          </div>
          :
          <div className='flex  justify-center items-center p-4'>
            <Image
              src={"/landing/S2025/faqflag.png"}
              width="300"
              height="300"
              className="w-[400px]  z-30"
              alt={'about'}
              quality={50}
            />
          </div>
        }
      </div>
      }

      <div className="w-full h-fit sections relative">
        <div className="absolute  top-0 w-full h-full " />
        {props.children}
      </div>
      <div className={`h-[15vh] w-full ${bgColorNew}`}></div>
    </div>
  );
}
