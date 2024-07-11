import React from 'react';

export default function Team() {

  const name = ["Team Member", "Team Member", "Team Member", "Team Member"];
  const description = ["A short description of the team member", "A short description of the team member", "A short description of the team member",  "A short description of the team member"];
  const image = ["https://wallpapers-clan.com/wp-content/uploads/2022/06/one-piece-monkey-d-luffy-pfp-3.jpg", "https://wallpapers-clan.com/wp-content/uploads/2022/06/one-piece-monkey-d-luffy-pfp-3.jpg", "https://wallpapers-clan.com/wp-content/uploads/2022/06/one-piece-monkey-d-luffy-pfp-3.jpg", "https://wallpapers-clan.com/wp-content/uploads/2022/06/one-piece-monkey-d-luffy-pfp-3.jpg"];

  return (
    <div className="relative z-10 mb-20 flex w-[100vw] justify-center"> 
      <div className="flex flex-wrap justify-center">
        {name.map((name, index) => {
          return (
            <div key={index} className="w-full md:w-1/3 p-4 flex flex-col items-center">
              <div className="">
                <img src={image[index]} alt="Team Member" className="rounded-3xl" />
              </div>
              <div style={{ zIndex: 1 }} className="text-center">
                <h3 className="text-2xl font-bold">{name}</h3>
                <p>{description[index]}</p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
