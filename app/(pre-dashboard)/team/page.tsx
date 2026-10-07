import teamData from './team.json';
import Image from 'next/image';
import { fredoka } from '@/app/ui/fonts';

type TeamMember = {
  name: string;
  image: string;
  major: string;
  grad: string;
  link: string;
};

type Team = {
  directors: TeamMember[];
  organizers: TeamMember[];
};

type TeamData = {
  executiveDirectors: TeamMember[];
  teams: Record<string, Team>;
};

const data = teamData as TeamData;
const subteamOrder = [
  'Research & Development',
  'Logistics',
  'Day Of',
  'Finance',
  'Design',
  'Marketing',
];

const TeamCard = ({
  member,
  role,
  subteam,
}: {
  member: TeamMember;
  role: string;
  subteam: string;
}) => {
  const initials = member.name
    .split(/\s+/)
    .map((part) => part[0])
    .join('')
    .slice(0, 2);
  const imageSrc = member.image ? `/team/${member.image}` : null;

  return (
    <article className="group relative flex min-h-[300px] w-full max-w-[260px] flex-col items-center rounded-[28px] border-2 border-[#31543A]/20 bg-[#F7F3D5]/95 p-6 text-center shadow-[0_12px_28px_rgba(44,67,35,0.13)] transition duration-300 hover:-translate-y-1.5 hover:border-[#31543A]/40 hover:bg-[#FFFBE8] hover:shadow-[0_20px_36px_rgba(44,67,35,0.2)]">
      <div className="relative mb-4 mt-1 h-28 w-28 shrink-0 overflow-hidden rounded-full border-[3px] border-[#4C855A]/60 bg-white shadow-[0_5px_14px_rgba(44,67,35,0.16)] transition duration-300 group-hover:scale-[1.03] group-hover:border-[#D96D5D]">
        {!imageSrc ? (
          <span
            aria-hidden="true"
            className="flex h-full w-full items-center justify-center bg-[#315E3E] text-3xl font-bold text-[#FFFBE8]"
          >
            {initials}
          </span>
        ) : (
          <Image
            src={imageSrc}
            alt={member.name}
            fill
            className="object-cover"
            sizes="112px"
            unoptimized
          />
        )}
      </div>

      <h3 className="text-balance w-full min-w-0 break-words text-2xl font-bold leading-tight text-[#213B2C]">
        {member.name}
      </h3>

      <p className="mt-2 text-sm font-bold uppercase text-[#A44737]">{role}</p>

      <p className="mt-3 max-w-full whitespace-normal break-words rounded-full bg-[#315E3E] px-3 py-1.5 text-sm font-semibold text-[#FFFBE8] shadow-sm">
        {subteam}
      </p>
      <p className="mt-3 w-full min-w-0 whitespace-normal break-words text-sm font-medium leading-snug text-[#3F5140]">
        {member.major}, {member.grad}
      </p>

      <a
        href={member.link}
        target="_blank"
        rel="noopener noreferrer"
        className="min-h-11 mt-auto inline-flex items-center pt-4 text-sm font-bold text-[#A44737] underline decoration-[#A44737]/50 underline-offset-4 opacity-100 transition duration-200 hover:decoration-[#A44737] focus-visible:rounded-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#315E3E] [@media(hover:hover)]:opacity-0 [@media(hover:hover)]:group-focus-within:opacity-100 [@media(hover:hover)]:group-hover:opacity-100"
        aria-label={`${member.name} on LinkedIn (opens in a new tab)`}
      >
        LinkedIn{' '}
        <span
          aria-hidden="true"
          className="ml-1"
        >
          ↗
        </span>
      </a>
    </article>
  );
};

