import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { teamMembers } from './TeamData';

const TeamProfile = (member: {
  link: string;
  image: string;
  name: string;

  position: string;
}) => {
  return (
    <Link
      href={member.link}
      target="_blank"
      rel="noopener noreferrer"
      className="group flex scale-100 flex-col items-center transition-transform duration-300 hover:scale-105 hover:transform"
      style={{ marginLeft: 0 }}
    >
      <div className="relative m-4 h-32 w-32">
        <img
          src="https://cataas.com/cat"
          alt={member.name}
          className="h-32 w-32 rounded-full border-2 border-blue-300 object-cover transition-colors duration-300 group-hover:border-blue-400"
        />
      </div>
      <h3 className="text-center text-base font-semibold text-blue-200">
        {member.name}
      </h3>
      <p className="text-center text-xs text-white">{member.position}</p>
    </Link>
  );
};

const Team = () => {
  return (
    <div className="w-full px-4 py-8">
      <div className="mx-auto max-w-7xl space-y-5">
        <div className="flex flex-wrap justify-center sm:space-x-20">
          {teamMembers.slice(0, 2).map((member, index) => (
            <TeamProfile {...member} key={index} />
          ))}
        </div>

        <div className="flex flex-wrap justify-center sm:space-x-20">
          {teamMembers.slice(2).map((member, index) => (
            <TeamProfile {...member} key={index} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Team;
