import { getSchedule } from "@/app/lib/data";

function ScheduleOfTheDay(props: { dayInfo: DayInfo }) {
  const { dayInfo } = props;
  const { day, times } = dayInfo;
  return (
    <div className="flex flex-col w-full my-5">
      <div className="text-5xl md:text-7xl w-full text-center mb-4 font-semibold glow-subtitles text-textSubtitle">{dayInfo.day}</div>
      <div className="w-full">
        {times.map((timeInfo, index) => (
          <div className="flex flex-row w-full text-xl my-2 md:my-5 md:px-3 pr-4"
            key={`${day}-${index}`}
          >
            <div className="w-2/5 h-fit text-right pr-2 font-black">{timeInfo.time}</div>
            <div className="w-3/5">
              {timeInfo.event}
            </div>

          </div>
        ))}
      </div>
    </div>
  );

}

export default async function Schedule() {
  const schedule = await getSchedule();

  return (
    <div className="w-full flex justify-center px-4 mb-20 relative"
      id="Schedule">
      <div className="w-full max-w-7xl h-fit flex flex-col items-center">
        <div className="transparent-black-background w-full text-text rounded-3xl
                              flex flex-col items-center md:flex-row md:items-start relative">
          <ScheduleOfTheDay dayInfo={schedule["Saturday"]} />
          <div className="w-20 h-2 bg-text md:invisible md:absolute rounded-sm" />
          <ScheduleOfTheDay dayInfo={schedule["Sunday"]} />
        </div>
      </div>
    </div>
  );
}