'use server';
import { auth } from "../../auth"

import { GetUser, SetUser } from "./actions"

export async function getSchedule() {
  //a fake delay to simulate a real api call
  await new Promise((resolve) => setTimeout(resolve, 1000));

  const schedule: Schedule = {
    "Saturday": {
      "day": "Saturday",
      "times": [
        { "time": "10:00 AM", "event": "Check-in starts" },
        { "time": "11:00 AM", "event": "Opening Ceremony", },
        { "time": "12:00 PM", "event": "Team Building Event" },
        { "time": "12:00 PM", "event": "Hacking Starts" },
        { "time": "12:30 PM", "event": "Lunch" },
        { "time": "1:30 PM", "event": "NJ TRANSIT API Demo" },
        { "time": "2:00 PM", "event": "Algorithms in Society Workshop by Ethitech" },
        { "time": "2:30 PM", "event": "MLH Mini Event" },
        { "time": "5:30 PM", "event": "Tech Talk by NJ TRANSIT" },
        { "time": "8:00 PM", "event": "Dinner" },

      ],
    },

    "Sunday": {
      "day": "Sunday",
      "times": [
        { "time": "12:00 AM", "event": "Midnight Surprise" },
        { "time": "8:00 AM", "event": "Breakfast", },
        // { "time": "11:00 AM", "event": "Event" },
        { "time": "12:00 PM", "event": "Submissions Due" },
        { "time": "12:30 PM", "event": "Lunch", },
        { "time": "1:00 PM", "event": "Judging Begins" },
        { "time": "3:00 PM", "event": "Judging Ends" },
        { "time": "3:30 PM", "event": "Closing Ceremony", },
        // { "time": "7:00 PM", "event": "Dinner", "reactIcon": <FaUtensils /> },
        // { "time": "9:00 PM", "event": "Venue closes" },
      ],
    }
  };

  return schedule;
}








export async function getSelf() {
  const session = await auth();

  if(session?.user && session?.user?.email){

    const resp = await GetUser(session.user.email);

    if(resp.error === ""){
      return resp.response;
    }
    return resp.error;
  }

  return  {
    error:"Something went wrong"
  }
}


export async function UpdateSelf(data:any){
  console.log(data);
  console.log("updating self");

  const session = await auth();

  if(session?.user && session?.user?.email){

    const resp = await SetUser(data, session.user.email);

    if(resp.error === ""){
      return resp.response;
    }
    return resp.error;
  }

  return  {
    error:"Something went wrong"
  }

}

export async function getUsers(){
  const Users: Record<string, object> = {"testemail@gmail.com":{"role": {
    "hacker": true,
    "volunteer": false,
    "judge": false,
    "sponsor": false,
    "mentor": false,
    "organizer": false,
    "director": false
  },
  "votes": 0,
  "github": "testgithub",
  "major": "Computer Science",
  "short_answer": "Things",
  "shirt_size": "Unisex M",
  "first_name": "Test",
  "last_name": "User",
  "dietary_restrictions": "",
  "special_needs": "No",
  "date_of_birth": "2000-01-01",
  "school": "Rutgers, The State University of New Jersey",
  "grad_year": "2026",
  "gender": "Prefer not to say",
  "registration_status": "unregistered",
  "level_of_study": "University (Undergraduate)",
  "day_of": {
    "checkIn": false
  },
  "token": [
    "faketoken"
  ],
  "country_of_residence": "US",
  "ethnicity": "Prefer not to say",
  "hackathon_count": "1",
  "phone_number": "1234567890",
  "how_you_heard_about_hackru": "Mailing List",
  "reasons": "Learn new skills"
  }};

  const Names = ["Lauryn", "Underwood",
  "Darius", "Peters",
  "Eduardo", "Eaton",
  "Jeremy", "Pitts",
  "Trevor", "Valenzuela",
  "Erica", "Mathews",
  "Valentino", "Bowman",
  "Hillary", "Hanson",
  "Kody", "Shelton",
  "Ariana", "Collins",
  "Lina", "Fitzpatrick",
  "Eve", "Flores"];

  const registration_states = ["unregistered", "registered", "confirmation", "coming", "not_coming","waitlist", "confirmed", "rejected", "checked_in", "registered"]


  for (let i = 0; i < 10; i++) {
    const Random = Math.floor(Math.random() * 23);
    const email = i.toString() + "@gmail.com";
    Users[email] = {"role": {
      "hacker": true,
      "volunteer": false,
      "judge": false,
      "sponsor": false,
      "mentor": false,
      "organizer": false,
      "director": false
    },
    "votes": 0,
    "github": Names[Random] + "_Github",
    "major": "Computer Science",
    "short_answer": "Things",
    "shirt_size": "Unisex M",
    "first_name": Names[Random],
    "last_name": Names[Random+1],
    "dietary_restrictions": "",
    "special_needs": "No",
    "date_of_birth": "20"+ Random.toString() +"-01-" + Random.toString(),
    "school": "Rutgers, The State University of New Jersey",
    "grad_year": "20" + (Random + 20).toString() ,
    "gender": "Prefer not to say",
    "registration_status": registration_states[i%10],
    "level_of_study": "University (Undergraduate)",
    "day_of": {
      "checkIn": false
    },
    "token": [
      "faketoken"
    ],
    "country_of_residence": "US",
    "ethnicity": "Prefer not to say",
    "hackathon_count": "1",
    "phone_number": "1234567890",
    "how_you_heard_about_hackru": "Mailing List",
    "reasons": "Learn new skills"
    };
  }

  return Users;
 

}


export async function UpdateUser(){
  //double check that the whoever is logged in and is sending this request is an admin 
  console.log("updaing a user");
}

