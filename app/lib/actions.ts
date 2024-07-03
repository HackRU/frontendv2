'use server';
import { unstable_noStore as noStore } from 'next/cache';

import { z } from 'zod';
import { signIn, signOut } from '@/auth';
import { AuthError } from 'next-auth';

import { auth } from '../../auth';

import { redirect } from 'next/navigation';
import { BASE, DISCORD_CLIENT_ID, DISCORD_REDIRECT_URI } from './definitions';
import { TeamSubmit } from '../dashboard/page';

const ENDPOINTS = {
  login: BASE + '/authorize',
  /**
   * Default signup url, expects
   */
  signup: BASE + '/create',
  /**
   * Default logout url, expects
   */
  userData: BASE + '/read',
  /**
   * Default user update information, expects
   */
  update: BASE + '/update',
  /**
   * Create forgot magic link to reset password
   */
  forgot: BASE + '/createmagiclink',
  /**
   * Reset password from magic link to reset password
   */
  resetpassword: BASE + '/consume',
  /**
   * Digest magic links
   */
  waiver: BASE + '/waiver',
  /**
   * Upload resume
   */
  resume: BASE + '/resume',

  /**
   * Attend an event
   */
  attend: BASE + '/attend-event',

  /**
   * Create a team
   */
  makeTeam: BASE + '/make-teams',

  /**
   * get discord auth token, then send that to backend to set a role
   */
  discord: BASE + '/discord',
};

export async function authenticate(email: string, password: string) {
  noStore();
  try {
    const session = await auth();
    await signIn('credentials', {
      email: email,
      password: password,
      redirectTo: '/dashboard',
    });
    return 'Login';
  } catch (error) {
    if (error instanceof AuthError) {
      switch (error.type) {
        case 'CredentialsSignin':
          return 'Invalid credentials.';
        default:
          return 'Something went wrong.';
      }
    }
    redirect('/dashboard');
    return 'Something went wrong. ';
  }
}

export async function handleSignOut() {
  noStore();
  try {
    await signOut();
  } catch (error) {
    console.log(error);
    return 'Something went wrong';
  }
}

export async function authUser(email: string, password: string) {
  noStore();
  let resp = {
    error: '',
    response: '',
  };

  await fetch(ENDPOINTS.login, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      email: email,
      password: password,
    }),
  }).then(async (res) => {
    let resJSON = await res.json();
    if (resJSON.statusCode === 403) {
      resp.error = 'Invalid email or password';
    } else if (resJSON.statusCode === 200) {
      resp.response = resJSON.token;
    } else {
      if (resJSON.message) {
        resp.error = resJSON.message;
      } else {
        resp.error = 'Unexpected Error';
      }
    }
  });

  return resp;
}

