"use client"

import { Button } from '@/app/ui/button';

import { authenticate, authUser } from '../../../lib/actions';

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from 'zod';

import { Suspense, useState } from "react";

import Image from 'next/image';
import { useRouter } from 'next/navigation'
import Cursor from '../../../ui/cursor';


export default function LoginPage() {


  const LoginSchema = z.object({
    email: z.string().email(),
    //email :z.string(),
    password: z.string(),
  });

  type Login = z.infer<typeof LoginSchema>;

  const [submit_errors, setErrors] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const { register, handleSubmit, reset, formState: { errors }, } = useForm<Login>({ resolver: zodResolver(LoginSchema) });

  const onSubmit = async (data: Login) => {
    setLoading(true);
    const resp = await authenticate(data.email, data.password);
    setLoading(false);
    setErrors(resp);
  }

  return (
    <main className="flex items-center justify-center md:h-screen w-screen h-screen">
      <form onSubmit={handleSubmit(onSubmit)} className='bg-gradient-to-b from-offblack-100 to-[#453148] p-20 rounded-xl'>
        <div className="w-full grid gap-0 items-center">
          {(<p className="text-xs italic text-red-500 mt-2">{submit_errors}</p>)}
          <div>
          <p className = "text-s italic  text-white">Press Login or Press Enter to Login</p>
            <label
              className="mb-3 mt-5 block text-xs font-medium text-white"
              htmlFor="email"
            >
              Email
            </label>
            <div className="relative">
              <input
                {...register("email")}
                className="peer block w-96 rounded-md border border-gray-200 py-[9px] pl-4 text-sm outline-2 placeholder:text-gray-500"
                id="email"
                type="email"
                name="email"
                placeholder="Enter your email address"
                required
              />
            </div>
            {errors.email && (<p className="text-xs italic text-red-500 mt-2">{errors.email?.message}</p>)}
          </div>
          <div className="">
            <label
              className="mb-3 mt-5 block text-xs font-medium text-white"
              htmlFor="password"
            >
              Password
            </label>
            <div className="relative">
              <input
                {...register("password")}
                className="peer block w-96 rounded-md border border-gray-200 py-[9px] pl-4 text-sm outline-2 placeholder:text-gray-500"
                id="password"
                type="password"
                name="password"
                placeholder="Enter password"
                required
              />
              {errors.password && (<p className="text-xs italic text-red-500 mt-2">{errors.password?.message}</p>)}
            </div>
          </div>
          <Button className="mt-4 justify-center" type="submit">
            {loading ? 'Loading...' : 'Login'} </Button>
          <p className="text-s italic  text-white mt-2 hover:text-blue-500 cursor-pointer" onClick={() => router.push('/signup')}>Not a member? Create an Account!</p>
          <p className="text-s italic  text-white mt-2 hover:text-blue-500 cursor-pointer" onClick={() => router.push('/forgot')}>Forgot Password? Reset it Here!</p>
        </div>
      </form>
    </main>
  );
}
