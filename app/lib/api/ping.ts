'use server';

import { ENDPOINTS } from './endpoints';

// Returns true if backend API is up and running, false otherwise
export async function ping(): Promise<{ statusCode: number; response: string; error: string }> {
  const payload = { name: "Anything" }; 

  try {
    const resp = await fetch(ENDPOINTS.hello, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json', 
      },
      body: JSON.stringify(payload), 
    });

    const data = await resp.json();
    console.log('Server Response:', data);

    if (data?.statusCode == 200) {
      return {statusCode: data.statusCode, response: data.message, error:""};  
    } 

    else if (data?.message) {
      return {statusCode: data.statusCode, response: "", error:data.message}; 
    }

    else {
      return {statusCode: 400, response: "", error:"Something went wrong, no message"}; 
    }

  } catch (error) {
    console.error('Error sending request:', error);
    return {statusCode: 400, response: "", error:"Something went wrong"};  
  }
}
