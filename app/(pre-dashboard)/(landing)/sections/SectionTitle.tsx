export default function SectionTitle(props: { title: string }) {
  return (
    <div className="flex w-full items-center transform -translate-y-1/2 z-40">
      <div className="w-[7.5vw]" />
      <div className="w-1/4 items-center hidden sm:flex">
        <div className="h-[0px] flex-1 border-4 border-dashed border-orange-100" />
        <div className="w-[5px]" />
        <div className="h-[17px] w-[17px] rotate-45 bg-orange-100" />
      </div>
      <div className="text-orange-100 justify-content flex-grow text-center text-5xl md:text-8xl">
        {props.title}
      </div>
      <div className="w-1/4 items-center hidden sm:flex">
        <div className="h-[17px] w-[17px] rotate-45 bg-orange-100" />
        <div className="w-[5px]" />
        <div className="h-[0px] flex-1 border-4 border-dashed border-orange-100" />
      </div>
      <div className="w-[7.5vw]" />
    </div>
  );
}
