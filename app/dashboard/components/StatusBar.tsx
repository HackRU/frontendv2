'use client';

type Status =
  | 'unregistered'
  | 'registered'
  | 'confirmation'
  | 'coming'
  | 'confirmed'
  | 'checked_in'
  | 'rejected'
  | 'not_coming'
  | 'waitlist';

const STAGES: Status[] = [
  'unregistered',
  'registered',
  'confirmation',
  'coming',
  'confirmed',
  'checked_in',
];
//basically just for confirmation being RSVP ->
const STAGE_LABELS: Record<Status, string> = {
  unregistered: 'Unregistered',
  registered: 'Registered',
  confirmation: 'RSVP',
  coming: 'Coming',
  confirmed: 'Confirmed',
  checked_in: 'Checked In',
  rejected: 'Rejected',
  not_coming: 'Not Coming',
  waitlist: 'Waitlist',
};

export default function StatusBar({ status }: { status: Status }) {
  const currentIndex = STAGES.indexOf(status);

  const isErrorStatus = ['rejected', 'not_coming'].includes(status);
  const isWaitlist = status === 'waitlist';

  if (isErrorStatus) {
    return (
      <div className="mt-4 p-4 border border-red-500 bg-red-100 rounded-md text-center">
        <div className="flex justify-center items-center space-x-2">
          <div className="h-5 w-5 rounded-full bg-red-500 flex items-center justify-center text-white font-bold">
            ✖
          </div>
          <p className="text-red-700 font-semibold text-lg capitalize">
            {STAGE_LABELS[status as Status]}
          </p>
        </div>
        <p className="text-sm mt-2">You will not be attending HackRU. Contact us for questions.</p>
      </div>
    );
  }

  return (
    <div className="flex items-center justify-between w-full max-w-4xl mx-auto mt-6 px-4">
      {STAGES.map((stage, index) => {
        const isCompleted = index <= currentIndex;
        const isCurrent = index === currentIndex;
        const isFuture = index > currentIndex;
        const isWaitlistMarker = isWaitlist && stage === 'confirmed';

        return (
          <div key={stage} className="flex flex-col items-center relative w-full">
            {/* Connector Line */}
            {/* Left Line */}
                {index !== 0 && (
                <div
                  className={`absolute top-2 left-0 w-1/2 h-1 z-0 ${
                  index <= currentIndex
                      ? 'bg-white shadow-[0_0_8px_rgba(255,255,255,0.6)] animate-pulse'
                      : isWaitlist && stage === 'confirmed'
                      ? 'bg-yellow-300 border-dashed border-2 border-yellow-400'
                      : 'bg-blue-500/30'
                  }`}
                />
                )}

                {/* Right Line */}
                {index !== STAGES.length - 1 && (
                <div
                  className={`absolute top-2 left-1/2 w-1/2 h-1 z-0 ${
                  index < currentIndex
                      ? 'bg-white shadow-[0_0_8px_rgba(255,255,255,0.6)] animate-pulse'
                      : isWaitlist && STAGES[index + 1] === 'confirmed'
                      ? 'bg-yellow-300 border-dashed border-2 border-yellow-400'
                      : 'bg-blue-500/30'
                  }`}
                />
                )}


            {/* Status Dot */}
            <div
              className={`z-10 h-5 w-5 rounded-full border-2 transition-all duration-300 relative flex items-center justify-center
                ${
                  isCompleted
                    ? 'bg-white border-white shadow-[0_0_8px_rgba(255,255,255,0.8)]'
                    : isCurrent
                    ? 'bg-white border-blue-500 ring-2 ring-blue-400 animate-pulse'
                    : isWaitlistMarker
                    ? 'bg-yellow-300 border-yellow-500 animate-pulse'
                    : 'bg-transparent border-blue-300'
                }
              `}
            >
              {isWaitlistMarker && (
                <div className="absolute h-2 w-2 bg-yellow-500 rounded-full" />
              )}
            </div>

            {/* Label */}
            <div
              className={`text-xs mt-1 text-center capitalize ${
                isCompleted || isCurrent || isWaitlistMarker
                  ? 'text-white font-medium'
                  : 'text-white/60'
              }`}
            >
              {STAGE_LABELS[stage]}
            </div>
          </div>
        );
      })}
    </div>
  );
}
