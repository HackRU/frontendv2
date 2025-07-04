'use client';

import { Button } from '@/app/ui/button';
import Image from 'next/image';

import { Forgot } from '../../../lib/actions';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';

import { useState } from 'react';

export default function SignupPage() {
  const SignUpSchema = z.object({
    email: z.string().email(),
  });

  type SignUp = z.infer<typeof SignUpSchema>;

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<SignUp>({ resolver: zodResolver(SignUpSchema) });

  const [message, setMessage] = useState('');
  const [buttonDisabled, setButtonDisabled] = useState(false);

  const onSubmit = async (data: SignUp) => {
    setButtonDisabled(true);
    const resp = await Forgot(data.email);
    setMessage(resp);
    setTimeout(() => {
      // wait 1 minutes between requests
      setButtonDisabled(false);
    }, 60000);
  };

  return (
    <main className="flex h-screen w-screen items-center justify-center">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="rounded-xl bg-gradient-to-b from-[var(--bg-color)] to-[var(--bg-color2)] p-20"
      >
        <div className="w-full">
          {
            <p className="mt-2 text-xs italic text-[var(--mainText-color)]">
              {message}
            </p>
          }
          <div>
            <label
              className="mb-3 mt-5 block text-xs font-medium text-[var(--mainText-color)] "
              htmlFor="email"
            >
              Email
            </label>
            <div className="relative">
              <input
                {...register('email')}
                className="peer mb-4 block w-96 rounded-md border border-[var(--border-color)]  py-[9px] pl-4 text-sm outline-2 placeholder:text-[var(--placeholder-color)] "
                id="email"
                type="email"
                name="email"
                placeholder="Enter your email address"
                required
              />
              {errors.email && (
                <p className="mt-2 text-xs italic  text-[var(--error-color)]">
                  {errors.email?.message}
                </p>
              )}
            </div>
          </div>
        </div>
        <Button type="submit" disabled={buttonDisabled}>
          {buttonDisabled
            ? 'Please wait 1 minute between requests!'
            : 'Send reset link'}
        </Button>
      </form>
    </main>
  );
}
