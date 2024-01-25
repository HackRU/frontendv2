import Image from 'next/image';
import clsx from 'clsx';

function AboutInfo({ children, title, imageSrc, alt, reverse }:
  {
    children: React.ReactNode,
    title: string,
    imageSrc: string,
    alt: string,
    reverse?: boolean,
  }
) {

  function AboutInfoContent() {
    return (
      <div
        className={clsx(
          "bg-red-100 w-full md:w-1/2 md:grow md:justify-end h-fit p-20",
          {
            'text-end': reverse,
          }
        )}
      >
        <h1 className="font-extrabold bg-red-100 text-5xl">
          {title}
        </h1>
        {children}
      </div>
    );
  }

  function AboutImage() {
    return (
      <div
        className={clsx(
          "bg-red-200 w-full md:w-1/2 h-fit flex justify-center",
          {
            "md:justify-start": !reverse,
            "md:justify-end": reverse,
          }
        )}
      >
        <Image
          src={imageSrc}
          width="400"
          height="400"
          alt={alt}
          priority
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
    )
  }

  return (
    <>
      <AboutInfoContent />
      <AboutImage />
    </>
  )
}


export default function About() {
  return (
    <div
      className="bg-gray-200 w-full h-fit
      flex flex-col md:flex-row flex-wrap"
    >
      <AboutInfo title="WHAT" imageSrc='/landing/python.png' alt="Python">
        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed
          imperdiet, nibh nec dictum consectetur, lorem nisi
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed
          imperdiet, nibh nec dictum consectetur, lorem nisi
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed
          imperdiet, nibh nec dictum consectetur, lorem nisi
        </p>
      </AboutInfo>

      <AboutInfo title="TRACKS" imageSrc='/landing/python.png' alt="Python" reverse>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed
          imperdiet, nibh nec dictum consectetur, lorem nisi
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed
          imperdiet, nibh nec dictum consectetur, lorem nisi
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed
          imperdiet, nibh nec dictum consectetur, lorem nisi
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed
          imperdiet, nibh nec dictum consectetur, lorem nisi
        </p>
      </AboutInfo>

      <AboutInfo title="JOIN US" imageSrc='/landing/python.png' alt="Python">
        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed
          imperdiet, nibh nec dictum consectetur, lorem nisi
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed
          imperdiet, nibh nec dictum consectetur, lorem nisi
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed
          imperdiet, nibh nec dictum consectetur, lorem nisi
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed
          imperdiet, nibh nec dictum consectetur, lorem nisi
        </p>
      </AboutInfo>

    </div>
  );
}
