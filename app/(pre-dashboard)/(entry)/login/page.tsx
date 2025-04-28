'use client';

import { Button } from '@/app/ui/button';

import { authenticate, authUser } from '../../../lib/actions';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';

import { Suspense, useState } from 'react';

import Image from 'next/image';
import { useRouter } from 'next/navigation';
import Cursor from '../../../ui/cursor';

export default function LoginPage() {
  const LoginSchema = z.object({
    email: z.string().email(),
    //email :z.string(),
    password: z.string(),
  });

  type Login = z.infer<typeof LoginSchema>;

  const [submit_errors, setErrors] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<Login>({ resolver: zodResolver(LoginSchema) });

  const onSubmit = async (data: Login) => {
    setLoading(true);
    const resp = await authenticate(data.email, data.password);
    setLoading(false);
    setErrors(resp);
  };

  return (
    <main className="flex h-screen w-screen items-center justify-center md:h-screen">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="rounded-xl bg-gradient-to-b from-[var(--bg-color)] to-[var(--bg-color2)] p-20"
      >
        <div className="grid w-full items-center gap-0">
          {
            <p className="mt-2 text-xs italic text-[var(--error-color)]">
              {submit_errors}
            </p>
          }
          <div>
            <p className="text-s italic  text-[var(--mainText-color)]">
              Press Login or Press Enter to Login
            </p>
            <label
              className="mb-3 mt-5 block text-xs font-medium text-[var(--mainText-color)]"
              htmlFor="email"
            >
              Email
            </label>
            <div className="relative">
              <input
                {...register('email')}
                className="border-var(--border-color)] peer block w-96 rounded-md border py-[9px] pl-4 text-sm outline-2 placeholder:text-[var(--placeholder-color)]"
                id="email"
                type="email"
                name="email"
                placeholder="Enter your email address"
                required
              />
            </div>
            {errors.email && (
              <p className="mt-2 text-xs italic text-[var(--error-color)]">
                {errors.email?.message}
              </p>
            )}
          </div>
          <div className="">
            <label
              className="mb-3 mt-5 block text-xs font-medium text-[var(--mainText-color)]"
              htmlFor="password"
            >
              Password
            </label>
            <div className="relative">
              <input
                {...register('password')}
                className="peer block w-96 rounded-md border border-[var(--border-color)] py-[9px] pl-4 text-sm outline-2 placeholder:text-[var(--placeholder-color)]"
                id="password"
                type="password"
                name="password"
                placeholder="Enter password"
                required
              />
              {errors.password && (
                <p className="mt-2 text-xs italic text-[var(--error-color)]">
                  {errors.password?.message}
                </p>
              )}
            </div>
          </div>
          <Button className="mt-4 justify-center" type="submit">
            {loading ? 'Loading...' : 'Login'}{' '}
          </Button>
          <p
            className="text-s mt-2  cursor-pointer italic text-[var(--mainText-color)] hover:text-[var(--hover-color)]"
            onClick={() => router.push('/signup')}
          >
            Not a member? Create an Account!
          </p>
          <p
            className="text-s mt-2  italic text-[var(--mainText-color)] hover:text-[var(--hover-color)]"
            onClick={() => router.push('/forgot')}
          >
            Forgot Password? Reset it Here!
          </p>
        </div>
      </form>
    </main>
  );
}
