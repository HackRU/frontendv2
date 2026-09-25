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

  const isWaitlist = status === 'waitlist';
  const statusNotice = {
    coming: {
      title: 'RSVP recorded: Coming',
      description: 'We will slowly start moving hackers to the Confirmed status on a first-come-first-served basis. Your registered team members will be moved to the Confirmed status with you unless they RSVP not coming.',
      icon: '✓',
      style: 'border-emerald-300/20 bg-emerald-300/[0.06] text-emerald-100',
      iconStyle: 'border-emerald-200/30 bg-emerald-200/10 text-emerald-200',
    },
    not_coming: {
      title: 'RSVP recorded: Not Coming',
      description: 'Your response has been saved.',
      icon: '✘',
      style: 'border-amber-300/20 bg-amber-300/[0.06] text-amber-100',
      iconStyle: 'border-amber-200/30 bg-amber-200/10 text-amber-200',
    },
    rejected: {
      title: 'Application status: Rejected',
      description: 'You will not be attending HackRU. Contact us if you have questions.',
      icon: '!',
      style: 'border-rose-300/20 bg-rose-300/[0.06] text-rose-100',
      iconStyle: 'border-rose-200/30 bg-rose-200/10 text-rose-200',
    },
  } as const;

  const notice = status in statusNotice
    ? statusNotice[status as keyof typeof statusNotice]
    : null;

  return (
    <div className="mx-auto mt-4 w-full max-w-4xl px-1 sm:mt-6 sm:px-4">
      {notice && (
        <div className={`mb-3 flex items-start gap-3 rounded-2xl border p-4 sm:items-center sm:p-5 ${notice.style}`}>
          <div className={`mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-full border text-lg font-semibold sm:mt-0 ${notice.iconStyle}`}>
            {notice.icon}
          </div>
          <div className="min-w-0">
            <p className="text-sm font-semibold sm:text-base">{notice.title}</p>
            <p className="mt-1 text-sm leading-relaxed text-slate-300">
              {notice.description}
            </p>
          </div>
        </div>
      )}
      {status !== 'not_coming' && status !== 'rejected' && (
        <div className="rounded-2xl border border-white/10 bg-slate-950/40 p-2 shadow-[inset_0_1px_0_rgba(255,255,255,0.06)] backdrop-blur-sm sm:p-4">
          <div className="flex items-start justify-between gap-[3px] sm:gap-2">
            {STAGES.map((stage, index) => {
              const isCompleted = index <= currentIndex;
              const isCurrent = index === currentIndex;
              const isWaitlistMarker = isWaitlist && stage === 'confirmed';

              return (
                <div
                  key={stage}
                  className="relative flex min-w-0 flex-1 flex-col items-center justify-start"
                >
                  {index !== 0 && (
                    <div
                      className={`absolute left-0 top-2.5 z-0 h-[2px] w-1/2 rounded-full ${
                        index <= currentIndex
                          ? 'bg-emerald-400 shadow-[0_0_12px_rgba(52,211,153,0.8)]'
                          : isWaitlist && stage === 'confirmed'
                            ? 'border border-dashed border-amber-300 bg-amber-400/50'
                            : 'bg-slate-700'
                      }`}
                    />
                  )}

                  {index !== STAGES.length - 1 && (
                    <div
                      className={`absolute left-1/2 top-2.5 z-0 h-[2px] w-1/2 rounded-full ${
                        index < currentIndex
                          ? 'bg-emerald-400 shadow-[0_0_12px_rgba(52,211,153,0.8)]'
                          : isWaitlist && STAGES[index + 1] === 'confirmed'
                            ? 'border border-dashed border-amber-300 bg-amber-400/50'
                            : 'bg-slate-700'
                      }`}
                    />
                  )}

                  <div
                    className={`relative z-10 flex h-4 w-4 items-center justify-center rounded-full border-2 transition-all duration-300 sm:h-6 sm:w-6
                      ${
                        isCompleted
                          ? 'border-emerald-300 bg-emerald-400 shadow-[0_0_18px_rgba(52,211,153,0.7)]'
                          : isCurrent
                            ? 'animate-pulse border-sky-300 bg-sky-400 ring-4 ring-sky-300/30'
                            : isWaitlistMarker
                              ? 'animate-pulse border-amber-300 bg-amber-400'
                              : 'border-slate-600 bg-slate-800'
                      }
                    `}
                  >
                    {isWaitlistMarker && (
                      <div className="absolute h-1.5 w-1.5 rounded-full bg-amber-900" />
                    )}
                  </div>

                  <div
                    className={`mt-1.5 max-w-[58px] text-center text-[7px] capitalize leading-[1.15] sm:max-w-[74px] sm:text-[10px] ${
                      isCompleted || isCurrent || isWaitlistMarker
                        ? 'font-semibold text-white'
                        : 'text-slate-400'
                    }`}
                  >
                    {isWaitlist && STAGE_LABELS[stage] == 'Confirmed'
                      ? 'Waitlist'
                      : STAGE_LABELS[stage]}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}
