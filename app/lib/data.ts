'use server';
import { unstable_noStore } from 'next/cache';
import { auth } from '../../auth';

import { GetUser, SetUser } from './actions';
import { BASE } from './definitions';

export async function getSchedule() {
  const schedule: Schedule = {
    Saturday: {
      day: 'Saturday',
      times: [
        {
          time: '10:00 AM',
          event: 'Check-in Starts',
          location: 'Center Lobby',
        },
        {
          time: '11:00 AM',
          event: 'Opening Ceremony',
          location: 'Hacking Area',
        },
        { time: '12:00 PM', event: 'Team Building', location: 'Hacking Area' },
        { time: '12:00 PM', event: 'Hacking Starts', location: 'Hacking Area' },
        { time: '1:00 PM', event: 'Lunch', location: 'In Front of MPR' },
        {
          time: '2:00 PM',
          event: 'Wakefern Tech Talk',
          location: 'Room 120',
        },
        { time: '2:30 PM', event: 'Wakefern API Demo', location: 'Room 122' },
        { time: '3:00 PM', event: 'iCIMS Tech Talk', location: 'Room 120' },
        { time: '3:30 PM', event: 'RUSA Workshop', location: 'Room 122' },
        { time: '3:30 PM', event: 'USACS Workshop', location: 'Room 120' },
        {
          time: '4:30 PM',
          event: 'Cloudflare Tech Talk',
          location: 'Room 122',
        },
        { time: '5:00 PM', event: 'MLH Mini Event', location: 'Room 120' },
        {
          time: '6:30 PM',
          event: 'MLH Copilot Workshop',
          location: 'Room 120',
        },
        { time: '7:30 PM', event: 'RUCP Workshop', location: 'Room 117' },
        { time: '8:30 PM', event: 'Dinner', location: 'In Front of MPR' },
      ],
    },

    Sunday: {
      day: 'Sunday',
      times: [
        {
          time: '12:00 AM',
          event: 'Midnight Surprise',
          location: 'Hacking Area',
        },
        { time: '8:00 AM', event: 'Breakfast', location: 'In Front of MPR' },
        {
          time: '12:00 PM',
          event: 'Submissions Due',
          location: 'Hacking Area',
        },
        { time: '12:30 PM', event: 'Lunch', location: 'In Front of MPR' },
        { time: '1:00 PM', event: 'Judging Begins', location: 'Hacking Area' },
        { time: '3:00 PM', event: 'Judging Ends', location: 'Hacking Area' },
        {
          time: '3:30 PM',
          event: 'Closing Ceremony',
          location: 'Hacking Area',
        },
      ],
    },
  };

  return schedule;
}

export async function getSponsors(): Promise<string[]> {
  const res = await fetch(BASE + '/sponsors');
  const sponsors = await res.json();

  if (!sponsors || !sponsors['photos']) {
    return [
      'cloudflare.jpeg',
      'icims.png',
      'wakefern.png',
      'RU-climate-action.png',
    ];
  }

  return sponsors['photos'].map((url: any) => url);
}

interface LeaderboardEntry {
  place: string;
  points: number;
  house: string;
  logo: string;
}
export async function getLeaderboard() {
  const baseUrl = BASE || 'https://api.hackru.org/dev';

  unstable_noStore();

  try {
    const res = await fetch(`${baseUrl}/leaderboard`, {
      cache: 'no-store',
    });

    if (!res.ok) {
      throw new Error(`Failed to fetch: ${res.status}`);
    }

    const leaderboardData = await res.json();

    return leaderboardData;
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.error('Error fetching leaderboard:', error.message);
    }
    return null;
  }
}

export async function getSelf(): Promise<{
  error: any;
  response: Record<string, any>;
}> {
  const session = await auth();

  if (session?.user && session?.user?.email) {
    const resp = await GetUser(session.user.email);

    //console.log(resp)


    if (resp.error === '') {
      return {
        response: resp.response as unknown as Record<any, any>,
        error: '',
      };
    }
    else if (resp.error){
      return {
        error: resp.error ,
        response: {},
      }
    }
  }

  return {
    error: 'Something went wrong',
    response: {},
  };
}

export async function UpdateSelf(data: any): Promise<string> {
  const session = await auth();

  if (session?.user && session?.user?.email) {
    const resp = await SetUser(data, session.user.email);

    if (resp.error === '') {
      return resp.response;
    }
  }

  return 'Something went wrong';
}

