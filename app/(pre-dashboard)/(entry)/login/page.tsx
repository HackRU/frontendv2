'use client';

import { Button } from '@/app/ui/button';
import { authenticate } from '../../../lib/actions';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';

export default function LoginPage() {
  const LoginSchema = z.object({
    email: z.string().email('Please enter a valid email address'),
    password: z.string().min(1, 'Please enter your password'),
  });

  type Login = z.infer<typeof LoginSchema>;

  const [submit_errors, setErrors] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Login>({ resolver: zodResolver(LoginSchema) });

  const onSubmit = async (data: Login) => {
    setLoading(true);
    setErrors('');

    const resp = await authenticate(data.email, data.password);
    setLoading(false);

    if (resp === 'success') {
      router.push('/dashboard');
      router.refresh();
      return;
    }

    setErrors(resp);
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
            Welcome back
          </p>
          <h1 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
            Log in
          </h1>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          {submit_errors && (
            <p className="rounded-xl border border-rose-500/30 bg-rose-500/10 px-3 py-2 text-sm text-rose-200">
              {submit_errors}
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
                {errors.email?.message}
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
              autoComplete="current-password"
              className="w-full rounded-xl border border-slate-700 bg-slate-900/80 px-4 py-3 text-sm text-white placeholder:text-slate-400 focus:border-sky-400 focus:outline-none focus:ring-2 focus:ring-sky-500/30"
              id="password"
              type="password"
              name="password"
              placeholder="Enter your password"
            />
            {errors.password && (
              <p className="mt-2 text-xs italic text-rose-200">
                {errors.password?.message}
              </p>
            )}
          </div>

          <Button className="mt-2 w-full" type="submit">
            {loading ? 'Loading...' : 'Login'}
          </Button>
        </form>

        <div className="mt-6 space-y-2 text-center text-sm text-slate-300 sm:text-left">
          <button
            type="button"
            className="block cursor-pointer text-left hover:text-sky-300"
            onClick={() => router.push('/signup')}
          >
            Not a member? Create an account
          </button>
          <button
            type="button"
            className="block cursor-pointer text-left hover:text-sky-300"
            onClick={() => router.push('/forgot')}
          >
            Forgot your password? Reset it here
          </button>
        </div>
      </div>
    </main>
  );
}
