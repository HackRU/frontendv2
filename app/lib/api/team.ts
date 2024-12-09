'use server';

import { ENDPOINTS } from './endpoints';

export async function UploadTeamSubmission(leaderEmail: string, data: any) {
  const postBody = {
    team_leader: leaderEmail,
    team_members: data.team_members.filter(Boolean),
  };

  const resp = await fetch(ENDPOINTS.makeTeam, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(postBody),
  });

  if (resp.status !== 200) return { error: 'Non 200 response', response: '' };

  const json = await resp.json();
  if (json.error) {
    return { error: json.error, response: '' };
  }

  return { error: '', response: 'Successfully submitted team!' };
}
