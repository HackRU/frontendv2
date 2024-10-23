'use client';

import Tetris from '@/app/games/Tetris';
import Image from 'next/image';
import { useRouter } from 'next/navigation';

export default function GamePage() {
  const router = useRouter();

  return (
    <main className="flex w-screen items-center justify-center md:h-screen ">
      <div
        style={{ left: '5%', top: '24px' }}
        className="hover:drop-shadow-inner absolute z-50 w-12 hover:scale-105 sm:w-16 md:w-20 lg:w-24"
        onClick={() => router.push('/')}
      >
        <Image
          width={84}
          height={84}
          src="/landing/hrulogo_2.png"
          alt="neon hackru logo"
        />
      </div>
      <Image
        src="/games/background.png"
        layout="fill"
        quality={100}
        alt=""
        priority
        style={{
          objectFit: 'cover',
          zIndex: -1,
        }}
      />
      <Tetris />
    </main>
  );
}
