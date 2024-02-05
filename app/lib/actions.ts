'use server';

import { z } from 'zod';
import { signIn } from '@/auth';
import { AuthError } from 'next-auth';

import { auth } from "../../auth"

import { redirect } from 'next/navigation'

const FormSchema = z.object({
  id: z.string(),
  customerId: z.string({
    invalid_type_error: 'Please select a customer.',
  }),
  amount: z.coerce
    .number()
    .gt(0, { message: 'Please enter an amount greater than $0.' }),
  status: z.enum(['pending', 'paid'], {
    invalid_type_error: 'Please select an invoice status.',
  }),
  date: z.string(),
});


export async function authenticate(email:string, password:string) {
  try {
    console.log("FORM");
    const session = await auth();
    console.log(session);
    await signIn('credentials',{email:email, password:password, redirectTo:"/dashboard"});
    return "Login";
  } catch (error) {
      console.log("ERROR");
      console.log(error);
      if (error instanceof AuthError){
        switch (error.type) {
            case 'CredentialsSignin':
              return 'Invalid credentials.';
            default:
              return 'Something went wrong.';
          }
      }
      redirect('/dashboard');
      return "Something went wrong. ";
  }
}

export async function authUser(email: string, password:string){
  let resp = {
    error: "",
    response: "",
  };

  await fetch("https://api.hackru.org/dev/authorize", {
    method: "POST",
    headers: {
        "Content-Type": "application/json",
    },
    body: JSON.stringify({
        email: email,
        password: password,
    }),
    }).then(async (res) => {
      let resJSON = await res.json();
      if (resJSON.statusCode === 403) {
          resp.error = "Invalid email or password";
      } else if (resJSON.statusCode === 200) {
          resp.response = resJSON.body.token;
      } else{
          if (resJSON.body) {
              resp.error = resJSON.body;
          } else {
              resp.error = "Unexpected Error";
          }
        }
      })

  return resp;
}



export async function SignUp(firstname:string, lastname:string, email:string, password:string, confirmpassword:string) {
  let resp = {
      error: "",
      response: "",
  };
  console.log(firstname);
  console.log(lastname);
  console.log(email);
  console.log(password);
  console.log(confirmpassword);

  const session = await auth();

    if (session?.user) {
    resp.error = "User is already logged in";
    return resp;
    }
      else if (!firstname) {
          resp.error = "Invalid first name";
          return resp;
      } else if (!lastname) {
          resp.error = "Invalid last name";
          return resp;
      } else if (!email) {
          resp.error = "Invalid email";
          return resp;
      } else if (!password) {
          resp.error = "Invalid password";
          return resp;
      } else if (!confirmpassword) {
          resp.error = "Invalid password";
          return resp;
      } else if (password !== confirmpassword) {
          resp.error = "Passwords don't match";
          return resp;
      } else {

          await fetch("https://api.hackru.org/dev/create", {
              method: "POST",
              headers: {
                  "content-type": "application/json",
              },
              body: JSON.stringify({
                  email: email,
                  password: password,
                  registration_status: "unregistered", //"waitlist" is one of them
              }),
          })
              .then(async (res) => {
                  let res_json = await res.json();
                  if (res_json.statusCode === 400) {
                      resp.error =
                          "User with email " + email + " already exists";
                  } else if (res_json.statusCode === 200) {
                      // Set the first and last name
                      let data = res_json.body;
                      let token = data.token;

                      await fetch("https://api.hackru.org/dev/update", {
                          method: "POST",
                          headers: {
                              "content-type": "application/json",
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
                                try {
                                  await signIn('credentials', {email:email, password:password});
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
                                      resp.error = "Unexpected Error";
                                  }
                              }
                          })
                          .catch((error) => {
                              resp.error =
                                  error +
                                  "; An error occured when attempting signup. Failed at 2/2";
                          });
                  } else {
                      if (res_json.body) {
                          resp.error = res_json.body;
                      } else {
                          resp.error = "Unexpected Error";
                      }
                  }
              })
              .catch((error) => {
                  resp.error =
                      error +
                      "; An error occured when attempting signup. Failed at 1/2";
              });
  }

  return resp;
}

export async function GetUser(email:string) {
    let resp = {
        error: "",
        response: "",
    };
  
    const session = await auth();
  
    if (session?.user) {
        await fetch("https://api.hackru.org/dev/read", {
            method: "POST",
            headers: {
                "content-type": "application/json",
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
                        resp.error = "Unexpected Error";
                    }
                }
            })
            .catch((error) => {
                resp.error = error + "An error occured retrieving data";
            });
    } else {
        resp.error = "Please log in";
    }
    return resp;
  }

  export async function SetUser(data:any, user_email_to_update:string) {
    let resp = {
        error: "",
        response: "",
    };

    const session = await auth();

    if (session?.user) {
        await fetch("https://api.hackru.org/dev/update", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
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
                        resp.error = "Unexpected Error";
                    }
                }
            })
            .catch((error) => {
                resp.error = error + "; An error occured retrieving data";
            });
    } else {
        resp.error = "Please log in";
    }

    return resp;
}
export async function Forgot(email:string) {
    let resp = {
        error: "",
        response: "",
    };

    const session = await auth();

    if (session?.user) {
        resp.error = "User is already logged in";
        return resp;
    } else {
        if (!email) {
            resp.error = "Invalid email";
            return resp;
        } else {
            await fetch("https://api.hackru.org/dev/createmagiclink", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
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
                            resp.error = "Unexpected Error";
                        }
                    }
                })
                .catch((error) => {
                    resp.error =
                        error +
                        "An error occured when attempting to general url";
                });
        }
        return resp;
    }
}
export async function Reset(email:string, password:string, conpassword:string, magic:string) {
    let resp = {
        error: "",
        response: "",
    };

    if (!password) {
        resp.error = "Input a new password";
    } else if (!conpassword) {
        resp.error = "Confirm your new password";
    } else if (password !== conpassword) {
        resp.error = "Passwords don't match!";
    } else {
        await fetch("https://api.hackru.org/dev/consume", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
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
                        resp.error = "Unexpected Error";
                    }
                }
                else{
                    resp.response = "Password Reset"
                }
            })
            .catch((error) => {
                resp.error =
                    error +
                    "; An error occured when attempting to reset password";
            });
    }

    return resp;
}