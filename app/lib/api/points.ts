'use server';

import { ENDPOINTS } from './endpoints';

export async function GetPoints() {
  const resp = await fetch(ENDPOINTS.points, { method: 'POST' });
  return resp.json();
}
