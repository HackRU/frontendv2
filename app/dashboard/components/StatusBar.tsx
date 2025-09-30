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
      <div className="mt-4 rounded-md border border-red-500 bg-red-100 p-4 text-center">
        <div className="flex items-center justify-center space-x-2">
          <div className="flex h-5 w-5 items-center justify-center rounded-full bg-red-500 font-bold text-white">
            ✖
          </div>
          <p className="text-lg font-semibold capitalize text-red-700">
            {STAGE_LABELS[status as Status]}
          </p>
        </div>
        <p className="mt-2 text-sm">
          You will not be attending HackRU. Contact us for questions.
        </p>
      </div>
    );
  }

  return (
    <div className="mx-auto mt-6 flex w-full max-w-4xl items-center justify-between px-4">
      {STAGES.map((stage, index) => {
        const isCompleted = index <= currentIndex;
        const isCurrent = index === currentIndex;
        const isFuture = index > currentIndex;
        const isWaitlistMarker = isWaitlist && stage === 'confirmed';

        return (
          <div
            key={stage}
            className="relative flex w-full flex-col items-center"
          >
            {/* Connector Line */}
            {/* Left Line */}
            {index !== 0 && (
              <div
                className={`absolute left-0 top-2 z-0 h-1 w-1/2 ${
                  index <= currentIndex
                    ? 'animate-pulse bg-white shadow-[0_0_8px_rgba(255,255,255,0.6)]'
                    : isWaitlist && stage === 'confirmed'
                      ? 'border-2 border-dashed border-yellow-400 bg-yellow-300'
                      : 'bg-blue-500/30'
                }`}
              />
            )}

            {/* Right Line */}
            {index !== STAGES.length - 1 && (
              <div
                className={`absolute left-1/2 top-2 z-0 h-1 w-1/2 ${
                  index < currentIndex
                    ? 'animate-pulse bg-white shadow-[0_0_8px_rgba(255,255,255,0.6)]'
                    : isWaitlist && STAGES[index + 1] === 'confirmed'
                      ? 'border-2 border-dashed border-yellow-400 bg-yellow-300'
                      : 'bg-blue-500/30'
                }`}
              />
            )}

            {/* Status Dot */}
            <div
              className={`relative z-10 flex h-5 w-5 items-center justify-center rounded-full border-2 transition-all duration-300
                ${
                  isCompleted
                    ? 'border-white bg-white shadow-[0_0_8px_rgba(255,255,255,0.8)]'
                    : isCurrent
                      ? 'animate-pulse border-blue-500 bg-white ring-2 ring-blue-400'
                      : isWaitlistMarker
                        ? 'animate-pulse border-yellow-500 bg-yellow-300'
                        : 'border-blue-300 bg-transparent'
                }
              `}
            >
              {isWaitlistMarker && (
                <div className="absolute h-2 w-2 rounded-full bg-yellow-500" />
              )}
            </div>

            {/* Label */}
            <div
              className={`mt-1 text-center text-xs capitalize ${
                isCompleted || isCurrent || isWaitlistMarker
                  ? 'font-medium text-white'
                  : 'text-white/60'
              }`}
            >
              {isWaitlist && STAGE_LABELS[stage] == "Confirmed"  ? "Waitlist" : STAGE_LABELS[stage]}
            </div>
          </div>
        );
      })}
    </div>
  );
}
