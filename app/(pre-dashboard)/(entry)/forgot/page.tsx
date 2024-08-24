"use client"

import { Button } from '@/app/ui/button';
import Image from 'next/image';


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
        <Image
        src={('/Rectangle1.png')}
        width="900"
        height="900"
        alt="Scroll"
        className={"h-[500px] w-[650px] sm:h-auto md:w-[650px] lg:w-[650px] xl:w-[650px] absolute"}
        priority
        style={{
          objectFit: 'cover',
          zIndex: -1
        }}
      />
      <form onSubmit={handleSubmit(onSubmit)} >
        <div className="w-full">
          {(<p className="text-xs italic mt-2">{message}</p>)}
          <div>
            <label
              className="mb-3 mt-5 block text-xs font-medium text-white"
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
