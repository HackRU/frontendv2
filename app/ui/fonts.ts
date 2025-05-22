import {
  Inter,
  Lusitana,
  Bigelow_Rules,
  BIZ_UDGothic,
  Long_Cang,
} from 'next/font/google';

import localFont from 'next/font/local';

// Font files can be colocated inside of `pages`

export const fuzzy = localFont({
  src: [
    {
      path: '../../public/fonts/FuzzyBubbles-Bold.ttf',
      weight: '400',
    },
    {
      path: '../../public/fonts/FuzzyBubbles-Bold.ttf',
      weight: '700',
    },
  ],
  variable: '--font-fuzzy',
});

export const brush = localFont({
  src: [
    {
      path: '../../public/fonts/CaveatBrush-Regular.ttf',
      weight: '400',
    },
  ],
  variable: '--font-fuzzy',
});

export const inter = Inter({ subsets: ['latin'] });

export const bigelowRules = Bigelow_Rules({
  weight: ['400'],
  subsets: ['latin'],
});

export const bizUdg = BIZ_UDGothic({
  weight: ['400'],
  subsets: ['latin'],
});

export const lusitana = Lusitana({
  weight: ['400', '700'],
  subsets: ['latin'],
});

export const longCang = Long_Cang({
  weight: ['400'],
  subsets: ['latin'],
});
