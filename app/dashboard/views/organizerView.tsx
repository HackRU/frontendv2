'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import {
  ArrowRightOnRectangleIcon,
  CameraIcon,
  CheckCircleIcon,
  ExclamationTriangleIcon,
  XCircleIcon,
} from '@heroicons/react/24/outline';
import './organizerView.css';
import QrReaderWrapper from '../components/QRreader';
import PopupDialog from '../components/dialog';
import {
  AttendEventScan,
  GetPoints,
  GetUser,
  handleSignOut,
  SetUser,
} from '@/app/lib/actions';
import { getSelf } from '@/app/lib/data';
import { redirectIfUnauthorized } from '@/app/lib/authGuard';
import { ReadConfirmed } from '@/app/lib/teamactions';

const CURRENT_SEASON = 'f-26';
const CURRENT_SEASON_LABEL = CURRENT_SEASON.toUpperCase();

type ScannerTab =
  | 'CHECK IN'
  | 'EVENT'
  | 'SHOP'
  | 'MANUAL'
  | 'SPONSOR'
  | 'USER INFO';
type ScanStatus = 'idle' | 'loading' | 'success' | 'warning' | 'error';
type ScanResult = {
  status: Exclude<ScanStatus, 'idle' | 'loading'>;
  title: string;
  message: string;
  attendance?: number;
};
type ForcePrompt = {
  eventName: string;
  attendance: number | null;
  limit: number;
  apiError: string;
};
type UserInfoSnapshot = {
  profile: Record<string, unknown>;
  points: { balance: number | null; total_points: number | null } | null;
  pointsError: string;
  team: {
    members: {
      name: string;
      email: string;
      registrationStatus: string;
    }[];
  } | null;
  teamError: string;
};
const REPEATABLE_LIMIT = 999;
type EventOption = {
  name: string;
  points: number;
  limit: number;
  category: 'event' | 'shop';
};

const eventCatalog: EventOption[] = [
  { name: 'lunch-saturday', points: 0, limit: 1, category: 'event' },
  { name: 'dinner-saturday', points: 0, limit: 1, category: 'event' },
  { name: 'breakfast-sunday', points: 0, limit: 1, category: 'event' },
  { name: 'lunch-sunday', points: 0, limit: 1, category: 'event' },
  { name: 'midnight-surprise', points: 15, limit: 1, category: 'event' },
  {
    name: "Who's that pokemon - easy",
    points: 5,
    limit: REPEATABLE_LIMIT,
    category: 'event',
  },
  {
    name: "Who's that pokemon - medium",
    points: 10,
    limit: REPEATABLE_LIMIT,
    category: 'event',
  },
  {
    name: "Who's that pokemon - hard",
    points: 15,
    limit: REPEATABLE_LIMIT,
    category: 'event',
  },
  {
    name: 'Ring toss - middle',
    points: 15,
    limit: REPEATABLE_LIMIT,
    category: 'event',
  },
  {
    name: 'Ring toss - side10',
    points: 10,
    limit: REPEATABLE_LIMIT,
    category: 'event',
  },
  {
    name: 'Ring toss - side5',
    points: 5,
    limit: REPEATABLE_LIMIT,
    category: 'event',
  },
  {
    name: 'Gear game 20',
    points: 20,
    limit: REPEATABLE_LIMIT,
    category: 'event',
  },
  {
    name: 'Gear game 15',
    points: 15,
    limit: REPEATABLE_LIMIT,
    category: 'event',
  },
  {
    name: 'Nintendo game',
    points: 10,
    limit: REPEATABLE_LIMIT,
    category: 'event',
  },
  {
    name: 'Cup stacking - 15',
    points: 15,
    limit: REPEATABLE_LIMIT,
    category: 'event',
  },
  {
    name: 'Cup stacking - 20',
    points: 20,
    limit: REPEATABLE_LIMIT,
    category: 'event',
  },
  {
    name: 'Minecraft PvP',
    points: 10,
    limit: REPEATABLE_LIMIT,
    category: 'event',
  },
  {
    name: 'shop - Lego flowers',
    points: -15,
    limit: REPEATABLE_LIMIT,
    category: 'shop',
  },
  {
    name: 'shop - Mochi squish toys',
    points: -10,
    limit: REPEATABLE_LIMIT,
    category: 'shop',
  },
  {
    name: 'shop - Crystals',
    points: -10,
    limit: REPEATABLE_LIMIT,
    category: 'shop',
  },
  {
    name: 'shop - Wood painting',
    points: -15,
    limit: REPEATABLE_LIMIT,
    category: 'shop',
  },
  {
    name: 'shop - Flower pot',
    points: -25,
    limit: REPEATABLE_LIMIT,
    category: 'shop',
  },
  {
    name: 'shop - Fairy lights',
    points: -15,
    limit: REPEATABLE_LIMIT,
    category: 'shop',
  },
  {
    name: 'shop - Mushroom fairy lights',
    points: -25,
    limit: REPEATABLE_LIMIT,
    category: 'shop',
  },
  {
    name: 'shop - Bulk mini plush',
    points: -30,
    limit: REPEATABLE_LIMIT,
    category: 'shop',
  },
  {
    name: 'shop - Laptop stand',
    points: -45,
    limit: REPEATABLE_LIMIT,
    category: 'shop',
  },
  {
    name: 'shop - Squishmallow moth',
    points: -60,
    limit: REPEATABLE_LIMIT,
    category: 'shop',
  },
  {
    name: 'shop - Turtle plush',
    points: -60,
    limit: REPEATABLE_LIMIT,
    category: 'shop',
  },
  {
    name: 'shop - Snail plush',
    points: -60,
    limit: REPEATABLE_LIMIT,
    category: 'shop',
  },
  {
    name: 'shop - Capy plush',
    points: -65,
    limit: REPEATABLE_LIMIT,
    category: 'shop',
  },
  {
    name: 'shop - Lego set',
    points: -90,
    limit: REPEATABLE_LIMIT,
    category: 'shop',
  },
];
const eventsByName = new Map(eventCatalog.map((event) => [event.name, event]));

