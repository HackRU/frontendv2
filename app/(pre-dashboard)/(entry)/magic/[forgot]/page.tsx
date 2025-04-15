"use client"

import { Button } from '@/app/ui/button';


import { Reset } from '../../../../lib/actions';

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from 'zod';

import { useState } from "react";
import Image from 'next/image';

import { usePathname } from 'next/navigation'

export default function SignupPage() {

  const SignUpSchema = z.object({
    email: z.string().email(),


    password: z.string(),
    confirm_password: z.string()

  }).refine((data) => data.password === data.confirm_password, {
    message: "Passwords don't match",
    path: ["confirm_password"], // path of error
  });

  type SignUp = z.infer<typeof SignUpSchema>;


  const { register, handleSubmit, reset, formState: { errors }, } = useForm<SignUp>({ resolver: zodResolver(SignUpSchema) });

  const [submit_errors, setErrors] = useState("");
  const [success, setSuccess] = useState("");

  const pathname = usePathname();
  const arr = pathname.split("magic/")

  console.log(arr[1])

  const onSubmit = async (data: SignUp) => {
    console.log("SENDING Reset");
    console.log(data);
    console.log(arr[1])
    const resp = await Reset(data.email, data.password, data.confirm_password, arr[1]);

    console.log(resp);
    if (resp.error) {
      setErrors(resp.error);
      setSuccess("");
    } else {
      setSuccess(resp.response);
      setErrors("");
    }

    if (resp.error == "Password reset successful") {   // for some reason this was showing up as an error
      setSuccess(resp.error);
      setErrors("");
    }
  };

  return (
    <main className="flex items-center justify-center md:h-screen w-screen">
      <form onSubmit={handleSubmit(onSubmit)} className='bg-gradient-to-b from-[var(--bg-color)] to-[var(--bg-color2)] p-20 rounded-xl'>
        <div className="w-full">
          {(<p className="text-xs italic text-[var(--error-color)] mt-2">{submit_errors}</p>)}
          {(<p className="text-xs italic text-[var(--success-color)] mt-2">{success}</p>)}
          <div>
            <label
              className="mb-3 mt-5 block text-xs font-medium text-[var(--mainText-color)]"
              htmlFor="email"
            >
              Email
            </label>
            <div className="relative">
              <input
                {...register("email")}
                className="peer block w-96 rounded-md border border-var(--border-color)] py-[9px] pl-4 text-sm outline-2 placeholder:text-[var(--placeholder-color)]"
                id="email"
                type="email"
                name="email"
                placeholder="Enter your email address"
                required
              />
              {errors.email && (<p className="text-xs italic text-[var(--error-color)] mt-2">{errors.email?.message}</p>)}
            </div>
          </div>

          <div className="mt-4">
            <label
              className="mb-3 mt-5 block text-xs font-medium text-[var(--mainText-color)]"
              htmlFor="password"
            >
              Password
            </label>
            <div className="relative">
              <input
                {...register("password")}
                className="peer block w-96 rounded-md border border-var(--border-color)] py-[9px] pl-4 text-sm outline-2 placeholder:text-[var(--placeholder-color)]"
                id="password"
                type="password"
                name="password"
                placeholder="Enter password"
                required
              />
              {errors.password && (<p className="text-xs italic text-[var(--error-color)] mt-2">{errors.password?.message}</p>)}
            </div>
          </div>
          <div className="mt-4">
            <label
              className="mb-3 mt-5 block text-xs font-medium text-[var(--mainText-color)]"
              htmlFor="confirm_password"
            >
              Confim Password
            </label>
            <div className="relative">
              <input
                {...register("confirm_password")}
                className="peer block w-96 rounded-md mb-4 border border-var(--border-color)] py-[9px] pl-4 text-sm outline-2 placeholder:text-[var(--placeholder-color)]"
                id="confirm_password"
                type="password"
                name="confirm_password"
                placeholder="Enter password again"
                required
              />
              {errors.confirm_password && (<p className="text-xs italic text-[var(--error-color)] mt-2">{errors.confirm_password?.message}</p>)}
            </div>
          </div>

        </div>
        <Button type="submit">Reset Password</Button>
      </form>
    </main>
  );
}