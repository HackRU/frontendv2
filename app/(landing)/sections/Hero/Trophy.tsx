export default function Trophy() {
  return (<Image
          src="/landing/fire.png"
          width="0"
          height="0"
          sizes="100vw"
          alt="Fire"
          // https://stackoverflow.com/questions/69230343/nextjs-image-component-with-fixed-witdth-and-auto-height
          className="h-auto w-[790px] pl-8 md:w-[550px] lg:w-[650px]"
          priority
        />)
}