const shopEvents = eventCatalog
  .filter((event) => event.category === 'shop')
  .sort((first, second) => first.name.localeCompare(second.name));

const regularEvents = eventCatalog
  .filter((event) => event.category === 'event')
  .sort((first, second) => first.name.localeCompare(second.name));

const displayEventName = (event: string) =>
  event
    .replace(new RegExp(`^${CURRENT_SEASON}\\s+`, 'i'), '')
    .replace(/^shop\s+-\s+/i, '');

const toApiEventName = (event: string) =>
  event.startsWith(`${CURRENT_SEASON} `) ? event : `${CURRENT_SEASON} ${event}`;

const toFiniteNumber = (value: unknown): number | null => {
  if (typeof value === 'number' && Number.isFinite(value)) return value;
  if (typeof value === 'string' && value.trim() !== '') {
    const parsed = Number(value);
    return Number.isFinite(parsed) ? parsed : null;
  }
  return null;
};

const getSeasonAttendance = (profile: Record<string, unknown>) => {
  const dayOf = profile.day_of;
  if (!dayOf || typeof dayOf !== 'object' || Array.isArray(dayOf)) return [];
  const events = (dayOf as Record<string, unknown>).event;
  if (!events || typeof events !== 'object' || Array.isArray(events)) return [];

  return Object.entries(events)
    .filter(
      ([name, details]) =>
        name.startsWith(`${CURRENT_SEASON} `) &&
        details !== null &&
        typeof details === 'object' &&
        !Array.isArray(details),
    )
    .map(([name, value]) => {
      const details = value as { attend?: unknown; time?: unknown };
      const times = Array.isArray(details.time)
        ? details.time.filter(
            (time): time is string => typeof time === 'string',
          )
        : [];
      return {
        name: displayEventName(name),
        count: toFiniteNumber(details.attend) ?? times.length,
        times,
      };
    })
    .sort((first, second) => first.name.localeCompare(second.name));
};

const formatAttendanceTime = (value: string) => {
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return value;
  return new Intl.DateTimeFormat(undefined, {
    dateStyle: 'medium',
    timeStyle: 'short',
  }).format(date);
};

const userInfoFields = [
  ['gender', 'Gender'],
  ['age', 'Age'],
  ['shirt_size', 'Shirt size'],
  ['school', 'School'],
  ['grad_year', 'Graduation year'],
  ['level_of_study', 'Level of study'],
  ['major', 'Major'],
  ['dietary_restrictions', 'Dietary restrictions'],
  ['special_needs', 'Special needs'],
  ['short_answer', 'Short answer'],
  ['github', 'GitHub'],
  ['ethnicity', 'Ethnicity'],
  ['phone_number', 'Phone number'],
] as const;

