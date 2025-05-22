'use client';

import { Button } from '@/app/ui/button';

import { Verify } from '../../../../lib/actions';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';

import { useState } from 'react';
import Image from 'next/image';

import { usePathname } from 'next/navigation';

export default function SignupPage() {
  const SignUpSchema = z.object({});

  type SignUp = z.infer<typeof SignUpSchema>;

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<SignUp>({ resolver: zodResolver(SignUpSchema) });

  const [submit_errors, setErrors] = useState('');
  const [success, setSuccess] = useState('');

  const pathname = usePathname();
  const arr = pathname.split('verify/');

  console.log(arr[1]);

  const onSubmit = async (data: SignUp) => {
    console.log('SENDING Verify');
    console.log(data);
    console.log(arr[1]);
    const resp = await Verify(arr[1]);

    console.log(resp);
    if (resp.error) {
      setErrors(resp.error);
      setSuccess('');
    } else {
      setSuccess(resp.response);
      setErrors('');
    }

    if (resp.error == 'Password reset successful') {
      // for some reason this was showing up as an error
      setSuccess(resp.error);
      setErrors('');
    }
  };

  return (
    <main className="flex w-screen items-center justify-center md:h-screen">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="rounded-xl bg-gradient-to-b from-[var(--bg-color)] to-[var(--bg-color2)] p-20"
      >
        <div className="w-full">
          {
            <p className="mt-2 text-xs italic text-[var(--error-color)]">
              {submit_errors}
            </p>
          }
          {
            <p className="mt-2 text-xs italic text-[var(--success-color)]">
              {success}
            </p>
          }
        </div>
        <Button type="submit">Verify Email</Button>
      </form>
    </main>
  );
}
