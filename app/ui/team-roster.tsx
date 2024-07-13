import React from 'react';

interface TeamRosterProps {
  names: string[];
  descriptions: string[];
  images: string[];
}

const TeamRoster: React.FC<TeamRosterProps> = ({ names, descriptions, images }) => {
  return (
    <div className="relative z-10 mb-20 flex w-[100vw] justify-center">
      <div className="flex flex-wrap justify-center">
        {names.map((name, index) => (
          <div key={index} className="w-full md:w-1/3 p-4 flex flex-col items-center">
            <div className="">
              <img src={images[index]} alt="Team Member" className="rounded-3xl" />
            </div>
            <div style={{ zIndex: 1 }} className="text-center">
              <h3 className="text-2xl font-bold">{name}</h3>
              <p>{descriptions[index]}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default TeamRoster;
