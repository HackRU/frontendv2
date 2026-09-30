import teamData from './team.json';
import Image from 'next/image';
import { fredoka } from '@/app/ui/fonts';

type TeamMember = {
  name: string;
  image: string;
  link: string;
};

type Team = {
  director: TeamMember;
  organizers: TeamMember[];
};

type TeamData = {
  teams: Record<string, Team>;
};

const data = teamData as TeamData;

const TeamCard = ({ member, role }: { member: TeamMember; role: string }) => {
  return (
    <a
      href={member.link}
      target="_blank"
      rel="noopener noreferrer"
      className="border-s2025black-100/15 bg-white/45 hover:bg-white/65 group flex w-48 flex-col items-center rounded-3xl border-2 p-6 shadow-sm transition-all duration-300 hover:-translate-y-2"
    >
      <div className="relative mb-4 h-28 w-28 overflow-hidden rounded-full border-2 border-s2025black-100/20 transition-all duration-300 group-hover:border-s2025black-100/40">
        <Image
          src={member.image}
          alt={member.name}
          fill
          className="object-cover"
        />
      </div>

      <h3 className="text-center text-lg font-bold text-s2025black-100">
        {member.name}
      </h3>

      <p className="mt-1 text-center text-sm font-medium text-s2025black-100/70">
        {role}
      </p>

      <p className="mt-3 text-xs font-medium text-s2025black-100/60 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
        LinkedIn →
      </p>
    </a>
  );
};

const TeamSectionHeader = () => {
  return (
    <div className="relative z-20 -mb-[56px] -mt-[68px] flex items-center justify-center p-4 md:-mb-[112px] md:-mt-[135px]">
      <Image
        src="/landing/F2026/ribbon-blue.png"
        width={700}
        height={700}
        className="w-[58vw] max-w-[240px] md:w-[480px] md:max-w-none"
        alt=""
        aria-hidden="true"
        quality={60}
      />

      <p
        className={`${fredoka.className} absolute inset-0 z-10 flex items-center justify-center px-[20%] text-[clamp(17px,2.9vw,40px)] font-bold leading-none tracking-[-0.02em] text-[#FBE8E9]`}
        style={{ paddingBottom: '3%' }}
      >
        MEET THE TEAM
      </p>
    </div>
  );
};

export default function TeamPage() {
  const teams = Object.entries(data.teams);

  return (
    <main
      className={`f2026-landing-page min-h-screen ${fredoka.className} text-s2025black-100`}
      style={{
        backgroundColor: '#C4D4A2',
        backgroundImage:
          'radial-gradient(75% 45% at 50% 38%, rgba(247,250,178,0.95) 0%, rgba(233,240,164,0.35) 45%, rgba(233,240,164,0) 75%)',
        backgroundSize: '100% 100vh',
        backgroundRepeat: 'repeat-y',
      }}
    >
      <div className="pt-[135px]">
        <TeamSectionHeader />
      </div>

      <div className="mx-auto max-w-7xl px-6 pb-20 pt-12">
        <p className="mx-auto mb-14 max-w-2xl text-center text-base font-medium text-s2025black-100/70 sm:text-lg">
          Meet the people who make HackRU happen.
        </p>

        <section className="mb-20">
          <h2 className="mb-10 text-center text-3xl font-bold">Directors</h2>

          <div className="flex flex-wrap justify-center gap-6">
            {teams.map(([teamName, team]) => (
              <TeamCard
                key={teamName}
                member={team.director}
                role={`${teamName} Director`}
              />
            ))}
          </div>
        </section>

        <section>
          <h2 className="mb-12 text-center text-3xl font-bold">Organizers</h2>

          <div className="space-y-16">
            {teams.map(([teamName, team]) => (
              <div key={teamName}>
                <div className="mb-8 flex items-center gap-5">
                  <div className="bg-s2025black-100/15 h-0.5 flex-1 rounded-full" />

                  <h3 className="text-2xl font-bold">{teamName}</h3>

                  <div className="bg-s2025black-100/15 h-0.5 flex-1 rounded-full" />
                </div>

                <div className="flex flex-wrap justify-center gap-6">
                  {team.organizers.map((organizer) => (
                    <TeamCard
                      key={organizer.name}
                      member={organizer}
                      role={teamName}
                    />
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>
    </main>
  );
}
