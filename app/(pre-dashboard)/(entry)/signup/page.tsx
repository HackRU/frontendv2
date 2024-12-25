"use client";

import { Button } from '@/app/ui/button';
import { SignUp } from '../../../lib/actions';
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
<<<<<<< HEAD
    password: z.string().min(6, "Password must be at least 6 characters").nonempty("Please fill out the password field"),
=======
    password: z.string().min(4, "Password must be at least 4 characters").nonempty("Please fill out the password field"),
>>>>>>> 7d88ae071d93fc5807d93d82029bc811c4cc4d79
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
<<<<<<< HEAD
  const [submitErrors, setSubmitErrors] = useState<string[]>([]);

=======
  const [loading, setLoading] = useState(false);
  const [submitErrors, setSubmitErrors] = useState<string[]>([]);
>>>>>>> 7d88ae071d93fc5807d93d82029bc811c4cc4d79
  const router = useRouter();

  const onSubmit = async (data: SignUp) => {
    setLoading(true);
    const resp = await SignUp(data.first_name, data.last_name, data.email, data.password, data.confirm_password);
    setLoading(false);
    if (resp) {
      setErrors(resp.error);
    }
<<<<<<< HEAD
  }
  

  const onError = (errorList: any) => {
    const errorMessages: string[] = Object.keys(errors).map((field) => {
      if (errors[field]?.message) {
        return `${field.replace("_", " ")}: ${errors[field]?.message}`;
      }
      return `${field.replace("_", " ")} is required`;
    });
    setSubmitErrors(errorMessages);
    
  };