export async function SignUp(
  firstname: string,
  lastname: string,
  email: string,
  password: string,
  confirmpassword: string,
) {
  noStore();
  let resp = {
    error: '',
    response: '',
  };

  const session = await auth();

  if (session?.user) {
    resp.error = 'User is already logged in';
    return resp;
  } else if (!firstname) {
    resp.error = 'Invalid first name';
    return resp;
  } else if (!lastname) {
    resp.error = 'Invalid last name';
    return resp;
  } else if (!email) {
    resp.error = 'Invalid email';
    return resp;
  } else if (!password) {
    resp.error = 'Invalid password';
    return resp;
  } else if (!confirmpassword) {
    resp.error = 'Invalid password';
    return resp;
  } else if (password !== confirmpassword) {
    resp.error = "Passwords don't match";
    return resp;
  } else {
    await fetch(ENDPOINTS.signup, {
      method: 'POST',
      headers: {
        'content-type': 'application/json',
      },
      body: JSON.stringify({
        email: email,
        password: password,
        registration_status: 'unregistered', //"waitlist" is one of them
      }),
    })
      .then(async (res) => {
        let res_json = await res.json();
        if (res_json.statusCode === 400) {
          resp.error = res_json.message
        } else if (res_json.statusCode === 200) {
          // Set the first and last name
          let data = res_json.body;
          let token = data.token;

          await fetch(ENDPOINTS.update, {
            method: 'POST',
            headers: {
              'content-type': 'application/json',
            },
            body: JSON.stringify({
              updates: {
                $set: {
                  first_name: firstname,
                  last_name: lastname,
                },
              },
              user_email: email,
              auth_email: email,
              token: token,
            }),
          })
            .then(async (res) => {
              let res_json = await res.json();
              if (res_json.statusCode === 200) {
                resp.response = '200';
                try {
                  await signIn('credentials', {
                    email: email,
                    password: password,
                    redirectTo: '/dashboard',
                  });
                } catch (error) {
                  if (error instanceof AuthError) {
                    switch (error.type) {
                      case 'CredentialsSignin':
                        resp.error = 'Invalid credentials.';
                      default:
                        resp.error = 'Something went wrong.';
                    }
                  }
                }
              } else {
                if (res_json.body) {
                  resp.error = res_json.body;
                } else {
                  resp.error = 'Unexpected Error';
                }
              }
            })
            .catch((error) => {
              resp.error =
                error +
                '; An error occured when attempting signup. Failed at 2/2';
            });
        } else {
          if (res_json.body) {
            resp.error = res_json.body;
          } else {
            resp.error = 'Unexpected Error';
          }
        }
      })
      .catch((error) => {
        resp.error =
          error + '; An error occured when attempting signup. Failed at 1/2';
      });
  }
  if (resp.response === '200') {
    redirect('/dashboard');
  }

  return resp;
}

export async function GetUser(email: string) {
  let resp = {
    error: '',
    response: '',
  };
  noStore();
  const session = await auth();

  if (session?.user) {
    await fetch(ENDPOINTS.userData, {
      method: 'POST',
      headers: {
        'content-type': 'application/json',
      },
      body: JSON.stringify({
        email: session.user.email,
        token: session.user.name,
        query: {
          email: email,
        },
      }),
    })
      .then(async (res) => {
        let res_json = await res.json();
        if (res_json.statusCode === 200) {
          resp.response = res_json.body[0];
        } else {
          if (res_json.body) {
            resp.response = res_json.body;
          } else {
            resp.error = 'Unexpected Error';
          }
        }
      })
      .catch((error) => {
        resp.error = error + 'An error occured retrieving data';
      });
  } else {
    resp.error = 'Please log in';
  }
  return resp;
}

export async function SetUser(data: any, user_email_to_update: string) {
  let resp = {
    error: '',
    response: '',
  };
  noStore();
  const session = await auth();

  if (session?.user) {
    await fetch(ENDPOINTS.update, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        updates: {
          $set: data,
        },
        user_email: user_email_to_update,
        auth_email: session.user.email,
        token: session.user.name,
      }),
    })
      .then(async (res) => {
        let resJSON = await res.json();
        if (resJSON.statusCode !== 200) {
          if (resJSON.body) {
            resp.error = resJSON.body;
          } else {
            resp.error = 'Unexpected Error';
          }
        }
      })
      .catch((error) => {
        resp.error = error + '; An error occurred retrieving data';
      });
  } else {
    resp.error = 'Please log in';
  }

  return resp;
}
export async function Forgot(email: string) {
  noStore();
  let resp = {
    error: '',
    response: '',
  };

  const session = await auth();

  if (session?.user) {
    resp.error = 'User is already logged in';
    return resp;
  } else {
    if (!email) {
      resp.error = 'Invalid email';
      return resp;
    } else {
      await fetch(ENDPOINTS.forgot, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: email,
          forgot: true,
        }),
      })
        .then(async (res) => {
          let resJSON = await res.json();
          if (resJSON.statusCode === 200) {
            return resp;
          } else {
            if (resJSON.body) {
              resp.error = resJSON.body;
            } else {
              resp.error = 'Unexpected Error';
            }
          }
        })
        .catch((error) => {
          resp.error =
            error + 'An error occured when attempting to general url';
        });
    }
    return resp;
  }
}
export async function Reset(
  email: string,
  password: string,
  conpassword: string,
  magic: string,
) {
  noStore();
  let resp = {
    error: '',
    response: '',
  };

  if (!password) {
    resp.error = 'Input a new password';
  } else if (!conpassword) {
    resp.error = 'Confirm your new password';
  } else if (password !== conpassword) {
    resp.error = "Passwords don't match!";
  } else {
    await fetch(ENDPOINTS.resetpassword, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email: email,
        forgot: true,
        password: password,
        link: magic,
      }),
    })
      .then(async (res) => {
        let resJSON = await res.json();
        if (resJSON.statusCode !== 200) {
          if (resJSON.body) {
            resp.error = resJSON.body;
          } else {
            resp.error = 'Unexpected Error';
          }
        } else {
          resp.response = 'Password Reset';
        }
      })
      .catch((error) => {
        resp.error =
          error + '; An error occured when attempting to reset password';
      });
  }

  return resp;
}

