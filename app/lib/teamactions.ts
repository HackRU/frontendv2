'use server';
import { unstable_noStore as noStore } from 'next/cache';


import { auth } from '../../auth';

import { BASE } from './definitions';

const BASEteam = BASE + "/team"


const ENDPOINTS = {
readTeam: BASEteam + '/read-confirmed',
readPendingInvites: BASEteam + '/read-invites',
createTeam: BASEteam + '/create',
removeMember: BASEteam + '/team-member-removal',
inviteMember: BASEteam + '/invite',
acceptInvite: BASEteam + '/join',
declineInvite: BASEteam + '/decline-invite',
disbandTeam: BASEteam + '/disband',
leaveTeam: BASEteam + '/leave',
};

export async function CreateTeam(email: string, team_name:string, members: string[]) {
  noStore();
  let resp = {
    error: '',
    response: '',
    team_id: ''
  };

  const session = await auth();
  if (session?.user) {
    await fetch(ENDPOINTS.createTeam, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        auth_email: session.user.email,
        auth_token: session.user.name,
        team_name: team_name, 
        members: members
      }),
    }).then(async (res) => {
      let resJSON = await res.json();
      if (res.status !== 200) {
        resp.error = resJSON.message;
      } else {
        resp.response = resJSON;
        resp.team_id = resJSON.team_id;
      }
    });
  } else {
    resp.error = 'Unknown error';
  }
  console.log(resp);
  return resp;
}

export async function InviteMember(email: string, team_id:string, invites: string[]) {
  noStore();
  let resp = {
    error: '',
    response: '',
  };

  const session = await auth();
  if (session?.user) {
    await fetch(ENDPOINTS.inviteMember, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        auth_email: session.user.email,
        auth_token: session.user.name,
        team_id: team_id,
        emails: invites,
      }),
    }).then(async (res) => {
      let resJSON = await res.json();
      if (res.status !== 200) {
        resp.error = resJSON.message;
      } else {
        resp.response = resJSON;
      }
    });
  } else {
    resp.error = 'Unknown error';
  }
  console.log(resp);
  return resp;
}

export async function InviteAccept(email: string, team_id: string) {
  noStore();
  let resp = {
    error: '',
    response: '',
  };

  const session = await auth();
  if (session?.user) {
    await fetch(ENDPOINTS.acceptInvite, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        team_id: team_id,
        auth_email: session.user.email,
        auth_token: session.user.name,
      }),
    }).then(async (res) => {
      let resJSON = await res.json();
      if (res.status !== 200) {
        resp.error = resJSON.message;
      } else {
        resp.response = resJSON;
      }
    });
  } else {
    resp.error = 'Unknown error';
  }
  console.log(resp);
  return resp;
}

export async function InviteDecline(email: string, team_id:string) {
  noStore();
  let resp = {
    error: '',
    response: '',
  };

  const session = await auth();
  if (session?.user) {
    await fetch(ENDPOINTS.declineInvite, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        team_id: team_id,
        auth_email: session.user.email,
        auth_token: session.user.name,
      }),
    }).then(async (res) => {
      let resJSON = await res.json();
      if (res.status !== 200) {
        resp.error = resJSON.message;
      } else {
        resp.response = resJSON;
      }
    });
  } else {
    resp.error = 'Unknown error';
  }
  console.log(resp);
  return resp;
}

export async function LeaveTeam(email: string, team_id:string) {
  noStore();
  let resp = {
    error: '',
    response: '',
  };

  const session = await auth();
  if (session?.user) {
    await fetch(ENDPOINTS.leaveTeam, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        team_id: team_id,
        auth_email: session.user.email,
        auth_token: session.user.name,
      }),
    }).then(async (res) => {
      let resJSON = await res.json();
      if (res.status !== 200) {
        resp.error = resJSON.message;
      } else {
        resp.response = resJSON;
      }
    });
  } else {
    resp.error = 'Unknown error';
  }
  console.log(resp);
  return resp;
}

export async function TeamDisband(email: string, team_id:string) {
  noStore();
  let resp = {
    error: '',
    response: '',
  };

  const session = await auth();
  if (session?.user) {
    await fetch(ENDPOINTS.disbandTeam, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        team_id: team_id,
        auth_email: session.user.email,
        auth_token: session.user.name,
      }),
    }).then(async (res) => {
      let resJSON = await res.json();
      if (res.status !== 200) {
        resp.error = resJSON.message;
      } else {
        resp.response = resJSON;
      }
    });
  } else {
    resp.error = 'Unknown error';
  }
  console.log(resp);
  return resp;
}

export async function RemoveMember(emails: string[], team_id:string) {
  noStore();
  let resp = {
    error: '',
    response: '',
  };

  const session = await auth();
  if (session?.user) {
    await fetch(ENDPOINTS.removeMember, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        team_id: team_id,
        auth_email: session.user.email,
        auth_token: session.user.name,
        email: emails
      }),
    }).then(async (res) => {
      let resJSON = await res.json();
      if (res.status !== 200) {
        resp.error = resJSON.message;
      } else {
        resp.response = resJSON;
      }
    });
  } else {
    resp.error = 'Unknown error';
  }
  console.log(resp);
  return resp;
}

export async function ReadConfirmed() {
  noStore();
  let resp = {
    error: '',
    response: '',
  };

  const session = await auth();
  if (session?.user) {
    await fetch(ENDPOINTS.readTeam, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        auth_email: session.user.email,
        auth_token: session.user.name,
      }),
    }).then(async (res) => {
      let resJSON = await res.json();
      if (res.status !== 200) {
        resp.error = resJSON.message;
      } else {
        resp.response = resJSON;
      }
    });
  } else {
    resp.error = 'Unknown error';
  }
  console.log(resp);
  return resp;
}

export async function ReadPending() {
  noStore();
  let resp = {
    error: '',
    response: '',
  };

  const session = await auth();
  if (session?.user) {
    await fetch(ENDPOINTS.readPendingInvites, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        auth_email: session.user.email,
        auth_token: session.user.name,
      }),
    }).then(async (res) => {
      let resJSON = await res.json();
      if (res.status !== 200) {
        resp.error = resJSON.message;
      } else {
        resp.response = resJSON;
      }
    });
  } else {
    resp.error = 'Unknown error';
  }
  console.log(resp);
  return resp;
}
