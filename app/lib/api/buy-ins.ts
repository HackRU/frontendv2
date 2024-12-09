'use server';

import { ENDPOINTS } from './endpoints';

export async function GetBuyIns() {
  const resp = await fetch(ENDPOINTS.getBuyIns, { method: 'POST' });
  return resp.json();
}
