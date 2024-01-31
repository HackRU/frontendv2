import Image from 'next/image';
import clsx from 'clsx';

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
  function AboutInfoContent() {
    return (
      <div
        className={clsx(
          'h-fit w-full bg-red-100 p-20 md:w-1/2 md:grow md:justify-end',
          {
            'text-end': reverse,
          },
        )}
      >
        <h1 className="bg-red-100 text-5xl font-extrabold">{title}</h1>
        {children}
      </div>
    );
  }

  function AboutImage() {
    return (
      <div
        className={clsx(
          'flex h-fit w-full justify-center bg-red-200 md:w-1/2',
          {
            'md:justify-start': !reverse,
            'md:justify-end': reverse,
          },
        )}
      >
        <Image src={imageSrc} width="400" height="400" alt={alt} priority />
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
      flex-col flex-wrap bg-gray-200 md:flex-row"
    >
      <AboutInfo title="WHAT" imageSrc="/landing/python.png" alt="Python">
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
        imageSrc="/landing/python.png"
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

      <AboutInfo title="JOIN US" imageSrc="/landing/python.png" alt="Python">
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
