import Image from 'next/image';
import Navbar from './Navbar';

export default function Hero() {
  return (
    <>
      <Navbar />
      <div
        className="flex w-full
        flex-col items-center justify-center bg-gray-100
        md:flex md:flex-row-reverse md:h-[100vh]
        "
      >


        {/* <div className="w-full h-[75vh] bg-red-100" />
        <div className="w-full h-10 bg-red-500" /> */}

        <div className="w-full lg:w-2/5 h-[40vh] text-center pt-10 md:pt-0 relative">
          <div
            className="flex h-[40vh] w-full flex-col justify-center space-y-4 text-5xl
                       md:text-4xl md:space-y-7 md:absolute md:-left-20 md:min-w-fit
                       lg:text-5xl lg:-left-10 xl:text-6xl xl:space-y-8"
          >
            <div className="mb-2 text-xl md:mb-0 lg:text-3xl xl:text-4xl">WELCOME TO OUR</div>
            <div>SCHOOL OF</div>
            <div>CODECRAFT&nbsp;&</div>
            <div>CIRCUITRY!</div>
          </div>
        </div>

        <Image
          src="/landing/fire.png"
          width="0"
          height="0"
          sizes="100vw"
          alt="Fire"
          // https://stackoverflow.com/questions/69230343/nextjs-image-component-with-fixed-witdth-and-auto-height
          className="h-auto w-[790px] pl-8 md:w-[550px] lg:w-[650px]"
          priority
        />
      </div>
    </>
  );
}