function UserInfoPanel({ snapshot }: { snapshot: UserInfoSnapshot }) {
  const { profile, points, pointsError, team, teamError } = snapshot;
  const attendance = getSeasonAttendance(profile);
  const name = [profile.first_name, profile.last_name]
    .filter((value): value is string => typeof value === 'string' && !!value)
    .join(' ');
  return (
    <div className="space-y-5">
      <section aria-labelledby="user-info-profile-heading">
        <div className="flex flex-wrap items-start justify-between gap-3">
          <div className="min-w-0">
            <h3
              id="user-info-profile-heading"
              className="text-lg font-semibold text-white"
            >
              {name || 'Attendee profile'}
            </h3>
            <p className="mt-1 break-all text-sm text-slate-300">
              {typeof profile.email === 'string' ? profile.email : ''}
            </p>
          </div>
          <span className="bg-cyan-200/15 rounded px-2.5 py-1 text-xs font-semibold text-cyan-100">
            {typeof profile.registration_status === 'string'
              ? profile.registration_status.replaceAll('_', ' ')
              : 'Status unavailable'}
          </span>
        </div>
        <dl className="mt-4 grid grid-cols-1 gap-x-5 gap-y-3 border-t border-white/10 pt-4 sm:grid-cols-2">
          {userInfoFields.map(([key, label]) => {
            const value = profile[key];
            return (
              <div key={key} className="min-w-0">
                <dt className="text-xs text-slate-400">{label}</dt>
                <dd className="mt-1 break-words text-sm text-slate-100">
                  {value === null || value === undefined || value === ''
                    ? 'Not provided'
                    : String(value)}
                </dd>
              </div>
            );
          })}
        </dl>
      </section>

      <section aria-labelledby="user-info-points-heading">
        <h3
          id="user-info-points-heading"
          className="text-sm font-bold uppercase tracking-wide text-cyan-200"
        >
          Points
        </h3>
        {points ? (
          <dl className="mt-3 grid grid-cols-2 gap-3">
            {[
              { label: 'Current balance', value: points.balance },
              { label: 'Total points earned', value: points.total_points },
            ].map((item) => (
              <div
                key={item.label}
                className="rounded-md border border-white/10 bg-white/[0.05] p-3"
              >
                <dt className="text-xs text-slate-400">{item.label}</dt>
                <dd className="mt-1 text-xl font-semibold text-lime-200">
                  {item.value ?? 'Unavailable'}
                </dd>
              </div>
            ))}
          </dl>
        ) : (
          <p className="mt-3 text-sm text-amber-200">
            {pointsError || 'Point information is unavailable.'}
          </p>
        )}
        {pointsError && points && (
          <p className="mt-2 text-xs text-amber-200">{pointsError}</p>
        )}
      </section>

      <section aria-labelledby="user-info-team-heading">
        <h3
          id="user-info-team-heading"
          className="text-sm font-bold uppercase tracking-wide text-cyan-200"
        >
          Registration team
        </h3>
        {team ? (
          <div className="mt-3">
            <p className="mb-3 text-sm font-semibold text-white">
              Team members from pre-event registration.
            </p>
            <ul className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
              {team.members.map((member) => (
                <li
                  key={member.email}
                  className="min-w-0 rounded-md border border-white/10 bg-white/[0.05] p-3"
                >
                  <p className="break-words text-sm font-semibold text-white">
                    {member.name}
                  </p>
                  <p className="mt-1 break-all text-xs text-slate-300">
                    {member.email}
                  </p>
                  <p className="mt-2 text-xs text-slate-400">
                    Registration:{' '}
                    <span className="capitalize text-slate-200">
                      {member.registrationStatus?.replaceAll('_', ' ')}
                    </span>
                  </p>
                </li>
              ))}
            </ul>
          </div>
        ) : (
          <p className="mt-3 text-sm text-slate-400">
            {teamError || 'No confirmed team found.'}
          </p>
        )}
      </section>

      <section aria-labelledby="user-info-attendance-heading">
        <div className="flex flex-wrap items-baseline justify-between gap-2">
          <h3
            id="user-info-attendance-heading"
            className="text-sm font-bold uppercase tracking-wide text-cyan-200"
          >
            {CURRENT_SEASON_LABEL} event attendance
          </h3>
          <span className="text-xs text-slate-400">
            {attendance.length} {attendance.length === 1 ? 'event' : 'events'}
          </span>
        </div>
        {attendance.length > 0 ? (
          <ul className="mt-3 divide-y divide-white/10 border-y border-white/10">
            {attendance.map((event) => (
              <li
                key={event.name}
                className="grid gap-2 py-3 sm:grid-cols-[minmax(0,1fr)_auto] sm:gap-4"
              >
                <div className="min-w-0">
                  <p className="break-words text-sm font-semibold text-white">
                    {event.name}
                  </p>
                  {event.times.length > 0 ? (
                    <ul className="mt-2 space-y-1">
                      {event.times.map((time, index) => (
                        <li
                          key={`${time}-${index}`}
                          className="break-words text-xs text-slate-300"
                        >
                          <span className="mr-2 text-slate-500">
                            {index + 1}.
                          </span>
                          {formatAttendanceTime(time)}
                        </li>
                      ))}
                    </ul>
                  ) : (
                    <p className="mt-1 text-xs text-slate-400">
                      No attendance times recorded
                    </p>
                  )}
                </div>
                <span className="text-xs font-semibold text-lime-200 sm:whitespace-nowrap">
                  {event.count} {event.count === 1 ? 'visit' : 'visits'}
                </span>
              </li>
            ))}
          </ul>
        ) : (
          <p className="border-white/15 mt-3 rounded-md border border-dashed px-3 py-4 text-sm text-slate-400">
            No {CURRENT_SEASON_LABEL} event attendance has been recorded.
          </p>
        )}
      </section>
    </div>
  );
}

const tabs: { id: ScannerTab; label: string }[] = [
  { id: 'CHECK IN', label: 'Check in' },
  { id: 'EVENT', label: 'Events' },
  { id: 'SHOP', label: 'Shop' },
  { id: 'MANUAL', label: 'Manual' },
  { id: 'SPONSOR', label: 'Sponsors' },
  { id: 'USER INFO', label: 'User Info' },
];

