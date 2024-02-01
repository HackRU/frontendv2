'use server';

import { z } from 'zod';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { signIn } from '@/auth';
import { AuthError } from 'next-auth';

import { auth } from "../../auth"

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


export async function authenticate(
  prevState: string | undefined,
  formData: FormData,
) {
  try {
    console.log("FORM");
    const session = await auth();
    console.log(session);
    await signIn('credentials', formData);
  } catch (error) {
      if (error instanceof AuthError) {
        switch (error.type) {
          case 'CredentialsSignin':
            return 'Invalid credentials.';
          default:
            return 'Something went wrong.';
        }
      }
  }
}

export async function authUser(email: string, password:string){
  console.log(email);
  console.log(password);
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


