'use client';

import { Button } from '@/app/ui/button';
import { SignUp } from '../../../lib/actions';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';

export default function SignupPage() {
  const SignUpSchema = z
    .object({
      email: z
        .string()
        .email('Please enter a valid email address')
        .nonempty('Please fill out the email field'),
      first_name: z.string().nonempty('Please fill out the first name field'),
      last_name: z.string().nonempty('Please fill out the last name field'),
      password: z
        .string()
        .min(4, 'Password must be at least 4 characters')
        .nonempty('Please fill out the password field'),
      confirm_password: z.string().nonempty('Please confirm your password'),
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
  } = useForm<SignUp>({
    resolver: zodResolver(SignUpSchema),
  });

  const [submit_errors, setErrors] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const onSubmit = async (data: SignUp) => {
    setLoading(true);
    setErrors('');

    const resp = await SignUp(
      data.first_name,
      data.last_name,
      data.email,
      data.password,
      data.confirm_password,
    );
    setLoading(false);

    if (resp.response === '200') {
      router.push('/dashboard');
      router.refresh();
      return;
    }

    if (resp) {
      setErrors(resp.error || 'Something went wrong while creating your account.');
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

      <div className="mt-20 w-full max-w-2xl rounded-[28px] border border-slate-700/80 bg-slate-950/80 p-5 shadow-[0_24px_80px_rgba(2,6,23,0.8)] backdrop-blur-xl sm:mt-24 sm:p-8 lg:p-10">
        <div className="mb-6 text-center sm:text-left">
          <p className="mb-2 text-xs font-semibold uppercase tracking-[0.28em] text-sky-300">
            Get started
          </p>
          <h1 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
            Create your account
          </h1>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          {submit_errors && (
            <p className="rounded-xl border border-rose-500/30 bg-rose-500/10 px-3 py-2 text-sm text-rose-200">
              {submit_errors}
            </p>
          )}

          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <label
                className="mb-2 block text-sm font-medium text-slate-200"
                htmlFor="first_name"
              >
                First Name
              </label>
              <input
                {...register('first_name')}
                aria-invalid={!!errors.first_name}
                autoComplete="given-name"
                className="w-full rounded-xl border border-slate-700 bg-slate-900/80 px-4 py-3 text-sm text-white placeholder:text-slate-400 focus:border-sky-400 focus:outline-none focus:ring-2 focus:ring-sky-500/30"
                id="first_name"
                name="first_name"
                placeholder="First"
              />
              {errors.first_name && (
                <p className="mt-2 text-xs italic text-rose-200">
                  {errors.first_name.message}
                </p>
              )}
            </div>

            <div>
              <label
                className="mb-2 block text-sm font-medium text-slate-200"
                htmlFor="last_name"
              >
                Last Name
              </label>
              <input
                {...register('last_name')}
                aria-invalid={!!errors.last_name}
                autoComplete="family-name"
                className="w-full rounded-xl border border-slate-700 bg-slate-900/80 px-4 py-3 text-sm text-white placeholder:text-slate-400 focus:border-sky-400 focus:outline-none focus:ring-2 focus:ring-sky-500/30"
                id="last_name"
                name="last_name"
                placeholder="Last"
              />
              {errors.last_name && (
                <p className="mt-2 text-xs italic text-rose-200">
                  {errors.last_name.message}
                </p>
              )}
            </div>
          </div>

          <div>
            <label
              className="mb-2 block text-sm font-medium text-slate-200"
              htmlFor="email"
            >
              Email
            </label>
            <input
              {...register('email')}
              aria-invalid={!!errors.email}
              autoComplete="email"
              className="w-full rounded-xl border border-slate-700 bg-slate-900/80 px-4 py-3 text-sm text-white placeholder:text-slate-400 focus:border-sky-400 focus:outline-none focus:ring-2 focus:ring-sky-500/30"
              id="email"
              type="email"
              name="email"
              placeholder="Enter your email address"
            />
            {errors.email && (
              <p className="mt-2 text-xs italic text-rose-200">
                {errors.email.message}
              </p>
            )}
          </div>

          <div>
            <label
              className="mb-2 block text-sm font-medium text-slate-200"
              htmlFor="password"
            >
              Password
            </label>
            <input
              {...register('password')}
              aria-invalid={!!errors.password}
              autoComplete="new-password"
              className="w-full rounded-xl border border-slate-700 bg-slate-900/80 px-4 py-3 text-sm text-white placeholder:text-slate-400 focus:border-sky-400 focus:outline-none focus:ring-2 focus:ring-sky-500/30"
              id="password"
              name="password"
              type="password"
              placeholder="Create a password"
            />
            {errors.password && (
              <p className="mt-2 text-xs italic text-rose-200">
                {errors.password.message}
              </p>
            )}
          </div>

          <div>
            <label
              className="mb-2 block text-sm font-medium text-slate-200"
              htmlFor="confirm_password"
            >
              Confirm Password
            </label>
            <input
              {...register('confirm_password')}
              aria-invalid={!!errors.confirm_password}
              autoComplete="new-password"
              className="w-full rounded-xl border border-slate-700 bg-slate-900/80 px-4 py-3 text-sm text-white placeholder:text-slate-400 focus:border-sky-400 focus:outline-none focus:ring-2 focus:ring-sky-500/30"
              id="confirm_password"
              name="confirm_password"
              type="password"
              placeholder="Confirm your password"
            />
            {errors.confirm_password && (
              <p className="mt-2 text-xs italic text-rose-200">
                {errors.confirm_password.message}
              </p>
            )}
          </div>

          <Button type="submit" className="w-full">
            {loading ? 'Loading...' : 'Sign Up'}
          </Button>
        </form>

        <button
          type="button"
          className="mt-6 block text-center text-sm text-slate-300 hover:text-sky-300 sm:text-left"
          onClick={() => router.push('/login')}
        >
          Already a member? Log in
        </button>
      </div>
    </main>
  );
}
