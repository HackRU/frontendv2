"use client"

import { Button } from '@/app/ui/button';


import { Forgot } from '../../../lib/actions';

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from 'zod';

import { useState } from "react";

export default function SignupPage() {

  const SignUpSchema = z.object({
    email: z.string().email(),



  });

  type SignUp = z.infer<typeof SignUpSchema>;



  const { register, handleSubmit, reset, formState: { errors }, } = useForm<SignUp>({ resolver: zodResolver(SignUpSchema) });

  const [message, setMessage] = useState("");

  const onSubmit = async (data: SignUp) => {
    const resp = await Forgot(data.email);
    setMessage(resp);
  }


  return (
    <main className="flex items-center justify-center md:h-screen w-screen">
      <form onSubmit={handleSubmit(onSubmit)} >
        <div className="w-full">
          {(<p className="text-xs italic mt-2">{message}</p>)}
          <div>
            <label
              className="mb-3 mt-5 block text-xs font-medium text-gray-900"
              htmlFor="email"
            >
              Email
            </label>
            <div className="relative">
              <input
                {...register("email")}
                className="peer block w-full rounded-md border border-gray-200 py-[9px] pl-10 text-sm outline-2 placeholder:text-gray-500"
                id="email"
                type="email"
                name="email"
                placeholder="Enter your email address"
                required
              />
              {errors.email && (<p className="text-xs italic text-red-500 mt-2">{errors.email?.message}</p>)}
            </div>
          </div>


        </div>
        <Button type="submit">Send Reset Link</Button>
      </form>
    </main>
  );
}
