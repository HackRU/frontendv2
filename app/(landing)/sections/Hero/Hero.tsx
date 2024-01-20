import Image from 'next/image';
import Navbar from './Navbar';

export default function Hero() {
  return (
    <div
      className="bg-gray-100 w-full h-[100vh] max-h-[1300px]
      flex flex-col-reverse justify-center items-center"
    >
      <Navbar />
      <Image
        src="/landing/fire.png"
        width="0"
        height="0"
        sizes="100vw"
        alt="Fire"
        /* https://stackoverflow.com/questions/69230343/nextjs-image-component-with-fixed-witdth-and-auto-height */
        className="w-80 h-auto"
        priority
      />

      <div className="flex flex-col text-center grow justify-center text-3xl space-y-4">
        <div className="text-xl mb-2">WELCOME TO OUR</div>
        <div>SCHOOL OF</div>
        <div>CODECRAFT &</div>
        <div>WIZARDRY!</div>
      </div>

    </div>
  );
}