'use client';

import { Button } from '@/app/ui/button';
import { Verify } from '../../../../lib/actions';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useState } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import Image from 'next/image';

export default function SignupPage() {
  const SignUpSchema = z.object({});

  type SignUp = z.infer<typeof SignUpSchema>;

  const { handleSubmit } = useForm<SignUp>({ resolver: zodResolver(SignUpSchema) });

  const [submit_errors, setErrors] = useState('');
  const [success, setSuccess] = useState('');
  const router = useRouter();

  const pathname = usePathname();
  const arr = pathname.split('verify/');

  const onSubmit = async () => {
    const resp = await Verify(arr[1]);

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
            Verify email
          </p>
          <h1 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
            Finish account setup
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

          <Button type="submit" className="w-full">
            Verify Email
          </Button>
        </form>
      </div>
    </main>
  );
}
