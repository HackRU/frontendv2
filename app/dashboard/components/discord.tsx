'use client';

import { Button } from '@/app/dashboard/components/button';
import { getOAuthUrl, setDiscord } from '@/app/lib/actions';
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
    <div className="grid w-full items-center gap-4">
      {submit_errors && (
        <p className="text-xs italic text-red-400">{submit_errors}</p>
      )}
      {userData.discord != undefined && userData.discord.username && (
        <p className="text-sm text-slate-200 italic">
          Connected as {userData.discord.username}
        </p>
      )}
      <a
        href="https://discord.gg/yt65RGgN4x"
        className="text-sm text-sky-300 underline-offset-4 hover:text-sky-200 hover:underline sm:text-base"
      >
        Join Here! https://discord.gg/yt65RGgN4x
      </a>
      <Button
        className={`mt-1 w-full justify-center rounded-xl font-semibold ${
          discordAuth
            ? 'bg-emerald-400 text-slate-900 hover:bg-emerald-300'
            : 'bg-[#f7a9a4] text-slate-900 hover:bg-[#f8b7b2]'
        }`}
        onClick={() => getOAuth()}
      >
        Verify Discord Account
      </Button>
    </div>
  );
}
