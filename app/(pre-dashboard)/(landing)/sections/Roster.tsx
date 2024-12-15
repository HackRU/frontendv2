import React from 'react';

type Member = {
  name: string;
};

type Team = {
  title: string;
  members: Member[];
};

type SemesterRoster = {
  semester: string;
  teams: Team[];
};

const parseRosterData = (input: string): SemesterRoster[] => {
  const semesters = input.split(/\n(?=Semester: )/g).filter(Boolean);
  return semesters.map((semesterText) => {
    const [semesterLine, ...teamLines] = semesterText.trim().split('\n');
    const semester = semesterLine.replace('Semester: ', '').trim();

    const teams = teamLines
      .join('\n')
      .split(/\n(?=Team: )/g)
      .filter(Boolean)
      .map((teamText) => {
        const [teamLine, ...memberLines] = teamText.trim().split('\n');
        const title = teamLine.replace('Team: ', '').trim();

        const members = memberLines
          .map((line) => ({ name: line.replace(/^\s*-\s*/, '').trim() }))
          .filter(Boolean);

        return { title, members };
      });

    return { semester, teams };
  });
};

const rosterText = `
Semester: Fall 2024
Team: Executive Directors
  - Rushd Syed '25
  - Shivam Kajaria '25
Team: Logistics
Team: Marketing
Team: Day-of
Team: Design
Team: Finance
Team: RnD
  - Kevin Monisit '25 | Director
  - Andrew Somers '26 | Frontend Lead
  - Ethan Nyugen '25 | Backend Lead
  - Ayoob Florival
  - Rishab
  - Sana Naik
  - Yogesh Sampathkumar
  - Eshaan
`;

const rosterData = parseRosterData(rosterText);

const TeamRoster = () => {
  return (
    <div className="mt-8 w-full max-w-3xl px-4">
      <h2 className="mb-8 text-center text-3xl font-bold">Our Team</h2>
      {rosterData.map((semester) => (
        <div key={semester.semester} className="mb-8 text-center">
          <h3 className="mb-4 text-xl font-semibold text-teal-500">
            {semester.semester}
          </h3>
          {semester.teams.map((team) => (
            <div key={team.title} className="mb-6">
              <p className="text-lg font-bold">{team.title}:</p>
              <ul className="mt-2 space-y-1 pl-4">
                {team.members.length > 0 ? (
                  team.members.map((member, index) => (
                    <li key={index} className="text-gray-400">
                      {member.name}
                    </li>
                  ))
                ) : (
                  <li className="text-gray-500">No members listed</li>
                )}
              </ul>
            </div>
          ))}
        </div>
      ))}
    </div>
  );
};

export default TeamRoster;