const ProfileGroup = ({
  title,
  members,
  role,
  subteam,
}: {
  title: string;
  members: TeamMember[];
  role: string;
  subteam: string;
}) => {
  if (members.length === 0) return null;

  return (
    <div>
      <div className="mb-6 flex items-center gap-4">
        <div className="h-px flex-1 bg-s2025black-100/20" />
        <h3 className="text-center text-xl font-bold sm:text-2xl">{title}</h3>
        <div className="h-px flex-1 bg-s2025black-100/20" />
      </div>
      <div className="flex flex-wrap justify-center gap-6">
        {members.map((member) => (
          <TeamCard
            key={`${member.name}-${member.link}`}
            member={member}
            role={role}
            subteam={subteam}
          />
        ))}
      </div>
    </div>
  );
};

const TeamSectionHeader = () => {
  return (
    <header className="flex flex-col items-center px-5 pb-2 pt-32 text-center sm:pt-36">
      <div className="mb-5 flex items-center gap-3 text-xs font-bold uppercase text-[#A44737] sm:text-sm">
        <span
          aria-hidden="true"
          className="h-px w-8 bg-[#A44737]/60 sm:w-12"
        />
        Our Team
        <span
          aria-hidden="true"
          className="h-px w-8 bg-[#A44737]/60 sm:w-12"
        />
      </div>

      <h1
        className={`${fredoka.className} text-4xl font-bold leading-[1.05] text-[#213B2C] sm:text-6xl`}
      >
        The people behind
        <span className="block text-[#A44737]">HackRU</span>
      </h1>

      <p className="text-[#29452F]/85 mx-auto mt-5 max-w-xl text-lg font-medium leading-relaxed sm:text-xl">
        Meet the directors and organizers that make HackRU happen.
      </p>
    </header>
  );
};

export default function TeamPage() {
  const teams = subteamOrder.map((name) => ({
    name,
    label: name,
    ...data.teams[name],
  }));
  const directors = [
    ...data.executiveDirectors.map((member) => ({
      member,
      role: 'Director',
      subteam: 'Executive',
    })),
    ...teams.flatMap((team) =>
      team.directors.map((member) => ({
        member,
        role: 'Director',
        subteam: team.label,
      })),
    ),
  ];
  const hasProfiles =
    data.executiveDirectors.length > 0 ||
    teams.some(
      (team) => team.directors.length > 0 || team.organizers.length > 0,
    );

  return (
    <main
      className={`f2026-landing-page min-h-screen ${fredoka.className} text-s2025black-100`}
      style={{
        backgroundColor: '#A9C56F',
        backgroundImage:
          'radial-gradient(72% 42% at 50% 28%, rgba(255,239,132,0.92) 0%, rgba(224,231,113,0.46) 46%, rgba(183,207,105,0) 78%)',
        backgroundSize: '100% 100vh',
        backgroundRepeat: 'repeat-y',
      }}
    >
      <TeamSectionHeader />

      <div className="mx-auto max-w-7xl px-5 pb-24 pt-12 sm:px-8 sm:pt-14">
        {!hasProfiles && (
          <p className="mb-14 text-center text-base font-medium text-s2025black-100/70">
            Team profiles are being added soon.
          </p>
        )}

        <section
          aria-labelledby="directors-heading"
          className="mb-24"
        >
          <h2
            id="directors-heading"
            className="mb-10 text-center text-3xl font-bold text-[#213B2C] sm:text-4xl"
          >
            Directors
          </h2>

          <div className="flex flex-wrap justify-center gap-6">
            {directors.map(({ member, role, subteam }) => (
              <TeamCard
                key={`${member.name}-${subteam}-${role}`}
                member={member}
                role={role}
                subteam={subteam}
              />
            ))}
          </div>
        </section>

        <section aria-labelledby="organizers-heading">
          <h2
            id="organizers-heading"
            className="mb-10 text-center text-3xl font-bold text-[#213B2C] sm:text-4xl"
          >
            Organizers
          </h2>

          <div className="space-y-12">
            {teams.map((team) => (
              <ProfileGroup
                key={team.name}
                title={team.label}
                members={team.organizers}
                role="Organizer"
                subteam={team.label}
              />
            ))}
          </div>
        </section>
      </div>
    </main>
  );
}
