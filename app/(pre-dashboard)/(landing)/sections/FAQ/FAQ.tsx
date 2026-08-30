'use client';
import React from 'react';
import { hackRUFAQ } from '@/app/lib/constants';
import Accordian from './Accordion';
import { useState } from 'react';
import { fredoka } from '@/app/ui/fonts';

function QuestionContainer() {
  const [activeAccordion, setActiveAccordion] = useState(-1);

  return (
    <div className="w-full">
      {Object.keys(hackRUFAQ).map((question: string, i: number) => (
        <Accordian
          key={i}
          question={question}
          active={activeAccordion === i}
          setActiveAccordion={setActiveAccordion}
          index={i}
          answer={Object.values(hackRUFAQ)[i]}
          textcolor={'text-s2025black-100'}
        />
      ))}
    </div>
  );
}

export default function FAQ() {
  return (
    <div
      className={`relative z-10 -mt-4 flex h-auto w-full flex-col items-center justify-start overflow-visible pb-10 ${fredoka.className}`}
    >
      <div className="relative flex w-full flex-col items-center px-[6vw] xl:px-[10vw]">
        <QuestionContainer />
      </div>
    </div>
  );
}
