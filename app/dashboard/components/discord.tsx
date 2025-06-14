'use client';

import { Button } from '@/app/ui/button';

import { getOAuthUrl, setDiscord } from '@/app/lib/actions';

import { UpdateSelf } from '@/app/lib/data';

import { useState, useEffect } from 'react';
import { redirect } from 'next/navigation';

import { useRouter } from 'next/navigation';

export default function DiscordAuth(props: {
  userData: any;
  code: string | null;
}) {
  const { userData, code } = props;

  const [submit_errors, setErrors] = useState<string | undefined>('');

  const [discordAuth, setdiscordAuth] = useState<Boolean>(
    userData?.discord != undefined && userData?.discord?.user_id != '',
  );

  const router = useRouter();

  const getOAuth = async () => {
    if (!discordAuth) {
      console.log('REDIRECT TO AUTH');
      const Oauth = await getOAuthUrl();
      router.push(Oauth.url);
    }
  };

  const setHackRU = async () => {
    if (code != null) {
      console.log('SEND REQUEST');
      //setdiscordAuth(true);
      const resp = await setDiscord(code);
      if (resp != null) {
        setErrors(resp.error);
        if (resp.response != '') {
          setdiscordAuth(true);
          redirect('/dashboard');
        }
      }
    }
  };

  useEffect(() => {
    setHackRU();
  }, []);

  return (
    <div className="grid w-full items-center gap-0">
      {<p className="text-xs italic text-red-500">{submit_errors}</p>}
      {
        <p className="text-xs italic">
          {userData.discord != undefined ? userData.discord.username : ''}
        </p>
      }
      <a
        href="https://discord.gg/yt65RGgN4x"
        className="text-s hover:underline"
      >
        Join Here! https://discord.gg/yt65RGgN4x
      </a>
      <Button
        className={`mt-4 justify-center ${discordAuth ? 'bg-green-400' : 'bg-red-400 disabled:bg-slate-400'} `}
        onClick={() => getOAuth()}
      >
        Verify Discord Account
      </Button>
    </div>
  );
}
