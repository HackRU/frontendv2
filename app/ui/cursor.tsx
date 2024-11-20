"use client";

import React, { useState, useEffect, useMemo } from "react";
import Image from 'next/image';
import LugeReact from "./luge";

/**
 *
 * Documentation: https://luge.cool/docs/custom-cursor/
 * Compatibility with Next.js Discussion: https://github.com/AntoineW/luge/discussions/9
 *
 * The day that Luge becomes deprecated or starts to break, cause problems, etc., it must be removed.
 *
 * 1. pnpm uninstall @waaark/luge
 * 2. Delete the TrailEffect component
 * 3. Delete all instances of data-lg-[...] in global.css
 */
const TrailEffect = () => {
  return (
    <>
      <LugeReact />
      <div data-lg-cursor data-lg-cursor-hide>
        <div data-lg-cursor-trail data-lg-cursor-trail-length="20" data-lg-cursor-inertia="0.4"></div>
      </div>
    </>
  );
}

function detectIfTouchDevice() {
  return (('ontouchstart' in window) ||
    (navigator.maxTouchPoints > 0) ||
    (navigator.maxTouchPoints > 0));
}

const Cursor = () => {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isTouchDevice, setIsTouchDevice] = useState(true);

  const [isPointer, setIsPointer] = useState(false);

  const handleMouseMove = (e: any) => {
    setPosition({ x: e.clientX, y: e.clientY });

    const target = e.target;

    setIsPointer(
      window.getComputedStyle(target).getPropertyValue("cursor") === "pointer"
    );
    // target.style.cursor = "none";

    e.stopPropagation();
  };

  useEffect(() => {
    window.addEventListener("mousemove", handleMouseMove);

    setIsTouchDevice(detectIfTouchDevice());

    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  const YSize = isPointer ? -150 : 120;
  const XSize = isPointer ? -150 : 30;
  const rotationAngle = isPointer ? 0 : 315;
  const topPos = (position.y - YSize / 4) + 15;
  const leftPos = (position.x - XSize / 4) - 5;

  const hasNotMoved = position.x === 0 && position.y === 0;

  return (
    <>
      <TrailEffect />
      <Image
        src={"/landing/pawcursor_2.png"}
        alt="Custom Cursor"
        width={XSize}
        height={YSize}
        className="select-none z-50"
        style={{
          display: hasNotMoved || isTouchDevice ? "none" : "block",
          transform: `rotate(${rotationAngle}deg)`,
          position: "fixed",
          left: `${leftPos}px`,
          top: `${topPos}px`,
          pointerEvents: "none",
        }}
      />
    </>
  );
};

export default Cursor;