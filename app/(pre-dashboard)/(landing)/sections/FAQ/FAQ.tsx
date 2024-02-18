'use client';
import React from 'react';
import { hackRUFAQ } from '@/app/lib/constants';
import Accordian from './Accordion';

function QuestionContainer() {
  return (
    <div className="w-full">
      {Object.keys(hackRUFAQ).map((question: string, i: number) => (
        <Accordian
          key={i}
          question={question}
          answer={Object.values(hackRUFAQ)[i]}
        />
      ))}
    </div>
  );
}

export default function FAQ() {
  return (
    <div
      id="FAQ"
      className="relative flex w-full flex-col items-center justify-start overflow-visible z-10 h-fit"
    >
      <div className="relative flex w-full px-[10vw] xl:px-[15vw] flex-col items-center pb-[10rem]">
        <QuestionContainer />
      </div>
    </div>
  );
}
