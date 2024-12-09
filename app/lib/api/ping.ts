'use server';

import { ENDPOINTS } from './endpoints';

// Returns true if backend API is up and running, false otherwise
export async function ping(): Promise<boolean> {
  const payload = { name: "Anything" }; 

  try {
    const resp = await fetch(ENDPOINTS.hello, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json', 
      },
      body: JSON.stringify(payload), 
    });

    if (!resp.ok) {
      return false; // Return false if the response status is not OK
    }

    const data = await resp.json();
    console.log('Server Response:', data);

    // Check if the message contains the expected greeting
    if (data.message && data.message.includes("Hello Anything")) {
      return true;  // Return true if the response is valid
    } else {
        return false;  // Return false if the response is unexpected
    }
  } catch (error) {
    console.error('Error sending request:', error);
    return false;  // Return false if an error occurs
  }
}