/*
export async function GetWaiverInfo(){
    console.log('getwaiverinfo is called');
    const session = await auth();
    if(session?.user){
        const resp = await fetch("https://api.hackru.org/dev/waiver", {
            method: "POST",
            headers:{
                "content-type":"application/json",
            },
            body: JSON.stringify({
                email: session.user.email,
                token: session.user.name,
            })
        });
        if (!resp.ok) {
            throw new Error("did not successfully retrieve waiver info");
        }

        const json = await resp.json();
        return json.body;
    }
    else {
        throw new Error("user session not found")
    }

}
*/
export async function GetWaiverInfo() {
  noStore();
  const session = await auth();
  if (session?.user) {
    const json = await fetch(ENDPOINTS.waiver, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email: session.user.email,
        token: session.user.name,
      }),
    }).then((res) => res.json());
    return json.body;
  }
}

export async function UploadWaiver(file: FormData) {
  let resp = {
    error: '',
    response: '',
  };
  noStore();
  const info = await GetWaiverInfo();

  await fetch(info.upload, {
    method: 'PUT',
    headers: {
      'content-type': 'application/pdf',
    },
    body: file.get('file'),
  }).then(async (res) => {
    console.log(res.status);
    if (res.status !== 200) {
      resp.error = 'Error Uploading Waiver';
    } else {
      resp.response = 'Waiver Uploaded';
    }
  });
  return resp;
}

export async function GetResume() {
  noStore();
  const session = await auth();
  if (session?.user) {
    const json = await fetch(ENDPOINTS.resume, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email: session.user.email,
        token: session.user.name,
      }),
    }).then((res) => res.json());
    return json.body;
  }
}

export async function UploadResume(file: FormData) {
  let resp = {
    error: '',
    response: '',
  };
  noStore();
  const info = await GetResume();
  const pdf = file.get('file');

  await fetch(info.upload, {
    method: 'PUT',
    headers: {
      'content-type': 'application/pdf',
    },
    body: pdf,
  }).then(async (res) => {
    console.log(res.status);
    if (res.status !== 200) {
      resp.error = 'Error Uploading Waiver';
    } else {
      resp.response = 'Waiver Uploaded';
    }
  });
  return resp;
}

interface AttendEventResponse {
  statusCode: number;
  body:
    | string
    | {
        email: string;
        new_count: number;
      };
}

