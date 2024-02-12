"use client"

import { Button } from '@/app/ui/button';


import { SignUp } from '../../lib/actions';

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from 'zod';

import { useState } from "react";

import Image from 'next/image';
import { useRouter } from 'next/navigation'


export default function SignupPage() {

  const SignUpSchema = z.object({
    email: z.string().email(),

    first_name: z.string(),
    last_name: z.string(),

    password: z.string(),
    confirm_password: z.string()

  }).refine((data) => data.password === data.confirm_password, {
    message: "Passwords don't match",
    path: ["confirm_password"], // path of error
  });

  type SignUp = z.infer<typeof SignUpSchema>;


  const { register, handleSubmit, reset, formState: { errors }, } = useForm<SignUp>({ resolver: zodResolver(SignUpSchema) });

  const [submit_errors, setErrors] = useState("");

  const router = useRouter();

  const onSubmit = async (data: SignUp) => {
    console.log("SENDING SIGNUP");
    console.log(data);
    const resp = await SignUp(data.first_name, data.last_name, data.email, data.password, data.confirm_password);
    if (resp) {
      setErrors(resp.error);
    }
  }


  return (
    <main className="flex items-center justify-center md:h-screen">
      <Image
        src={('/textbannerBROWN.png')}
        width="900"
        height="900"
        alt="Scroll"
        className={"h-auto w-[800px] md:w-[800px] lg:w-[800px] xl:w-[800px] absolute"}
        priority
        style={{
          objectFit: 'cover',
          zIndex: -1
        }}
      />
      <form onSubmit={handleSubmit(onSubmit)} >
        <div className="w-full grid gap-0 items-center">
          {(<p className="text-xs italic text-red-500 mt-2">{submit_errors}</p>)}
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

          <div className="">
            <label
              className="mb-3 mt-5 block text-xs font-medium text-gray-900"
              htmlFor="first_name"
            >
              First
            </label>
            <div className="relative">
              <input
                {...register("first_name")}
                className="peer block w-full rounded-md border border-gray-200 py-[9px] pl-10 text-sm outline-2 placeholder:text-gray-500"
                id="first_name"
                name="first_name"
                placeholder="First"
                required
              />
              {errors.first_name && (<p className="text-xs italic text-red-500 mt-2">{errors.first_name?.message}</p>)}
            </div>
          </div>

          <div className="">
            <label
              className="mb-3 mt-5 block text-xs font-medium text-gray-900"
              htmlFor="first"
            >
              Last
            </label>
            <div className="relative">
              <input
                {...register("last_name")}
                className="peer block w-full rounded-md border border-gray-200 py-[9px] pl-10 text-sm outline-2 placeholder:text-gray-500"
                id="last_name"
                name="last_name"
                placeholder="Last"
                required
              />
              {errors.last_name && (<p className="text-xs italic text-red-500 mt-2">{errors.last_name?.message}</p>)}
            </div>
          </div>

          <div className="">
            <label
              className="mb-3 mt-5 block text-xs font-medium text-gray-900"
              htmlFor="password"
            >
              Password
            </label>
            <div className="relative">
              <input
                {...register("password")}
                className="peer block w-full rounded-md border border-gray-200 py-[9px] pl-10 text-sm outline-2 placeholder:text-gray-500"
                id="password"
                name="password"
                type="password"
                placeholder="Enter password"
                required
              />
              {errors.password && (<p className="text-xs italic text-red-500 mt-2">{errors.password?.message}</p>)}
            </div>
          </div>
          <div className="">
            <label
              className="mb-3 mt-5 block text-xs font-medium text-gray-900"
              htmlFor="confirm_password"
            >
              Confim Password
            </label>
            <div className="relative">
              <input
                {...register("confirm_password")}
                className="peer block w-full rounded-md border border-gray-200 py-[9px] pl-10 text-sm outline-2 placeholder:text-gray-500"
                id="confirm_password"
                name="confirm_password"
                type="password"
                placeholder="Enter password again"
                required
              />
              {errors.confirm_password && (<p className="text-xs italic text-red-500 mt-2">{errors.confirm_password?.message}</p>)}
            </div>
          </div>

        </div>
        <Button type="submit" className="mt-4 justify-self-stretch">Sign Up</Button>
        <p className="text-s italic text-grey-500 mt-2 hover:text-blue-500 cursor-pointer" onClick={() => router.push('/login')}>Already a member? Log In!</p>
      </form>
    </main>
  );
}
