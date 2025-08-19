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
      className={'sections flex w-full flex-col items-center relative'}
    >
      {/* Background decorative elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-20">
        {/* Add subtle background clouds for text sections */}
        <Image
          src="/landing/F2025/cloud1.png"
          alt=""
          width={150}
          height={90}
          className="absolute top-10 right-10 opacity-30"
        />
        <Image
          src="/landing/F2025/cloud2.png"
          alt=""
          width={120}
          height={72}
          className="absolute bottom-20 left-10 opacity-25"
        />
      </div>

      {/* <SectionTitle title={props.title} /> */}
      {props.title == 'Sponsors' ? (
        <div className="flex items-center justify-center p-4 relative">
          <Image
            src={'/landing/F2025/mini dragons/mini 1.png'}
            width="300"
            height="300"
            className="
              absolute left-[50px] z-30 
              w-[150px] 
              xs:w-[120px] xs:left-[30px]
              sm:w-[180px] sm:left-[80px]
              md:w-[250px] md:left-[120px]
              lg:w-[300px] lg:left-[200px]
            "
            alt={'sponsors dragon'}
            quality={50}
          />
          <p 
            className="absolute z-50 text-lg text-white 
            xs:text-sm sm:text-xl md:text-2xl lg:text-4xl
            md:pl-8 md:pt-2"
          >
            SPONSORS
          </p>
          <Image
            src={'/landing/F2025/header1.png'}
            width="300"
            height="300"
            className="absolute z-40 
              w-[250px]
              xs:w-[200px]
              sm:w-[300px]
              md:w-[350px]
              lg:w-[400px]
            "
            alt={'header background'}
            quality={50}
          />
        </div>
      ) : (
        <div>
          {props.title == 'Schedule' ? (
            <div className="flex items-center justify-center p-4 relative">
              <Image
                src={'/landing/F2025/mini dragons/mini 4.png'}
                width="300"
                height="300"
                className="z-30 
                  w-[250px]
                  xs:w-[200px]
                  sm:w-[280px]
                  md:w-[350px]
                  lg:w-[400px]
                "
                alt={'schedule dragon'}
                quality={50}
              />
              <p 
                className="absolute z-50 text-lg text-white 
                xs:text-sm sm:text-xl md:text-2xl lg:text-4xl
                md:pl-8 md:pt-2"
              >
                SCHEDULE
              </p>
              <Image
                src={'/landing/F2025/header1.png'}
                width="300"
                height="300"
                className="absolute z-40 
                  w-[250px]
                  xs:w-[200px]
                  sm:w-[300px]
                  md:w-[350px]
                  lg:w-[400px]
                "
                alt={'header background'}
                quality={50}
              />
            </div>
          ) : (
            <div>
              {props.title == 'FAQ' ? (
                <div className="flex items-center justify-center p-4 relative">
                  <p 
                    className="absolute z-50 text-lg text-white 
                    xs:text-sm sm:text-xl md:text-2xl lg:text-4xl
                    md:pl-8 md:pt-2"
                  >
                    FAQ
                  </p>
                  <Image
                    src={'/landing/F2025/header1.png'}
                    width="300"
                    height="300"
                    className="absolute z-40 
                      w-[250px]
                      xs:w-[200px]
                      sm:w-[300px]
                      md:w-[350px]
                      lg:w-[400px]
                    "
                    alt={'header background'}
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
        <div className="absolute top-0 h-full w-full" />
        {props.children}
      </div>
      <div className={`h-[15vh] w-full ${bgColorNew}`}></div>
    </div>
  );
}