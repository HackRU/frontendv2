'use client';
import React from 'react';
import { hackRUFAQ } from '@/app/lib/constants';
import Accordian from './Accordian';

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
      <hr />
    </div>
  );
}

export default function FAQ() {
  return (
    <div
      id="FAQ"
      className="relative flex w-full flex-col items-center justify-start overflow-visible"
    >
      <div className="relative flex w-full max-w-7xl flex-col items-center pb-[24rem]">
        <QuestionContainer />
      </div>
    </div>
  );
}
