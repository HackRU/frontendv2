'use client';
import React from 'react';
import { hackRUFAQ } from '@/app/lib/constants';
import Accordian from './Accordion';
import { useState } from 'react';

function QuestionContainer() {
  const [activeAccordion, setActiveAccordion] = useState(-1);

  return (
    <div className="w-full whitespace-pre-line">
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
      id="FAQ"
      className="relative z-10 flex h-[67rem] w-full flex-col items-center justify-start overflow-visible sm:h-[50rem] md:h-[43rem]"
    >
      <div className="relative flex w-full flex-col items-center px-[10vw] pb-[10rem] xl:px-[15vw]">
        <QuestionContainer />
      </div>
    </div>
  );
}
