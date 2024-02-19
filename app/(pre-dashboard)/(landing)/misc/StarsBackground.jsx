'use client';

import React, { useMemo } from 'react';
import clsx from 'clsx';
import { usePathname } from 'next/navigation';
const possibleColors = ['triangle-orange-star', 'triangle-blue-star'];

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

const createStarStyle = () => ({
  position: 'absolute',
  top: `${98 * Math.random()}%`,
  left: `${98 * Math.random()}%`,
  className: possibleColors[Math.floor(Math.random() * possibleColors.length)],
  animation: `twinkling ${Math.random() * 2 + 1}s infinite`,
});

const LANDING_PAGE_STAR_COUNT = 150;
const NOT_LANDING_PAGE_STAR_COUNT = 50;

export function StarryBackground() {
  const pathname = usePathname();
  const numberOfStars =
    pathname === '/' ? LANDING_PAGE_STAR_COUNT : NOT_LANDING_PAGE_STAR_COUNT;
  const stars = useMemo(() => {
    return Array.from({ length: numberOfStars }, createStarStyle);
  }, [numberOfStars]);

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
      </div>
    </ClientOnly>
  );
}
