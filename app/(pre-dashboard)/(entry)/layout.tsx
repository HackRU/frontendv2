import Image from 'next/image';
import { inter } from '@/app/ui/fonts';

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <main
      className={`relative min-h-screen w-full overflow-hidden ${inter.className}`}
      style={
        {
          '--bg-color': '#081420',
          '--bg-color2': '#102233',
          '--mainText-color': '#e2e8f0',
          '--border-color': 'rgba(148, 163, 184, 0.35)',
          '--placeholder-color': '#94a3b8',
          '--error-color': '#fda4af',
          '--success-color': '#86efac',
          '--hover-color': '#7dd3fc',
          background:
            'linear-gradient(135deg, #020817 0%, #0b1120 35%, #111827 100%)',
        } as React.CSSProperties
      }
    >
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(56,189,248,0.12),transparent_32%)]" />
      <div className="relative z-10 flex min-h-screen w-full items-center justify-center">
        {children}
      </div>
    </main>
  );
}
