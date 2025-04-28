export default function SectionTitle(props: { title: string }) {
  return (
    <div className="z-40 flex w-full -translate-y-1/2 transform items-center">
      <div className="w-[7.5vw]" />
      <div className="justify-content flex-grow text-center text-5xl text-[#536F91] md:text-8xl">
        {props.title}
      </div>
      <div className="w-[7.5vw]" />
    </div>
  );
}
