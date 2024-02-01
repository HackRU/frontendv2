"use client"

import { Button } from '@/app/ui/button';

import { useFormState } from 'react-dom';

import { authenticate, authUser } from '../lib/actions';


export default function LoginPage() {

  const [errorMessage, dispatch] = useFormState(authenticate, undefined);


  return (
    <main className="flex items-center justify-center md:h-screen">
        <form action={dispatch} >
        <div className="w-full">
          <div>
            <label
              className="mb-3 mt-5 block text-xs font-medium text-gray-900"
              htmlFor="email"
            >
              Email
            </label>
            <div className="relative">
              <input
                className="peer block w-full rounded-md border border-gray-200 py-[9px] pl-10 text-sm outline-2 placeholder:text-gray-500"
                id="email"
                type="email"
                name="email"
                placeholder="Enter your email address"
                required
              />
            </div>
          </div>
          <div className="mt-4">
            <label
              className="mb-3 mt-5 block text-xs font-medium text-gray-900"
              htmlFor="password"
            >
              Password
            </label>
            <div className="relative">
              <input
                className="peer block w-full rounded-md border border-gray-200 py-[9px] pl-10 text-sm outline-2 placeholder:text-gray-500"
                id="password"
                type="password"
                name="password"
                placeholder="Enter password"
                required
              />
            </div>
          </div>
        </div>
        <Button type = "submit">Log in</Button>
        </form>
    </main>
  );
}
