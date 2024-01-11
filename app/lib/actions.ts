'use server';

import { z } from 'zod';
import { sql } from '@vercel/postgres';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { signIn } from '@/auth';
import { AuthError } from 'next-auth';

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


//this is very lenient with what it will accept, should be stronger
const UserUpdateSchema = z.object({
  email: z.string().email(),
  role: z.string(),
  registration_status: z.string(),

  first_name: z.string(),
  last_name: z.string(),

  github: z.string(),
  major: z.string(),
  shirt_size: z.string(),
  hackathon_count: z.number(),
  dietary_restrictions: z.string(),
  special_needs: z.string(),
  date_of_birth: z.date(),
  school: z.string(),
  grad_year: z.string(),
  gender: z.string(),
  level_of_study: z.string(),
  country_of_residence: z.string(),
  ethnicity: z.string(),
  phone_number: z.number(),
  how_you_heard_about_hackru: z.string(),
  reasons: z.string(),

});

export async function validateUserForm(formData: FormData){
  const validatedFields = UserUpdateSchema.safeParse({
    email : formData.get('email'),
    role  : formData.get('role'),
    registration_status: formData.get('registration_status'),

    first_name: formData.get('first_name'),
    last_name: formData.get('last_name'),
  
    github: formData.get('github'),
    major: formData.get('major'),
    shirt_size: formData.get('shirt_size'),
    hackathon_count: formData.get('hackathon_count'),
    dietary_restrictions: formData.get('dietary_restrictions'),
    special_needs: formData.get('special_needs'),
    date_of_birth: formData.get('date_of_birth'),
    school: formData.get('school'),
    grad_year: formData.get('grad_year'),
    gender: formData.get('gender'),
    level_of_study: formData.get('level_of_study'),
    country_of_residence: formData.get('country_of_residence'),
    ethnicity: formData.get('ethnicity'),
    phone_number: formData.get('phone_number'),
    how_you_heard_about_hackru: formData.get('how_you_heard_about_hackru'),
    reasons:formData.get('reasons'),
  })

    // If form validation fails, return errors early. Otherwise, continue.
    if (!validatedFields.success) {
      return {
        errors: validatedFields.error.flatten().fieldErrors,
        message: 'Missing Fields. Failed to Create Invoice.',
      };
    }

    console.log(formData);
}

const CreateInvoice = FormSchema.omit({ id: true, date: true });
const UpdateInvoice = FormSchema.omit({ date: true, id: true });

// This is temporary
export type State = {
  errors?: {
    customerId?: string[];
    amount?: string[];
    status?: string[];
  };
  message?: string | null;
};

export async function createInvoice(prevState: State, formData: FormData) {
  // Validate form fields using Zod
  const validatedFields = CreateInvoice.safeParse({
    customerId: formData.get('customerId'),
    amount: formData.get('amount'),
    status: formData.get('status'),
  });

  // If form validation fails, return errors early. Otherwise, continue.
  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: 'Missing Fields. Failed to Create Invoice.',
    };
  }

  // Prepare data for insertion into the database
  const { customerId, amount, status } = validatedFields.data;
  const amountInCents = amount * 100;
  const date = new Date().toISOString().split('T')[0];

  // Insert data into the database
  try {
    await sql`
      INSERT INTO invoices (customer_id, amount, status, date)
      VALUES (${customerId}, ${amountInCents}, ${status}, ${date})
    `;
  } catch (error) {
    // If a database error occurs, return a more specific error.
    return {
      message: 'Database Error: Failed to Create Invoice.',
    };
  }

  // Revalidate the cache for the invoices page and redirect the user.
  revalidatePath('/dashboard/invoices');
  redirect('/dashboard/invoices');
}

export async function updateInvoice(
  id: string,
  prevState: State,
  formData: FormData,
) {
  const validatedFields = UpdateInvoice.safeParse({
    customerId: formData.get('customerId'),
    amount: formData.get('amount'),
    status: formData.get('status'),
  });

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: 'Missing Fields. Failed to Update Invoice.',
    };
  }

  const { customerId, amount, status } = validatedFields.data;
  const amountInCents = amount * 100;

  try {
    await sql`
      UPDATE invoices
      SET customer_id = ${customerId}, amount = ${amountInCents}, status = ${status}
      WHERE id = ${id}
    `;
  } catch (error) {
    return { message: 'Database Error: Failed to Update Invoice.' };
  }

  revalidatePath('/dashboard/invoices');
  redirect('/dashboard/invoices');
}

export async function deleteInvoice(id: string) {
  // throw new Error('Failed to Delete Invoice');

  try {
    await sql`DELETE FROM invoices WHERE id = ${id}`;
    revalidatePath('/dashboard/invoices');
    return { message: 'Deleted Invoice' };
  } catch (error) {
    return { message: 'Database Error: Failed to Delete Invoice.' };
  }
}

export async function authenticate(
  prevState: string | undefined,
  formData: FormData,
) {
  try {
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
    throw error;
  }
}