function OrganizerView() {
  const router = useRouter();
  const [scannerTab, setScannerTab] = useState<ScannerTab>('CHECK IN');
  const [selectedEvent, setSelectedEvent] = useState('');
  const [selectedABList, setSelectedABList] = useState(true);
  const [openScanner, setOpenScanner] = useState(false);
  const [confirmationEmail, setConfirmationEmail] = useState<string | null>(
    null,
  );
  const [latestScannedEmail, setLatestScannedEmail] = useState('');
  const [scannedName, setScannedName] = useState('');
  const [status, setStatus] = useState<ScanStatus>('idle');
  const [scanResult, setScanResult] = useState<ScanResult | null>(null);
  const [forcePrompt, setForcePrompt] = useState<ForcePrompt | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [userInfo, setUserInfo] = useState<UserInfoSnapshot | null>(null);
  const [manualEmail, setManualEmail] = useState('');
  const [manualPoints, setManualPoints] = useState(0);
  const [pointOperation, setPointOperation] = useState<'add' | 'subtract'>(
    'add',
  );
  const [isSponsor, setIsSponsor] = useState(false);

  const resetScanLog = () => {
    setLatestScannedEmail('');
    setScannedName('');
    setScanResult(null);
    setStatus('idle');
    setForcePrompt(null);
    setConfirmationEmail(null);
    setUserInfo(null);
  };

  const completeWithError = (title: string, message: string) => {
    setStatus('error');
    setScanResult({ status: 'error', title, message });
  };

  const handleOnScan = async (rawEmail: string, forceAttendance = false) => {
    const email = rawEmail.trim();
    setLatestScannedEmail(email);
    setScanResult(null);
    setScannedName('');
    setStatus('loading');
    setIsSubmitting(true);

    if ((scannerTab === 'EVENT' || scannerTab === 'SHOP') && !selectedEvent) {
      completeWithError(
        'Choose an item first',
        'Select an event or shop item before scanning.',
      );
      setIsSubmitting(false);
      return;
    }

    try {
      const userResponse = await GetUser(email);
      if (userResponse.error) {
        completeWithError('Attendee not found', userResponse.error);
        return;
      }

      const userData = userResponse.response as unknown as {
        first_name?: string;
        last_name?: string;
      };
      if (!userData || typeof userData !== 'object') {
        completeWithError(
          'Could not load attendee',
          'The attendee record was empty or invalid.',
        );
        return;
      }
      const userRecord = userData as Record<string, unknown>;
      const fullName = [userData.first_name, userData.last_name]
        .filter(Boolean)
        .join(' ');
      setScannedName(fullName || 'Attendee');

      if (scannerTab === 'USER INFO') {
        let points: UserInfoSnapshot['points'] = null;
        let pointsError = '';
        try {
          const pointsResponse = await GetPoints(email);
          if (pointsResponse.error) {
            pointsError = pointsResponse.error;
          } else {
            const payload = pointsResponse.response as unknown as Record<
              string,
              unknown
            >;
            points = {
              balance: toFiniteNumber(payload?.balance),
              total_points: toFiniteNumber(payload?.total_points),
            };
          }
        } catch (error) {
          pointsError =
            error instanceof Error
              ? error.message
              : 'Unable to retrieve point information.';
        }

        let team: UserInfoSnapshot['team'] = null;
        let teamError = '';
        try {
          const confirmedTeamResponse = await ReadConfirmed(email);
          if (confirmedTeamResponse.error) {
            teamError = confirmedTeamResponse.error;
          } else if (
            confirmedTeamResponse.response &&
            typeof confirmedTeamResponse.response === 'object'
          ) {
            const teamRecord = confirmedTeamResponse.response as Record<
              string,
              unknown
            >;
            const listedEmails = [
              teamRecord.leader_email,
              ...(Array.isArray(teamRecord.members) ? teamRecord.members : []),
            ];
            const memberEmails = listedEmails.filter(
              (memberEmail, index) =>
                listedEmails.indexOf(memberEmail) === index,
            );
            const members = await Promise.all(
              memberEmails.map(async (memberEmail) => {
                let memberProfile =
                  memberEmail.toLowerCase() === email.toLowerCase()
                    ? userRecord
                    : null;

                if (!memberProfile) {
                  try {
                    const memberResponse = await GetUser(memberEmail);
                    if (!memberResponse.error && memberResponse.response) {
                      memberProfile =
                        memberResponse.response as unknown as Record<
                          string,
                          unknown
                        >;
                    }
                  } catch {
                    memberProfile = null;
                  }
                }

                const firstName = memberProfile?.first_name;
                const lastName = memberProfile?.last_name;

                return {
                  name: [firstName, lastName].join(' '),
                  email: memberEmail as string,
                  registrationStatus:
                    memberProfile?.registration_status as string,
                };
              }),
            );

            team = {
              members,
            };
          }
        } catch (error) {
          teamError =
            error instanceof Error
              ? error.message
              : 'Unable to retrieve confirmed team information.';
        }

        setUserInfo({
          profile: {
            ...userRecord,
            email:
              typeof userRecord.email === 'string' ? userRecord.email : email,
          },
          points,
          pointsError,
          team,
          teamError,
        });
        setStatus('success');
        setScanResult({
          status: 'success',
          title: 'User information loaded',
          message: `Profile, points, and ${CURRENT_SEASON_LABEL} attendance are shown below.`,
        });
        return;
      }

      if (scannerTab === 'CHECK IN') {
        const response = await SetUser(
          { registration_status: 'checked_in' },
          email,
        );
        if (response.error) {
          completeWithError('Check-in failed', response.error);
          return;
        }
        setStatus('success');
        setScanResult({
          status: 'success',
          title: 'Check-in complete',
          message: response.response || `${fullName || email} is checked in.`,
        });
        return;
      }

      let eventName: string;
      let points: number;
      let limit: number;
      let sponsor = false;
      let allowRepeat = forceAttendance;

      if (scannerTab === 'EVENT' || scannerTab === 'SHOP') {
        const selectedOption = eventsByName.get(selectedEvent);
        eventName = toApiEventName(selectedEvent);
        points = selectedOption?.points ?? 0;
        limit = selectedOption?.limit ?? 1;
      } else if (scannerTab === 'SPONSOR') {
        eventName = toApiEventName(selectedABList ? 'SponsorA' : 'SponsorB');
        points = 0;
        limit = 1;
        sponsor = true;
      } else {
        eventName = toApiEventName('Manual');
        points = manualPoints * (pointOperation === 'add' ? 1 : -1);
        limit = 999;
        allowRepeat = true;
      }

      const response = await AttendEventScan(
        email,
        eventName,
        points,
        allowRepeat,
        limit,
        sponsor,
      );

      // only an attendance-limit 409 carries a count; forcing can't fix a low balance or a missing check-in
      if (response.status === 409 && response.count === null) {
        completeWithError('Attendance was rejected', response.error);
        return;
      }

      if (response.status === 409 && !forceAttendance) {
        const apiError = response.error;
        setStatus('warning');
        setScanResult({
          status: 'warning',
          title: 'Attendance was rejected',
          message: apiError,
          attendance: response.count ?? undefined,
        });
        setForcePrompt({
          eventName: displayEventName(eventName),
          attendance: response.count,
          limit,
          apiError,
        });
        return;
      }

      if (response.error) {
        completeWithError('Attendance was not recorded', response.error);
        return;
      }

      setStatus('success');
      setScanResult({
        status: 'success',
        title: 'Attendance recorded',
        message: `Recorded ${displayEventName(eventName)} for ${fullName || email}.`,
        attendance: response.count ?? undefined,
      });
    } catch (error) {
      completeWithError(
        'Scan could not be completed',
        error instanceof Error
          ? error.message
          : 'An unexpected error occurred. Please try again.',
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleManualScan = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!manualEmail.trim()) {
      completeWithError(
        'Email required',
        'Enter the attendee email to continue.',
      );
      return;
    }
    await handleOnScan(manualEmail);
    setManualEmail('');
  };

  useEffect(() => {
    async function fetchUser() {
      try {
        const data = await getSelf();
        if (await redirectIfUnauthorized(data.statusCode)) return;

        const email = data.response.email ?? '';
        const sponsorAccount = email.slice(-11).toLowerCase() === 'sponsor.com';
        setIsSponsor(sponsorAccount);
        if (sponsorAccount) setScannerTab('SPONSOR');
      } catch {
        completeWithError(
          'Could not verify operator access',
          'Refresh the page or sign in again before scanning.',
        );
      }
    }
    fetchUser();
  }, []);

  const activeEvent = eventsByName.get(selectedEvent);
  const currentPoints =
    scannerTab === 'SHOP'
      ? `-${Math.abs(activeEvent?.points ?? 0)} points`
      : `${activeEvent?.points ?? 0} points`;
  const visibleEvents = scannerTab === 'SHOP' ? shopEvents : regularEvents;

  return (
    <main className="px-3 pb-8 pt-28 text-white sm:px-6 sm:pb-8 sm:pt-36 lg:px-8 lg:pb-12 lg:pt-48">
      <div className="mx-auto max-w-6xl">
        <header className="mb-7 flex flex-wrap items-end justify-between gap-4">
          <div>
            <p className="mb-2 text-xs font-bold uppercase tracking-[0.18em] text-cyan-300">
              Event operations
            </p>
            <h1 className="text-3xl font-semibold tracking-tight sm:text-4xl">
              Organizer dashboard
            </h1>
            <p className="mt-2 max-w-2xl text-sm text-slate-300">
              Check in attendees, record events, manage points, and get user
              info.
            </p>
          </div>
          <button
            type="button"
            className="min-h-10 inline-flex items-center gap-2 rounded-md border border-white/20 px-3 py-2 text-sm font-semibold text-white transition hover:border-white/50 hover:bg-white/10"
            onClick={async () => {
              await handleSignOut();
              router.replace('/');
            }}
          >
            <ArrowRightOnRectangleIcon className="h-4 w-4" aria-hidden="true" />
            Sign out
          </button>
        </header>

        <nav
          aria-label="Organizer actions"
          className="mb-5 grid grid-cols-2 gap-1.5 rounded-md border border-cyan-200/20 bg-[#102536] p-1.5 sm:grid-cols-3 sm:gap-2 sm:p-2 lg:grid-cols-6"
        >
          {tabs.map((tab) => {
            const active = scannerTab === tab.id;
            return (
              <button
                type="button"
                key={tab.id}
                disabled={isSponsor && tab.id !== 'SPONSOR'}
                aria-pressed={active}
                className={`min-h-12 rounded px-2 py-2 text-center text-sm font-bold transition focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-lime-300 disabled:cursor-not-allowed disabled:opacity-40 sm:min-h-[54px] sm:px-3 sm:text-left ${
                  active
                    ? 'bg-[#d9f64a] text-[#173321] shadow-[0_3px_0_#96b52b]'
                    : 'hover:bg-cyan-200/15 bg-white/[0.04] text-cyan-50'
                }`}
                onClick={() => {
                  setScannerTab(tab.id);
                  setSelectedEvent('');
                  setOpenScanner(false);
                  resetScanLog();
                }}
              >
                {tab.label}
              </button>
            );
          })}
        </nav>

        <div className="grid items-start gap-5 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)]">
          <section className="rounded-md bg-[#f3f5ef] p-4 text-[#162522] shadow-xl sm:p-6">
            <div className="mb-6 border-b border-[#d8dfd6] pb-4">
              <p className="text-xs font-bold uppercase tracking-[0.15em] text-[#50736b]">
                01 / Scan setup
              </p>
              <h2 className="mt-2 text-xl font-semibold">
                {tabs.find((tab) => tab.id === scannerTab)?.label}
              </h2>
            </div>

            {(scannerTab === 'EVENT' || scannerTab === 'SHOP') && (
              <div className="space-y-4">
                <label
                  htmlFor="event-choice"
                  className="block text-sm font-semibold"
                >
                  {scannerTab === 'SHOP' ? 'Shop item' : 'Event'}
                </label>
                <select
                  id="event-choice"
                  value={selectedEvent}
                  onChange={(event) => {
                    setSelectedEvent(event.target.value);
                    resetScanLog();
                  }}
                  className="min-h-12 w-full rounded-md border border-[#b9c7bf] bg-white px-3 py-2 text-sm text-[#162522] outline-none focus:border-[#217665] focus:ring-2 focus:ring-[#217665]/20"
                >
                  <option value="">
                    Choose {scannerTab === 'SHOP' ? 'a shop item' : 'an event'}
                  </option>
                  {visibleEvents.map((event) => (
                    <option key={event.name} value={event.name}>
                      {displayEventName(event.name)}
                    </option>
                  ))}
                </select>
                {selectedEvent && activeEvent ? (
                  <dl className="grid grid-cols-[minmax(0,1fr)_auto_auto] items-start gap-3 border-y border-[#d8dfd6] py-3 text-sm">
                    <div className="min-w-0">
                      <dt className="text-xs font-medium text-[#60716c]">
                        {scannerTab === 'SHOP' ? 'Item' : 'Event'}
                      </dt>
                      <dd className="mt-1 break-words font-semibold">
                        {displayEventName(activeEvent.name)}
                      </dd>
                    </div>
                    <div className="text-right">
                      <dt className="text-xs font-medium text-[#60716c]">
                        Points
                      </dt>
                      <dd
                        className={`mt-1 whitespace-nowrap rounded px-2 py-1 text-xs font-bold ${
                          activeEvent.points < 0
                            ? 'bg-[#ffc17a] text-[#57300b]'
                            : 'bg-[#c9f35a] text-[#173321]'
                        }`}
                      >
                        {currentPoints}
                      </dd>
                    </div>
                    <div className="text-right">
                      <dt className="text-xs font-medium text-[#60716c]">
                        Limit
                      </dt>
                      <dd className="mt-1 whitespace-nowrap font-semibold">
                        {activeEvent.limit}
                      </dd>
                    </div>
                  </dl>
                ) : (
                  <p className="text-sm text-[#5e6f69]">
                    {scannerTab === 'SHOP'
                      ? 'Choose a reward to deduct its point cost.'
                      : 'Choose an event to see its point value and attendance rules.'}
                  </p>
                )}
              </div>
            )}

            {scannerTab === 'CHECK IN' && (
              <div className="border-l-2 border-[#4a9b82] pl-4 text-sm leading-6 text-[#4d625b]">
                Scan an attendee QR code or enter their email to mark their
                registration as checked in.
              </div>
            )}

            {scannerTab === 'USER INFO' && (
              <div>
                <p className="border-l-2 border-[#217665] pl-4 text-sm leading-6 text-[#4d625b]">
                  Scan a QR code or search by email to view the attendee&apos;s
                  profile, points, and {CURRENT_SEASON_LABEL} attendance. This
                  lookup is read-only.
                </p>
              </div>
            )}

            {scannerTab === 'SPONSOR' && (
              <div>
                <p className="mb-3 text-sm font-semibold">Sponsor list</p>
                <div
                  className="grid grid-cols-2 gap-2"
                  role="group"
                  aria-label="Sponsor list"
                >
                  {[
                    { label: 'List A', value: true },
                    { label: 'List B', value: false },
                  ].map((list) => (
                    <button
                      type="button"
                      key={list.label}
                      aria-pressed={selectedABList === list.value}
                      className={`min-h-11 rounded-md border px-3 text-sm font-semibold ${
                        selectedABList === list.value
                          ? 'border-[#e0a42a] bg-[#fff0bf] text-[#57390c]'
                          : 'border-[#cbd5cd] bg-white text-[#40524c] hover:bg-[#edf2ed]'
                      }`}
                      onClick={() => {
                        setSelectedABList(list.value);
                        resetScanLog();
                      }}
                    >
                      {list.label}
                    </button>
                  ))}
                </div>
                <p className="mt-3 text-sm text-[#5e6f69]">
                  Choose the partner list before scanning an attendee.
                </p>
              </div>
            )}

            {scannerTab === 'MANUAL' && (
              <div>
                <p className="mb-3 text-sm font-semibold">Point adjustment</p>
                <div
                  className="mb-4 grid grid-cols-2 gap-2"
                  role="group"
                  aria-label="Point operation"
                >
                  {(['add', 'subtract'] as const).map((operation) => (
                    <button
                      type="button"
                      key={operation}
                      aria-pressed={pointOperation === operation}
                      className={`min-h-11 rounded-md border px-3 text-sm font-semibold capitalize ${
                        pointOperation === operation
                          ? 'border-[#e0a42a] bg-[#fff0bf] text-[#57390c]'
                          : 'border-[#cbd5cd] bg-white text-[#40524c] hover:bg-[#edf2ed]'
                      }`}
                      onClick={() => setPointOperation(operation)}
                    >
                      {operation === 'add' ? 'Add points' : 'Subtract points'}
                    </button>
                  ))}
                </div>
                <label
                  htmlFor="manual-points"
                  className="mb-2 block text-sm font-semibold"
                >
                  Points
                </label>
                <input
                  id="manual-points"
                  type="number"
                  min="0"
                  step="1"
                  value={manualPoints}
                  onChange={(event) =>
                    setManualPoints(Math.max(0, Number(event.target.value)))
                  }
                  className="min-h-12 w-full rounded-md border border-[#b9c7bf] bg-white px-3 py-2 text-sm outline-none focus:border-[#217665] focus:ring-2 focus:ring-[#217665]/20"
                />
                <p className="mt-2 text-xs text-[#60716c]">
                  {pointOperation === 'add' ? 'Credit' : 'Deduct'}{' '}
                  {manualPoints} points
                </p>
              </div>
            )}
          </section>

          <section className="border-cyan-100/15 rounded-md border bg-[#102536] p-4 shadow-xl sm:p-6">
            <div className="mb-5 flex flex-col gap-3 border-b border-white/10 pb-4 sm:flex-row sm:items-start sm:justify-between">
              <div>
                <p className="text-xs font-bold uppercase tracking-[0.15em] text-teal-300">
                  02 / Attendee scan
                </p>
                <h2 className="mt-2 text-xl font-semibold">
                  Scan or enter email
                </h2>
              </div>
              <button
                type="button"
                aria-expanded={openScanner}
                className={`min-h-11 inline-flex w-full items-center justify-center gap-2 rounded-md px-3 py-2 text-sm font-bold transition sm:w-auto ${
                  openScanner
                    ? 'hover:bg-white/15 bg-white/10 text-white'
                    : 'bg-[#d9f64a] text-[#173321] hover:bg-[#e6ff65]'
                }`}
                onClick={() => setOpenScanner((open) => !open)}
              >
                <CameraIcon className="h-4 w-4" aria-hidden="true" />
                {openScanner ? 'Close camera' : 'Open camera'}
              </button>
            </div>

            {openScanner && (
              <div className="mb-5 overflow-hidden rounded-md bg-black p-2">
                <QrReaderWrapper
                  qrScanEnabled={!confirmationEmail && !isSubmitting}
                  onScan={(text: string) => {
                    setOpenScanner(false);
                    setConfirmationEmail(text);
                  }}
                />
              </div>
            )}

            <form
              className="flex flex-col gap-2 sm:flex-row"
              onSubmit={handleManualScan}
            >
              <label htmlFor="manual-email" className="sr-only">
                Attendee email
              </label>
              <input
                id="manual-email"
                type="email"
                required
                autoComplete="email"
                value={manualEmail}
                onChange={(event) => setManualEmail(event.target.value)}
                placeholder="attendee@example.com"
                className="min-h-12 border-white/15 min-w-0 flex-1 rounded-md border bg-[#192a38] px-3 py-2 text-sm text-white outline-none placeholder:text-slate-400 focus:border-teal-300 focus:ring-2 focus:ring-teal-300/20"
              />
              <button
                type="submit"
                disabled={isSubmitting}
                className="min-h-12 rounded-md bg-blue-600 px-4 py-2 text-sm font-bold text-white transition hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-300 disabled:cursor-wait disabled:opacity-60"
              >
                {isSubmitting ? 'Working…' : 'Find attendee'}
              </button>
            </form>

            <div className="mt-5" aria-live="polite" aria-atomic="true">
              {status === 'loading' ? (
                <div className="min-h-24 flex items-center gap-3 rounded-md border border-white/10 bg-white/[0.04] p-4">
                  <span className="h-5 w-5 animate-spin rounded-full border-2 border-teal-300/30 border-t-teal-300" />
                  <div>
                    <p className="text-sm font-semibold">Processing scan</p>
                    <p className="mt-1 text-xs text-slate-400">
                      Looking up the attendee and saving the update.
                    </p>
                  </div>
                </div>
              ) : scanResult ? (
                <div
                  className={`rounded-md border p-4 ${
                    scanResult.status === 'success'
                      ? 'border-emerald-300/25 bg-emerald-300/10'
                      : scanResult.status === 'warning'
                        ? 'border-amber-300/25 bg-amber-300/10'
                        : 'border-rose-300/25 bg-rose-300/10'
                  }`}
                >
                  <div className="flex items-start gap-3">
                    {scanResult.status === 'success' ? (
                      <CheckCircleIcon
                        className="mt-0.5 h-5 w-5 shrink-0 text-emerald-300"
                        aria-hidden="true"
                      />
                    ) : scanResult.status === 'warning' ? (
                      <ExclamationTriangleIcon
                        className="mt-0.5 h-5 w-5 shrink-0 text-amber-300"
                        aria-hidden="true"
                      />
                    ) : (
                      <XCircleIcon
                        className="mt-0.5 h-5 w-5 shrink-0 text-rose-300"
                        aria-hidden="true"
                      />
                    )}
                    <div className="min-w-0 flex-1">
                      <p className="font-semibold">{scanResult.title}</p>
                      <p className="mt-1 break-words text-sm text-slate-200">
                        {scanResult.message}
                      </p>
                      {scannedName && (
                        <dl className="mt-4 grid gap-2 border-t border-white/10 pt-3 text-sm sm:grid-cols-2">
                          <div>
                            <dt className="text-xs text-slate-400">Attendee</dt>
                            <dd className="mt-0.5 font-medium">
                              {scannedName}
                            </dd>
                          </div>
                          <div>
                            <dt className="text-xs text-slate-400">Email</dt>
                            <dd className="mt-0.5 break-all font-medium">
                              {latestScannedEmail}
                            </dd>
                          </div>
                          {scanResult.attendance !== undefined && (
                            <div>
                              <dt className="text-xs text-slate-400">
                                Attendance count
                              </dt>
                              <dd className="mt-0.5 font-medium">
                                {scanResult.attendance}
                              </dd>
                            </div>
                          )}
                        </dl>
                      )}
                    </div>
                  </div>
                </div>
              ) : (
                <div className="min-h-24 border-white/15 flex items-center rounded-md border border-dashed px-4 text-sm text-slate-400">
                  {scannerTab === 'EVENT' || scannerTab === 'SHOP'
                    ? selectedEvent
                      ? `Ready to scan for ${displayEventName(selectedEvent)}.`
                      : 'Choose an item, then scan an attendee.'
                    : 'Ready for the next attendee.'}
                </div>
              )}
            </div>

            <div className="mt-4 flex items-center justify-between gap-3 border-t border-white/10 pt-4 text-xs text-slate-400">
              <span>
                Scanner mode: {tabs.find((tab) => tab.id === scannerTab)?.label}
              </span>
              <button
                type="button"
                className="font-semibold text-cyan-200 hover:text-white"
                onClick={resetScanLog}
              >
                Clear result
              </button>
            </div>
          </section>
        </div>

        {scannerTab === 'USER INFO' && userInfo && (
          <section className="border-cyan-100/15 mt-5 rounded-md border bg-[#102536] p-4 shadow-xl sm:p-6">
            <div className="mb-5 border-b border-white/10 pb-4">
              <p className="text-xs font-bold uppercase tracking-[0.15em] text-cyan-300">
                03 / User information
              </p>
              <h2 className="mt-2 text-xl font-semibold">Attendee details</h2>
            </div>
            <UserInfoPanel snapshot={userInfo} />
          </section>
        )}
      </div>

      {forcePrompt && (
        <PopupDialog
          open
          setOpen={(open) => {
            if (!open) setForcePrompt(null);
          }}
          onYes={() => {
            const email = latestScannedEmail;
            setForcePrompt(null);
            void handleOnScan(email, true);
          }}
          onNo={() => {
            setStatus('warning');
            setScanResult({
              status: 'warning',
              title: 'No change made',
              message: 'The attendance override was cancelled.',
              attendance: forcePrompt.attendance ?? undefined,
            });
          }}
          tone="warning"
          confirmLabel="Force attendance"
          cancelLabel="Cancel"
          title="Attendance was rejected"
          content={forcePrompt.apiError}
          details={
            <dl className="grid grid-cols-2 gap-3 rounded-md bg-slate-50 p-3 text-sm text-slate-700">
              <div>
                <dt className="text-xs text-slate-500">Event / item</dt>
                <dd className="mt-1 font-semibold text-slate-900">
                  {forcePrompt.eventName}
                </dd>
              </div>
              <div>
                <dt className="text-xs text-slate-500">Current attendance</dt>
                <dd className="mt-1 font-semibold text-slate-900">
                  {forcePrompt.attendance ?? 'Unavailable'} /{' '}
                  {forcePrompt.limit}
                </dd>
              </div>
              <div className="col-span-2 border-t border-slate-200 pt-3 text-xs leading-5 text-slate-600">
                Forcing attendance retries the scan with the override enabled.
                The API may still reject it if the attendee does not meet the
                remaining requirements.
              </div>
            </dl>
          }
        />
      )}

      {confirmationEmail && (
        <PopupDialog
          open
          setOpen={(open) => {
            if (!open) setConfirmationEmail(null);
          }}
          onYes={() => {
            const email = confirmationEmail;
            setConfirmationEmail(null);
            void handleOnScan(email);
          }}
          onNo={() => setConfirmationEmail(null)}
          tone="neutral"
          confirmLabel="Continue scan"
          cancelLabel="Cancel"
          title="Confirm attendee"
          content="A QR code was read. Continue with this attendee?"
          details={
            <p className="break-all rounded-md bg-slate-50 p-3 text-sm font-semibold text-slate-800">
              {confirmationEmail}
            </p>
          }
        />
      )}
    </main>
  );
}

export default OrganizerView;
