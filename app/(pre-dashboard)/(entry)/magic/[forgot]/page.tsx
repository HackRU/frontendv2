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
          {(<p className="text-xs italic text-red-500 mt-2">{submit_errors}</p>)}
          {(<p className="text-xs italic text-green-500 mt-2">{success}</p>)}
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
                className="peer block w-96 rounded-md border border-gray-200 py-[9px] pl-4 text-sm outline-2 placeholder:text-gray-500"
                id="email"
                type="email"
                name="email"
                placeholder="Enter your email address"
                required
              />
              {errors.email && (<p className="text-xs italic text-red-500 mt-2">{errors.email?.message}</p>)}
            </div>
          </div>

          <div className="mt-4">
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
          <div className="mt-4">
            <label
              className="mb-3 mt-5 block text-xs font-medium text-white"
              htmlFor="confirm_password"
            >
              Confim Password
            </label>
            <div className="relative">
              <input
                {...register("confirm_password")}
                className="peer block w-96 rounded-md mb-4 border border-gray-200 py-[9px] pl-4 text-sm outline-2 placeholder:text-gray-500"
                id="confirm_password"
                type="password"
                name="confirm_password"
                placeholder="Enter password again"
                required
              />
              {errors.confirm_password && (<p className="text-xs italic text-red-500 mt-2">{errors.confirm_password?.message}</p>)}
            </div>
          </div>

        </div>
        <Button type="submit">Reset Password</Button>
      </form>
    </main>
  );
}