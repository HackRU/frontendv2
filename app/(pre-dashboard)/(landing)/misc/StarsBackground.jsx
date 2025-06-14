/*'use client';

import React, { useMemo } from 'react';
import clsx from 'clsx';
import { usePathname } from 'next/navigation';
const possibleColors = ['triangle-orange-star', 'triangle-blue-star'];
const possibleCandles = [
  'candle 1 with glow.png',
  'candle 2 with glow.png',
  'candle 3 with glow.png',
  'candle 4 with glow.png',
  'candle 5 with glow.png',
];

const candlePositions = [
  {
    x: `40%`, //value betw 0 and 100
    y: `25vh`,
  }, //value betw 0 and 75

  {
    x: `12%`, //value betw 0 and 100
    y: `10vh`,
  }, //value betw 0 and 75

  {
    x: `12%`, //value betw 0 and 100
    y: `50vh`,
  }, //value betw 0 and 75

  {
    x: `12%`, //value betw 0 and 100
    y: `65vh`,
  }, //value betw 0 and 75

  {
    x: `45%`, //value betw 0 and 100
    y: `60vh`,
  }, //value betw 0 and 75

  {
    x: `50%`, //value betw 0 and 100
    y: `70vh`,
  }, //value betw 0 and 75

  {
    x: `80%`, //value betw 0 and 100
    y: `10vh`,
  }, //value betw 0 and 75

  {
    x: `84%`, //value betw 0 and 100
    y: `15vh`,
  }, //value betw 0 and 75

  {
    x: `82%`, //value betw 0 and 100
    y: `50vh`,
  }, //value betw 0 and 75

  {
    x: `95`, //value betw 0 and 100
    y: `20vh`,
  }, //value betw 0 and 75
];

const ClientOnly = ({ children, ...delegated }) => {
  const [hasMounted, setHasMounted] = React.useState(false);

  React.useEffect(() => {
    setHasMounted(true);
  }, []);

  if (!hasMounted) return null;

  return <React.Fragment {...delegated}>{children}</React.Fragment>;
};

const Star = ({ style }) => {
  return <div style={style} className={style.className} />;
};

const Candle = ({ style }) => {
  return (
    <img src={'/landing/' + style.source} width={style.width} style={style} />
  );
};

const createStarStyle = () => ({
  position: 'absolute',
  top: `${98 * Math.random()}%`,
  left: `${98 * Math.random()}%`,
  className: possibleColors[Math.floor(Math.random() * possibleColors.length)],
  animation: `twinkling ${Math.random() * 2 + 1}s infinite`,
});

const createCandleStyle = () => ({
  position: 'absolute',
  opacity: `${(50 + 10 * Math.floor(6 * Math.random())) / 100}`,
  width: `170px`,
  transform: `rotate(${0.1 * Math.random() - 0.05}turn)`,
  source: possibleCandles[Math.floor(Math.random() * possibleCandles.length)],
});

const LANDING_PAGE_STAR_COUNT = 150;
const NOT_LANDING_PAGE_STAR_COUNT = 50;

const LANDING_PAGE_CANDLE_COUNT = 10;
const NOT_LANDING_PAGE_CANDLE_COUNT = 10;

export function StarryBackground() {
  const pathname = usePathname();
  const numberOfStars =
    pathname === '/' ? LANDING_PAGE_STAR_COUNT : NOT_LANDING_PAGE_STAR_COUNT;

  const numberOfCandles =
    pathname === '/'
      ? LANDING_PAGE_CANDLE_COUNT
      : NOT_LANDING_PAGE_CANDLE_COUNT;

  const stars = useMemo(() => {
    return Array.from({ length: numberOfStars }, createStarStyle);
  }, [numberOfStars]);

  const candles = useMemo(() => {
    const candleStyleArray = Array.from(
      { length: numberOfCandles },
      createCandleStyle,
    );

    return candleStyleArray.map((style, index) => {
      style.left = candlePositions[index].x;
      style.top = candlePositions[index].y;
      return style;
    });
  }, [numberOfCandles]);

  return (
    <ClientOnly>
      <div
        className={clsx('absolute left-0 top-0 h-full w-full', {
          '-z-10': pathname !== '/',
        })}
      >
        {stars.map((style, index) => (
          <Star key={index} style={style} />
        ))}
        {candles.map((style, index) => (
          <Candle key={index} style={style} />
        ))}
      </div>
    </ClientOnly>
  );
}

*/
