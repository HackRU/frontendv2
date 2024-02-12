import { getSchedule } from '@/app/lib/data';
import SectionTitle from './SectionTitle';


function ScheduleOfTheDay(props: { dayInfo: DayInfo }) {
  const { dayInfo } = props;
  const { day, times } = dayInfo;
  return (
    <div className="my-5 flex w-full flex-col">
      <div className="glow-subtitles text-textSubtitle mb-4 w-full text-center text-5xl font-semibold md:text-7xl">
        {dayInfo.day}
      </div>
      <div className="w-full">
        {times.map((timeInfo, index) => (
          <div
            className="my-2 flex w-full flex-row pr-4 text-xl md:my-5 md:px-3"
            key={`${day}-${index}`}
          >
            <div className="h-fit w-2/5 pr-2 text-right font-black">
              {timeInfo.time}
            </div>
            <div className="w-3/5">{timeInfo.event}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default async function Schedule() {
  const schedule = await getSchedule();

  return (
    <div
      className="relative mb-20 flex w-full justify-center px-4 z-10"
      id="Schedule"
    >
      <div className="flex h-fit w-full max-w-7xl flex-col items-center">
        <div
          className="transparent-black-background text-text relative flex
                              w-full flex-col items-center rounded-3xl md:flex-row md:items-start"
        >
          <ScheduleOfTheDay dayInfo={schedule['Saturday']} />
          <div className="bg-text h-2 w-20 rounded-sm md:invisible md:absolute" />
          <ScheduleOfTheDay dayInfo={schedule['Sunday']} />
        </div>
      </div>
    </div>
  );
}