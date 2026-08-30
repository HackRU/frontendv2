'use client';

import { Button } from '@/app/ui/button';
import { Reset } from '../../../../lib/actions';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useState } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import Image from 'next/image';

export default function SignupPage() {
  const SignUpSchema = z
    .object({
      email: z.string().email('Please enter a valid email address'),
      password: z.string().min(1, 'Please enter a password'),
      confirm_password: z.string().min(1, 'Please confirm your password'),
    })
    .refine((data) => data.password === data.confirm_password, {
      message: "Passwords don't match",
      path: ['confirm_password'],
    });

  type SignUp = z.infer<typeof SignUpSchema>;

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignUp>({ resolver: zodResolver(SignUpSchema) });

  const [submit_errors, setErrors] = useState('');
  const [success, setSuccess] = useState('');
  const router = useRouter();

  const pathname = usePathname();
  const arr = pathname.split('magic/');

  const onSubmit = async (data: SignUp) => {
    const resp = await Reset(
      data.email,
      data.password,
      data.confirm_password,
      arr[1],
    );

    if (resp.error) {
      setErrors(resp.error);
      setSuccess('');
    } else {
      setSuccess(resp.response);
      setErrors('');
    }

    if (resp.error == 'Password reset successful') {
      setSuccess(resp.error);
      setErrors('');
    }
  };

  return (
    <main className="relative flex min-h-screen w-full items-center justify-center overflow-hidden px-4 py-8 sm:px-6 lg:px-8">
      <header className="absolute inset-x-0 top-0 z-20 flex justify-center pt-4 sm:pt-6">
        <button
          type="button"
          onClick={() => router.push('/')}
          className="brand-float pointer-events-auto flex items-center justify-center transition-transform duration-200 hover:scale-105"
          aria-label="Go to HackRU home"
        >
          <Image
            src="/landing/F2026/hackru-logo-f26.png"
            alt="HackRU logo"
            width={220}
            height={220}
            className="h-20 w-20 object-contain drop-shadow-[0_8px_22px_rgba(0,0,0,0.35)] sm:h-24 sm:w-24 lg:h-28 lg:w-28"
          />
        </button>
      </header>

      <div className="mt-20 w-full max-w-xl rounded-[28px] border border-slate-700/80 bg-slate-950/80 p-5 shadow-[0_24px_80px_rgba(2,6,23,0.8)] backdrop-blur-xl sm:mt-24 sm:p-8 lg:p-10">
        <div className="mb-6 text-center sm:text-left">
          <p className="mb-2 text-xs font-semibold uppercase tracking-[0.28em] text-sky-300">
            Security
          </p>
          <h1 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
            Set a new password
          </h1>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          {submit_errors && (
            <p className="rounded-xl border border-rose-500/30 bg-rose-500/10 px-3 py-2 text-sm text-rose-200">
              {submit_errors}
            </p>
          )}
          {success && (
            <p className="rounded-xl border border-emerald-500/30 bg-emerald-500/10 px-3 py-2 text-sm text-emerald-200">
              {success}
            </p>
          )}

          <div>
            <label
              className="mb-2 block text-sm font-medium text-slate-200"
              htmlFor="email"
            >
              Email
            </label>
            <input
              {...register('email')}
              className="w-full rounded-xl border border-slate-700 bg-slate-900/80 px-4 py-3 text-sm text-white placeholder:text-slate-400 focus:border-sky-400 focus:outline-none focus:ring-2 focus:ring-sky-500/30"
              id="email"
              type="email"
              name="email"
              placeholder="Enter your email address"
            />
            {errors.email && (
              <p className="mt-2 text-xs italic text-rose-200">
                {errors.email?.message}
              </p>
            )}
          </div>

          <div>
            <label
              className="mb-2 block text-sm font-medium text-slate-200"
              htmlFor="password"
            >
              New password
            </label>
            <input
              {...register('password')}
              className="w-full rounded-xl border border-slate-700 bg-slate-900/80 px-4 py-3 text-sm text-white placeholder:text-slate-400 focus:border-sky-400 focus:outline-none focus:ring-2 focus:ring-sky-500/30"
              id="password"
              type="password"
              name="password"
              placeholder="Enter a new password"
            />
            {errors.password && (
              <p className="mt-2 text-xs italic text-rose-200">
                {errors.password?.message}
              </p>
            )}
          </div>

          <div>
            <label
              className="mb-2 block text-sm font-medium text-slate-200"
              htmlFor="confirm_password"
            >
              Confirm password
            </label>
            <input
              {...register('confirm_password')}
              className="w-full rounded-xl border border-slate-700 bg-slate-900/80 px-4 py-3 text-sm text-white placeholder:text-slate-400 focus:border-sky-400 focus:outline-none focus:ring-2 focus:ring-sky-500/30"
              id="confirm_password"
              type="password"
              name="confirm_password"
              placeholder="Confirm your new password"
            />
            {errors.confirm_password && (
              <p className="mt-2 text-xs italic text-rose-200">
                {errors.confirm_password?.message}
              </p>
            )}
          </div>

          <Button type="submit" className="w-full">
            Reset Password
          </Button>
        </form>
      </div>
    </main>
  );
}
