"use client"

import { Button } from '@/app/ui/button';
import Image from 'next/image';
import {Item} from './item'


import { SetSelfRaffle, GetSelfRaffle } from '../../../lib/data';

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from 'zod';

import { useState,  useEffect } from "react";
import { GetRaffle } from '@/app/lib/actions';

export default function SignupPage() {

  const SignUpSchema = z.object({
    amount: z.coerce.number(),

  });

  type SignUp = z.infer<typeof SignUpSchema>;



  const { register, handleSubmit, reset, trigger, formState: { errors }, } = useForm<SignUp>({ resolver: zodResolver(SignUpSchema) });

  const [message, setMessage] = useState("");
  const [buttonDisabled, setButtonDisabled] = useState(false)
  const [raffleData, setRaffleData] = useState<any>(null);

  const onSubmit = async (data: SignUp) => {
    setButtonDisabled(true);
    console.log(raffleData)
    //SignUpSchema.parse(raffleData)
    const resp = await SetSelfRaffle(data.amount);
    setMessage(resp);
    setTimeout(() => {  // wait 1 minutes between requests
      setButtonDisabled(false);
    }, 10);


  }

  useEffect(() => {
    async function fetchRaffle() {
      try {
        //const data = await GetSelfRaffle();
        setRaffleData({amount:"200"});
        console.log("Hi")
        
      } catch (error) {
        console.log(error);
      }
    }

    fetchRaffle();
    reset();

  }, []);

  return (
    <main className="flex items-center justify-center h-screen w-screen">
      <form onSubmit={handleSubmit(onSubmit)} className=''>
        <Item     
        name = "amount"
        message={message}
    register={register}
    raffleData={raffleData}
    setRaffleData={setRaffleData}
    errors={errors.amount?.message}></Item>
        <Button type="submit" disabled={buttonDisabled}>
          {buttonDisabled ? "Please wait 1 minute between requests!" : "Submit Amount"}
        </Button>
      </form>
    </main>
  );
}
