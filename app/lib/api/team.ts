'use server';

import { ENDPOINTS } from './endpoints';

export async function AttendEventScan(scannedEmail: string, event: string) {
  const body = { scannedEmail, event };

  const resp = await fetch(ENDPOINTS.attend, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
  });

  const resJSON = await resp.json();
  return resJSON;
}
