'use client';

import React from 'react';
import { Disclosure } from '@headlessui/react';
import { GoChevronDown } from 'react-icons/go';
import { hackRUFAQ } from '@/app/lib/constants';

/**
 * TODO: make it so that only one question can be open at a time.
 */

function Question(props: { question: string; answer: string }) {
  const { question, answer } = props;
  return (
    <Disclosure>
      {({ open }) => (
        <div className="hover:bg-f23-mediumGreen flex flex-col rounded-t-lg border-b-2 border-b-white">
          <Disclosure.Button
            className="text-md text-textSubtitle flex
            w-full justify-between p-4 text-left
            focus:outline-none focus-visible:ring
            focus-visible:ring-opacity-75"
          >
            <span>{question}</span>
            <GoChevronDown
              className={`${
                open ? 'rotate-180 transform' : ''
              } text-text h-5 w-5`}
            />
          </Disclosure.Button>
          <Disclosure.Panel className="w-full px-4 pb-2 pt-4 text-sm text-white">
            {answer}
          </Disclosure.Panel>
        </div>
      )}
    </Disclosure>
  );
}

function QuestionContainer() {
  const {
    whatIsHackRUAnswer,
    whatIsApplicationAnswer,
    winAnythingAnswer,
    maskMandateAnswer,
    moreQuestionsAnswer,
    whoCanComeAnswer,
    newAnswer,
    costAnswer,
    workWithOthersAnswer,
  } = hackRUFAQ;

  return (
    <div className="ml-22 z-40 pt-16">
      <div className="transparent-black-background max-w-3xl rounded-2xl p-10 sm:grid sm:grid-cols-2">
        <div>
          <Question question="What is HackRU?" answer={whatIsHackRUAnswer} />
          <Question
            question="What is the application process like?"
            answer={whatIsApplicationAnswer}
          />
          <Question question="Can I win anything?" answer={winAnythingAnswer} />
          <Question
            question="Will there be a mask mandate?"
            answer={maskMandateAnswer}
          />
          <Question
            question="I have more questions!"
            answer={moreQuestionsAnswer}
          />
        </div>
        <div>
          <Question question="Who can come?" answer={whoCanComeAnswer} />
          <Question question="I'm new. What should I do? " answer={newAnswer} />
          <Question
            question="How much does it cost to attend?"
            answer={costAnswer}
          />
          <Question
            question="Can I work with others?"
            answer={workWithOthersAnswer}
          />
        </div>
      </div>
    </div>
  );
}

export default function FAQ() {
  return (
    <div
      id="FAQ"
      className="relative flex h-fit
min-h-[600px] w-full flex-col 
items-center justify-start overflow-visible"
    >
      <div className="relative flex h-full w-full max-w-7xl flex-col items-center pb-[24rem]">
        <QuestionContainer />
      </div>
    </div>
  );
}
