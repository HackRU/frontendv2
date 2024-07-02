"use client"

import { Button } from '@/app/ui/button';

import { getOAuthUrl, setDiscord } from '@/app/lib/actions';

import {  useState, useEffect } from "react";

import { useRouter } from 'next/navigation'



export default function DiscordAuth(props: {
  userData: any;
  code: string|null;
}) {

  const { userData, code } = props;

  const [submit_errors, setErrors] = useState<string | undefined>("");

  const [discordAuth, setdiscordAuth] = useState<Boolean>(userData.discord.user_id != '');


  const router = useRouter();

  const getOAuth = async () =>{
    if(!discordAuth){
      console.log("REDIRECT TO AUTH")
      const Oauth = await getOAuthUrl()
      router.push(Oauth.url);
    }
  }
  
  const setHackRU = async () =>{
    console.log("Things")
    if (code != null){
      console.log("SEND REQUEST")
      //setdiscordAuth(true);
      const resp = await setDiscord(code);
      if(resp != null){
        setErrors(resp.error);
        if (resp.response != ''){
          setdiscordAuth(true);
        }
      }

    }
  }

  useEffect(() => {
    setHackRU();
  }, []);




  return (
        <div className="w-full grid gap-0 items-center">
          {(<p className="text-xs italic text-red-500 mt-2">{submit_errors}</p>)}
          {(<p className="text-xs italic mt-2">{userData.discord.username}</p>)}
          <Button className={`mt-4 justify-center ${discordAuth?"bg-green-400":"bg-red-400 disabled:bg-slate-400"} `} onClick={() => getOAuth()}>Verify Discord Account</Button>
        </div>
  );
}
