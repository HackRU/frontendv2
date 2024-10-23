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
  const [buttonDisabled, setButtonDisabled] = useState(false)

  const onSubmit = async (data: SignUp) => {
    setButtonDisabled(true);
    const resp = await Forgot(data.email);
    setMessage(resp);
    setTimeout(() => {  // wait 1 minutes between requests
      setButtonDisabled(false);
    }, 60000);
  }

  return (
    <main className="flex items-center justify-center h-screen w-screen">
      <form onSubmit={handleSubmit(onSubmit)} className='bg-gradient-to-b from-offblack-100 to-[#453148] p-20 rounded-xl'>
        <div className="w-full">
          {(<p className="text-xs italic text-white mt-2">{message}</p>)}
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
                className="peer block w-96 rounded-md mb-4 border border-gray-200 py-[9px] pl-4 text-sm outline-2 placeholder:text-gray-500"
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
        <Button type="submit" disabled={buttonDisabled}>
          {buttonDisabled ? "Please wait 1 minute between requests!" : "Send reset link"}
        </Button>
      </form>
    </main>
  );
}