=======
  };

  const onError = (errorList: any) => {
    const errorMessages: string[] = Object.keys(errors).map((field) => {
      type FieldKey = keyof SignUp; // Defining possible keys from the SignUp type
>>>>>>> 7d88ae071d93fc5807d93d82029bc811c4cc4d79

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
<<<<<<< HEAD
      <Image
        src={('/Rectangle1.png')}
        width="900"
        height="900"
        alt="Scroll"
        className={"h-[500px] w-[800px] sm:h-auto md:w-[800px] lg:w-[800px] xl:w-[800px] absolute"}
        priority
        style={{
          objectFit: 'cover',
          zIndex: -1,
        }}
      />
      <form onSubmit={handleSubmit(onSubmit, onError)} className="h-[300px] overflow-y-scroll sm:h-[400px] md:h-fit md:overflow-y-hidden ">
      <div className="w-full grid gap-0 items-center">
      {}
      {}
        
          <div className='w-full'>
            <p className="text-s italic text-white">Press Sign up Button or Enter to Sign up</p>
            <label className="mb-3 mt-4 block text-xs font-medium text-white" htmlFor="email">
=======
      <form onSubmit={handleSubmit(onSubmit, onError)} className="bg-gradient-to-b from-offblack-100 to-[#453148] p-20 rounded-xl">
        <div className="w-full grid gap-0 items-center">
          {submit_errors && (<p className="text-xs italic text-red-500 ">{submit_errors}</p>)}
          <p className="text-s italic text-white">Press Sign up Button or Enter to Sign up</p>
          <div>
            <label
              className="mb-3 mt-4 block text-xs font-medium text-white"
              htmlFor="email"
            >
>>>>>>> 7d88ae071d93fc5807d93d82029bc811c4cc4d79
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
<<<<<<< HEAD
                //required
              />
              {errors.email && (
                <p className="text-xs italic text-red-500 mt-2">
                  {errors.email.message || "Email is required"}
=======
              />
              {errors.email && (
                <p className="text-xs italic text-red-500 mt-2">
                  {errors.email.message}
>>>>>>> 7d88ae071d93fc5807d93d82029bc811c4cc4d79
                </p>
              )}
            </div>
          </div>
<<<<<<< HEAD
  
          
          <div>
            <label className="mb-3 mt-5 block text-xs font-medium text-white" htmlFor="first_name">
=======

          <div className="">
            <label
              className="mb-3 mt-5 block text-xs font-medium text-white"
              htmlFor="first_name"
            >
>>>>>>> 7d88ae071d93fc5807d93d82029bc811c4cc4d79
              First Name
            </label>
            <div className="relative">
              <input
                {...register("first_name")}
                className="peer block w-full rounded-md border border-gray-200 py-[9px] pl-4 text-sm outline-2 placeholder:text-gray-500"
                id="first_name"
                name="first_name"
<<<<<<< HEAD
                placeholder="First Name"
                //required
              />
              {errors.first_name && (
                <p className="text-xs italic text-red-500 mt-2">
                  {errors.first_name.message || "First name is required"}
=======
                placeholder="First"
              />
              {errors.first_name && (
                <p className="text-xs italic text-red-500 mt-2">
                  {errors.first_name.message}
>>>>>>> 7d88ae071d93fc5807d93d82029bc811c4cc4d79
                </p>
              )}
            </div>
          </div>
<<<<<<< HEAD
  
          
          <div>
            <label className="mb-3 mt-5 block text-xs font-medium text-white" htmlFor="last_name">
=======

          <div className="">
            <label
              className="mb-3 mt-5 block text-xs font-medium text-white"
              htmlFor="last_name"
            >
>>>>>>> 7d88ae071d93fc5807d93d82029bc811c4cc4d79
              Last Name
            </label>
            <div className="relative">
              <input
                {...register("last_name")}
                className="peer block w-full rounded-md border border-gray-200 py-[9px] pl-4 text-sm outline-2 placeholder:text-gray-500"
                id="last_name"
                name="last_name"
<<<<<<< HEAD
                placeholder="Last Name"
                //required
              />
              {errors.last_name && (
                <p className="text-xs italic text-red-500 mt-2">
                  {errors.last_name.message || "Last name is required"}
=======
                placeholder="Last"
              />
              {errors.last_name && (
                <p className="text-xs italic text-red-500 mt-2">
                  {errors.last_name.message}
>>>>>>> 7d88ae071d93fc5807d93d82029bc811c4cc4d79
                </p>
              )}
            </div>
          </div>
  
          
          <div>
            <label className="mb-3 mt-5 block text-xs font-medium text-white" htmlFor="password">
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
<<<<<<< HEAD
                //required
              />
              {errors.password && (
                <p className="text-xs italic text-red-500 mt-2">
                  {errors.password.message || "Password is required"}
=======
              />
              {errors.password && (
                <p className="text-xs italic text-red-500 mt-2">
                  {errors.password.message}
>>>>>>> 7d88ae071d93fc5807d93d82029bc811c4cc4d79
                </p>
              )}
            </div>
          </div>
<<<<<<< HEAD
  
          
          <div>
            <label className="mb-3 mt-5 block text-xs font-medium text-white" htmlFor="confirm_password">
=======

          <div className="">
            <label
              className="mb-3 mt-5 block text-xs font-medium text-white"
              htmlFor="confirm_password"
            >
>>>>>>> 7d88ae071d93fc5807d93d82029bc811c4cc4d79
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
<<<<<<< HEAD
                //required
              />
              {errors.confirm_password && (
                <p className="text-xs italic text-red-500 mt-2">
                  {errors.confirm_password.message || "Confirm password is required"}
=======
              />
              {errors.confirm_password && (
                <p className="text-xs italic text-red-500 mt-2">
                  {errors.confirm_password.message}
>>>>>>> 7d88ae071d93fc5807d93d82029bc811c4cc4d79
                </p>
              )}
            </div>
          </div>
<<<<<<< HEAD
  
        </div>
        <div className="text-center">
          <Button type="submit" className="mt-4 justify-self-stretch">Sign Up</Button>
        </div>
        <p
          className="text-s italic text-white mt-2 text-center hover:text-blue-500 cursor-pointer"
          onClick={() => router.push('/login')}
        >
=======
        </div>
        <div className="text-center">
          <Button type="submit" className="mt-4 justify-self-stretch">
            {loading ? 'Loading...' : 'Sign Up'} </Button>
        </div>
        <p className="text-s italic text-white mt-2 text-center hover:text-blue-500 cursor-pointer" onClick={() => router.push('/login')}>
>>>>>>> 7d88ae071d93fc5807d93d82029bc811c4cc4d79
          Already a member? Log In!
        </p>
      </form>
    </main>
  );
  
}