export async function RegisterSelf() {
  const session = await auth();
  console.log('Register Self');
  if (session?.user && session?.user?.email) {
    const resp = await SetUser(
      { registration_status: 'registered' },
      session.user.email,
    );

    if (resp.error === '') {
      return resp.response;
    }
    return resp.error;
  }

  return 'Something went wrong';
}

export async function OptInSelf(stat:boolean) {
  const session = await auth();
  console.log('Register Self');
  if (session?.user && session?.user?.email) {
    const resp = await SetUser(
      { opt_in:  stat},
      session.user.email,
    );

    if (resp.error === '') {
      return "GOOD";
    }
    return resp.error;
  }

  return 'Something went wrong';
}

export async function ConfirmComingOrNot(isComing: boolean): Promise<{
  error: string | undefined;
  response: Record<string, any>;
}> {
  const session = await auth();
  const status = isComing ? 'coming' : 'not_coming';
  let error = undefined;

  if (session?.user && session?.user?.email) {
    const resp = await SetUser(
      { registration_status: status },
      session.user.email,
    );

    if (resp.error === '') {
      return {
        response: resp.response as unknown as Record<any, any>,
        error: '',
      };
    }

    error = resp.error;
  }

  return {
    error: error,
    response: {},
  };
}

export async function getUsers() {
  const Users: Record<string, object> = {
    'testemail@gmail.com': {
      role: {
        hacker: true,
        volunteer: false,
        judge: false,
        sponsor: false,
        mentor: false,
        organizer: false,
        director: false,
      },
      votes: 0,
      github: 'testgithub',
      major: 'Computer Science',
      short_answer: 'Things',
      shirt_size: 'Unisex M',
      first_name: 'Test',
      last_name: 'User',
      dietary_restrictions: '',
      special_needs: 'No',
      date_of_birth: '2000-01-01',
      school: 'Rutgers, The State University of New Jersey',
      grad_year: '2026',
      gender: 'Prefer not to say',
      registration_status: 'unregistered',
      level_of_study: 'University (Undergraduate)',
      day_of: {
        checkIn: false,
      },
      token: ['faketoken'],
      country_of_residence: 'US',
      ethnicity: 'Prefer not to say',
      hackathon_count: '1',
      phone_number: '1234567890',
      how_you_heard_about_hackru: 'Mailing List',
      reasons: 'Learn new skills',
    },
  };

  const Names = [
    'Lauryn',
    'Underwood',
    'Darius',
    'Peters',
    'Eduardo',
    'Eaton',
    'Jeremy',
    'Pitts',
    'Trevor',
    'Valenzuela',
    'Erica',
    'Mathews',
    'Valentino',
    'Bowman',
    'Hillary',
    'Hanson',
    'Kody',
    'Shelton',
    'Ariana',
    'Collins',
    'Lina',
    'Fitzpatrick',
    'Eve',
    'Flores',
  ];

  const registration_states = [
    'unregistered',
    'registered',
    'confirmation',
    'coming',
    'not_coming',
    'waitlist',
    'confirmed',
    'rejected',
    'checked_in',
    'registered',
  ];

  for (let i = 0; i < 100; i++) {
    const Random = Math.floor(Math.random() * 23);
    const email = i.toString() + '@gmail.com';
    Users[email] = {
      role: {
        hacker: true,
        volunteer: false,
        judge: false,
        sponsor: false,
        mentor: false,
        organizer: false,
        director: false,
      },
      votes: 0,
      github: Names[Random] + '_Github',
      major: 'Computer Science',
      short_answer: 'Things',
      shirt_size: 'Unisex M',
      first_name: Names[Random],
      last_name: Names[Random + 1],
      dietary_restrictions: '',
      special_needs: 'No',
      date_of_birth: '20' + Random.toString() + '-01-' + Random.toString(),
      school: 'Rutgers, The State University of New Jersey',
      grad_year: '20' + (Random + 20).toString(),
      gender: 'Prefer not to say',
      registration_status: registration_states[i % 10],
      level_of_study: 'University (Undergraduate)',
      day_of: {
        checkIn: false,
      },
      token: ['faketoken'],
      country_of_residence: 'US',
      ethnicity: 'Prefer not to say',
      hackathon_count: '1',
      phone_number: '1234567890',
      how_you_heard_about_hackru: 'Mailing List',
      reasons: 'Learn new skills',
    };
  }

  return Users;
}

export async function UpdateUser() {
  //double check that the whoever is logged in and is sending this request is an admin
  console.log('updaing a user');
}
