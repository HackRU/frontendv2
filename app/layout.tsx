import '@/app/ui/global.css';
import { inter } from '@/app/ui/fonts';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: {
    template: '%s | HackRU S24',
    default: 'HackRU S24',
  },
  description:
    "HackRU is a 24-hour hackathon hosted at Rutgers University. Join us for HackRU's Spring 2024 edition!",
  metadataBase: new URL('https://hackru.org'),
  icons: {
    icon: '/icon.png',
  },
  keywords:
    'Hackathon, HackRU, Rutgers, Technology, Programming, Innovation, Challenge',
  //openGraph to set metadata for social media sharing
  openGraph: {
    title: 'HackRU S24',
    description:
      'HackRU is a 24-hour hackathon Rutgers University. We welcome hundreds of students to join us in building awesome tech projects. Industry experts and mentors help foster an atmosphere of learning through tech-talks and one-on-one guidance. We encourage all students, no matter their experience level or educational background, to challenge themselves and expand their creative, technical, and collaboration skills at HackRU',
    images: '/icon.png',
  },
};
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${inter.className} antialiased`}>
        <main>{children}</main>
      </body>
    </html>
  );
}
