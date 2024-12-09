"use client";

import { Button } from '@/app/ui/button';
import { SignUp } from '../../../lib/api/actions';
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from 'zod';
import { useState } from "react";
import Image from 'next/image';
import { useRouter } from 'next/navigation';

export default function SignupPage() {
  const SignUpSchema = z.object({
    email: z.string().email("Please enter a valid email address").nonempty("Please fill out the email field"),
    first_name: z.string().nonempty("Please fill out the first name field"),
    last_name: z.string().nonempty("Please fill out the last name field"),
    password: z.string().min(4, "Password must be at least 4 characters").nonempty("Please fill out the password field"),
    confirm_password: z.string().nonempty("Please confirm your password")
  }).refine((data) => data.password === data.confirm_password, {
    message: "Passwords don't match",
    path: ["confirm_password"],
  });

  type SignUp = z.infer<typeof SignUpSchema>;

  const { register, handleSubmit, formState: { errors } } = useForm<SignUp>({
    resolver: zodResolver(SignUpSchema),
  });

  const [submit_errors, setErrors] = useState("");
  const [loading, setLoading] = useState(false);
  const [submitErrors, setSubmitErrors] = useState<string[]>([]);
  const router = useRouter();

  const onSubmit = async (data: SignUp) => {
    setLoading(true);
    const resp = await SignUp(data.first_name, data.last_name, data.email, data.password, data.confirm_password);
    setLoading(false);
    if (resp) {
      setErrors(resp.error);
    }
  };

  const onError = (errorList: any) => {
    const errorMessages: string[] = Object.keys(errors).map((field) => {
      type FieldKey = keyof SignUp; // Defining possible keys from the SignUp type

      const typedField = field as FieldKey; // Casting field to the specific known type
      if (errors[typedField]?.message) {
        return `${typedField.replace("_", " ")}: ${errors[typedField]?.message}`;
      }
      return `${typedField.replace("_", " ")} is required`;
    });

    setSubmitErrors(errorMessages);
  };

  return (

    <main className="flex items-center justify-center w-screen h-screen">
      <form onSubmit={handleSubmit(onSubmit, onError)} className="bg-gradient-to-b from-offblack-100 to-[#453148] p-20 rounded-xl">
        <div className="w-full grid gap-0 items-center">
          {submit_errors && (<p className="text-xs italic text-red-500 ">{submit_errors}</p>)}
          <p className="text-s italic text-white">Press Sign up Button or Enter to Sign up</p>
          <div>
            <label
              className="mb-3 mt-4 block text-xs font-medium text-white"
              htmlFor="email"
            >
              Email
            </label>
            <div className="relative">
              <input
                {...register("email")}
                className="peer block w-full rounded-md border border-gray-200 py-[9px] pl-4 text-sm outline-2 placeholder:text-gray-500"
                id="email"
                type="email"
                name="email"
                placeholder="Enter your email address"
              />
              {errors.email && (
                <p className="text-xs italic text-red-500 mt-2">
                  {errors.email.message}
                </p>
              )}
            </div>
          </div>

          <div className="">
            <label
              className="mb-3 mt-5 block text-xs font-medium text-white"
              htmlFor="first_name"
            >
              First Name
            </label>
            <div className="relative">
              <input
                {...register("first_name")}
                className="peer block w-full rounded-md border border-gray-200 py-[9px] pl-4 text-sm outline-2 placeholder:text-gray-500"
                id="first_name"
                name="first_name"
                placeholder="First"
              />
              {errors.first_name && (
                <p className="text-xs italic text-red-500 mt-2">
                  {errors.first_name.message}
                </p>
              )}
            </div>
          </div>

          <div className="">
            <label
              className="mb-3 mt-5 block text-xs font-medium text-white"
              htmlFor="last_name"
            >
              Last Name
            </label>
            <div className="relative">
              <input
                {...register("last_name")}
                className="peer block w-full rounded-md border border-gray-200 py-[9px] pl-4 text-sm outline-2 placeholder:text-gray-500"
                id="last_name"
                name="last_name"
                placeholder="Last"
              />
              {errors.last_name && (
                <p className="text-xs italic text-red-500 mt-2">
                  {errors.last_name.message}
                </p>
              )}
            </div>
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
                className="peer block w-full rounded-md border border-gray-200 py-[9px] pl-4 text-sm outline-2 placeholder:text-gray-500"
                id="password"
                name="password"
                type="password"
                placeholder="Enter password"
              />
              {errors.password && (
                <p className="text-xs italic text-red-500 mt-2">
                  {errors.password.message}
                </p>
              )}
            </div>
          </div>

          <div className="">
            <label
              className="mb-3 mt-5 block text-xs font-medium text-white"
              htmlFor="confirm_password"
            >
              Confirm Password
            </label>
            <div className="relative">
              <input
                {...register("confirm_password")}
                className="peer block w-full rounded-md border border-gray-200 py-[9px] pl-4 text-sm outline-2 placeholder:text-gray-500"
                id="confirm_password"
                name="confirm_password"
                type="password"
                placeholder="Enter password again"
              />
              {errors.confirm_password && (
                <p className="text-xs italic text-red-500 mt-2">
                  {errors.confirm_password.message}
                </p>
              )}
            </div>
          </div>
        </div>
        <div className="text-center">
          <Button type="submit" className="mt-4 justify-self-stretch">
            {loading ? 'Loading...' : 'Sign Up'} </Button>
        </div>
        <p className="text-s italic text-white mt-2 text-center hover:text-blue-500 cursor-pointer" onClick={() => router.push('/login')}>
          Already a member? Log In!
        </p>
      </form>
    </main>
  );
}
