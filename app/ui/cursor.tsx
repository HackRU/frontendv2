"use client";

import React, { useState, useEffect } from "react";
import Image from 'next/image'

const Cursor = () => {
  const [position, setPosition] = useState({ x: 0, y: 0 });

  const [isPointer, setIsPointer] = useState(false);

  const handleMouseMove = (e: any) => {
    setPosition({ x: e.clientX, y: e.clientY });

    const target = e.target;

    setIsPointer(
      window.getComputedStyle(target).getPropertyValue("cursor") === "pointer"
    );

    e.stopPropagation();
  };

  useEffect(() => {
    window.addEventListener("mousemove", handleMouseMove);

    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  const YSize = isPointer ? 0 : 100;
  const XSize = isPointer ? 0 : 20;
  const rotationAngle = isPointer ? 0 : 315;
  var topPos = position.y - YSize / 2;
  
  const cursorStyle = isPointer ? { display: "none" } : { transform: `rotate(${rotationAngle}deg)`, cursor: "none"};

  return (
    <Image
      src={"/landing/wand.png"}
      alt="Custom Cursor"
      width = {XSize}
      height = {YSize}
      style={{
        ...cursorStyle,
        position: "fixed",
        left: `${position.x - XSize / 2}px`,
        top:`${topPos}px`,
      }}
    />
  );
};

export default Cursor;