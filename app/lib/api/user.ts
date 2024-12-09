'use server';

import { auth } from '@/auth';
import { ENDPOINTS } from './endpoints';

export async function GetUser(email: string) {
  const session = await auth();
  if (!session?.user) return { error: 'Please log in', response: '' };

  const resp = await fetch(ENDPOINTS.userData, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      auth_email: session.user.email,
      auth_token: session.user.name,
      email,
    }),
  });

  const resJSON = await resp.json();
  if (resp.status === 200) return { error: '', response: resJSON };
  return { error: resJSON, response: '' };
}
