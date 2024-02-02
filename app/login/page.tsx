"use client"

import { Button } from '@/app/ui/button';



import { authenticate, authUser } from '../lib/actions';

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from 'zod';

import { useState } from "react";


export default function LoginPage() {


  const LoginSchema = z.object({
    email: z.string().email(),
    password: z.string(),
  });

  type Login = z.infer<typeof LoginSchema>;

  const [submit_errors, setErrors] = useState("");



  const {register,handleSubmit,reset, formState: { errors },} = useForm<Login>({resolver: zodResolver(LoginSchema)});

  const onSubmit = async (data: Login) => {
    console.log("Hi");
    const resp = await authenticate(data.email, data.password);
    setErrors(resp);
  }



  return (
    <main className="flex items-center justify-center md:h-screen">
        <form onSubmit={handleSubmit(onSubmit)} >
        <div className="w-full">
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
            </div>
            {errors.email && (<p className="text-xs italic text-red-500 mt-2">{errors.email?.message}</p>)}
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
                {...register("password")}
                className="peer block w-full rounded-md border border-gray-200 py-[9px] pl-10 text-sm outline-2 placeholder:text-gray-500"
                id="password"
                type="password"
                name="password"
                placeholder="Enter password"
                required
              />
              {errors.password && (<p className="text-xs italic text-red-500 mt-2">{errors.password?.message}</p>)}
            </div>
          </div>
        </div>
        <Button type = "submit">Log in</Button>
        </form>
    </main>
  );
}
