import TeamRoster from '@/app/ui/team-roster';
import React from 'react';

export default function Team() {
  const names = ["Team Member 1", "Team Member 2", "Team Member 3", "Team Member 4"];
  const descriptions = [
    "A short description of the team member. 1",
    "A short description of the team member. 2",
    "A short description of the team member. 3",
    "A short description of the team member. 4"
  ];
  const images = [
    "https://wallpapers-clan.com/wp-content/uploads/2022/06/one-piece-monkey-d-luffy-pfp-3.jpg",
    "https://wallpapers-clan.com/wp-content/uploads/2022/06/one-piece-monkey-d-luffy-pfp-3.jpg",
    "https://wallpapers-clan.com/wp-content/uploads/2022/06/one-piece-monkey-d-luffy-pfp-3.jpg",
    "https://wallpapers-clan.com/wp-content/uploads/2022/06/one-piece-monkey-d-luffy-pfp-3.jpg"
  ];

  return <TeamRoster names={names} descriptions={descriptions} images={images} />;
}
