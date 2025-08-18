import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    screens: {
      xx: '0px',
      xs: '320px',
      sm: '576px',
      md: '768px',
      lg: '1024px',
      xl: '1280px',
    },
    extend: {
      dropShadow: {
        glow: [
          '0 0px 20px rgba(255,255, 255, 0.35)',
          '0 0px 65px rgba(255, 255,255, 0.2)',
        ],
        blueGlow: ['0 0px 5px rgba(81, 244, 255, 0.7)'],
      },
      gridTemplateColumns: {
        '13': 'repeat(13, minmax(0, 1fr))',
      },
      colors: {
        cyan: {
          100: '#6FBCC4',
        },
        brownblack: {
          100: '#775721',
        },
        brown: {
          100: '#261A16',
        },
        beige: {
          100: '#CAB685',
        },
        gold: {
          100: '#FEC24A',
        },
        brownred: {
          100: '#B47027',
        },
        green: {
          100: '#7F9901',
        },
        darkcyan: {
          100: '#1A3127',
        },
        redorange: {
          100: '#AC3F00',
        },
        yellow: {
          100: '#FFBC21',
        },
        jade: {
          100: '#4C855A',
        },
        dark_red: {
          100: '#6D1E00',
        },
        off_white: {
          100: '#F9F3E9',
        },
        tan: {
          100: '#C49D52',
        },
        tan_2: {
          100: '#DDC78B',
        },
        s2025black: {
          100: '#1E1E1E',
        },
        blue: {
          100: '#1ED4FE',
          200: '#536F91',
          300: '#2B3941',
          400: '#172335',
          500: '#141719',
        },
        dark_blue_figma: '#1B1F23',
        orange: {
          100: '#EC9655',
          200: '#1B1F23',
        },
        pink: {
          100: '#C3557D',
        },
        offblack: {
          100: '#172335',
        },
      },
    },
    keyframes: {
      shimmer: {
        '100%': {
          transform: 'translateX(100%)',
        },
      },
    },
  },
  plugins: [require('@tailwindcss/forms')],
};
export default config;
