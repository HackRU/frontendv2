'use client';

import React, { useEffect, useRef, useMemo } from 'react';
import { TweenMax } from 'gsap/TweenMax';
const possibleColors = ['triangle-orange-star', 'triangle-blue-star'];

const ClientOnly = ({ children, ...delegated }) => {
  const [hasMounted, setHasMounted] = React.useState(false);

  React.useEffect(() => {
    setHasMounted(true);
  }, []);

  if (!hasMounted) return null;

  return <React.Fragment {...delegated}>{children}</React.Fragment>;
};

const Star = ({ style, onAnimateComplete }) => {
  const ref = useRef(null);

  useEffect(() => {
    const animate = () => {
      TweenMax.to(ref.current, Math.random() * 0.5 + 0.5, {
        opacity: Math.random(),
        onComplete: animate,
      });
    };
    animate();
  }, [onAnimateComplete]);

  return <div ref={ref} style={style} className={style.className} />;
};

const createStarStyle = () => ({
  position: 'absolute',
  top: `${98 * Math.random()}%`,
  left: `${100 * Math.random()}%`,
  className: possibleColors[Math.floor(Math.random() * possibleColors.length)],
});

export function StarryBackground({ numberOfStars }) {
  const stars = useMemo(() => {
    return Array.from({ length: numberOfStars }, createStarStyle);
  }, [numberOfStars]);

  return (
    <ClientOnly>
      <div className="absolute left-0 top-0 z-0 h-full w-full">
        {stars.map((style, index) => (
          <Star key={index} style={style} />
        ))}
      </div>
    </ClientOnly>
  );
}
