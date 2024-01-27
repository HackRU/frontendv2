export default function SectionTitle(props: { title: string }) {
  return (
    <div className="flex items-center w-full">
      <div className="w-[7.5vw]" />
      <div className="w-1/4 flex items-center">
        <div className="flex-1 h-[0px] border-4 border-dashed border-black" />
        <div className="w-[5px]" />
        <div className="w-[17px] h-[17px] rotate-45 bg-black" />
      </div>
      <div className="flex-grow text-black-500 text-8xl justify-content text-center">
        {props.title}
      </div>
      <div className="w-1/4 flex items-center">
        <div className="w-[17px] h-[17px] rotate-45 bg-black" />
        <div className="w-[5px]" />
        <div className="flex-1 h-[0px] border-4 border-dashed border-black" />
      </div>
      <div className="w-[7.5vw]" />
    </div>
  );
}