export async function AttendEventScan(
  scannedEmail: string,
  event: string,
  points: number,
  again: boolean = false,
): Promise<{
  error: string;
  response: string;
  status: number;
  count: number;
}> {
  noStore();
  const session = await auth();
  let response_message = '';
  let error_message = '';
  let response_status = 0;
  let count = 0;

  if (session?.user) {
    const { email, name } = session.user;
    /* For some reason, name IS THE TOKEN.... hmmm.?? */

    const body = {
      auth_email: email,
      token: name,
      qr: scannedEmail,
      event: event,
      again: again,
      point: points,
    };

    const resp = await fetch(ENDPOINTS.attend, {
      method: 'POST',
      cache: 'no-store',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    });

    if (!resp.ok) {
      error_message = `An error occured when attempting to attend event. Invalid response.`;
      return {
        error: error_message,
        response: '',
        status: 500,
        count: -1,
      };
    }

    const json = await resp.json();
    const { statusCode, body: jsonBody } = json as AttendEventResponse;

    if (typeof jsonBody !== 'string') {
      count = jsonBody!.new_count;
    }
    console.log(jsonBody);
    response_status = statusCode;
    if (statusCode === 404) {
      error_message = `User ${scannedEmail} not found. Please try again.`;
    } else if (statusCode === 402) {
      error_message = `User ${scannedEmail} is already checked in to ${event}!`;
    }

    if (statusCode === 200 && typeof jsonBody !== 'string') {
      response_message = `${
        jsonBody!.email
      } successfully logged in to ${event}!`;
    }
  } else {
    error_message = 'Invalid user session. Please login.';
  }

  return {
    status: response_status,
    error: error_message,
    response: response_message,
    count: count,
  };
}

interface TeamSubmissionResponse {
  status: number;
  error: string;
  email?: string;
  body?: {
    team_id: number;
  };
}

export async function UploadTeamSubmission(
  leaderEmail: string,
  data: TeamSubmit,
): Promise<{
  error: string;
  response: string;
  team_id: number | undefined;
  response_code: number;
}> {
  noStore();
  const { team_member_A, team_member_B, team_member_C } = data;
  const member_emails = [team_member_A, team_member_B, team_member_C];

  for (let i = 0; i < member_emails.length; i++) {
    member_emails[i] = member_emails[i]?.trim();
    if (!member_emails[i] || member_emails[i]?.length === 0) {
      member_emails.splice(i, 1);
      i--;
    }
  }

  const postBody = {
    team_leader: leaderEmail,
    team_members: member_emails,
  };

  const resp = await fetch(ENDPOINTS.makeTeam, {
    method: 'POST',
    cache: 'no-store',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(postBody),
  });

  if (resp.status !== 200) {
    return {
      error: 'Non 200 response',
      response: 'Failed to submit team',
      team_id: 0,
      response_code: resp.status,
    };
  }

  const json: TeamSubmissionResponse = await resp.json();
  if (!json) {
    console.error('Unexpected response from server: ', json);
    return {
      error: 'Unexpected response from server.',
      response: 'An error ocurred.',
      team_id: 0,
      response_code: 500,
    };
  }

  if (json.error) {
    if (json.error.includes('exist')) {
      return {
        error: json.error + ': ' + json.email,
        response:
          'Failed to submit team because email does not exist: ' + json.email,
        team_id: 0,
        response_code: 400,
      };
    }

    return {
      error: json.error,
      response: 'Failed to submit team',
      team_id: 0,
      response_code: 400,
    };
  }

  return {
    error: '',
    response: 'Successfully submitted team!',
    team_id: json.body?.team_id,
    response_code: 200,
  };
}

export async function getOAuthUrl() {
  const state = crypto.randomUUID();

  const url = new URL('https://discord.com/api/oauth2/authorize');
  url.searchParams.set('client_id', DISCORD_CLIENT_ID);
  url.searchParams.set('redirect_uri', DISCORD_REDIRECT_URI);
  url.searchParams.set('response_type', 'code');
  url.searchParams.set('state', state);
  url.searchParams.set('scope', 'role_connections.write identify');
  url.searchParams.set('prompt', 'consent');
  return { state, url: url.toString() };
}

export async function setDiscord(code:string) {
  noStore();
  const session = await auth();
  let resp = {
    error: '',
    response: '',
  };
  if (session?.user) {

    const json = await fetch(ENDPOINTS.discord, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email: session.user.email,
        token: session.user.name,
        code: code,
        redirect_uri: DISCORD_REDIRECT_URI,

      }),
    }).then(async (res) => {
      let resJSON = await res.json();
      if (resJSON.statusCode === 200) {
        resp.response = resJSON.message;
      } else {
        if (resJSON.message) {
          resp.error = resJSON.message;
        } else {
          resp.error = 'Unexpected Error';
        }
      }
    });
  
    return resp;
  }
}
