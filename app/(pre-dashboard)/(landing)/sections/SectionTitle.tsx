export default function SectionTitle(props: { title: string }) {
  return (
    <div className="flex w-full items-center transform -translate-y-1/2 z-40">
      <div className="w-[7.5vw]" />
      <div className="text-[#536F91] justify-content flex-grow text-center text-5xl md:text-8xl">
        {props.title}
      </div>
      <div className="w-[7.5vw]" />
    </div>
  );
}
