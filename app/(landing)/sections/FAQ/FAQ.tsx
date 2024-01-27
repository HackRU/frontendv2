"use client";

import React from "react";
import { Disclosure } from "@headlessui/react";
import { GoChevronDown } from "react-icons/go";
import { hackRUFAQ } from "@/app/lib/constants";

/**
 * TODO: make it so that only one question can be open at a time.
 */

function Question(props: { question: string; answer: string }) {
  const { question, answer } = props;
  return (
    <Disclosure>
      {({ open }) => (
        <div className="flex flex-col border-b-white border-b-2 hover:bg-f23-mediumGreen rounded-t-lg">
          <Disclosure.Button className="flex w-full justify-between
            p-4 text-left text-md text-textSubtitle
            focus:outline-none focus-visible:ring
            focus-visible:ring-opacity-75">
            <span>{question}</span>
            <GoChevronDown
              className={`${
                open ? "rotate-180 transform" : ""
              } h-5 w-5 text-text`}
            />
          </Disclosure.Button>
          <Disclosure.Panel className="px-4 pt-4 pb-2 text-sm text-white w-full">
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
    <div className="pt-16 ml-22 z-40">
      <div className="max-w-3xl rounded-2xl transparent-black-background p-10 sm:grid sm:grid-cols-2">
        <div>
          <Question
            question="What is HackRU?"
            answer={whatIsHackRUAnswer}
          />
          <Question
            question="What is the application process like?"
            answer={whatIsApplicationAnswer}
          />
          <Question
            question="Can I win anything?"
            answer={winAnythingAnswer}
          />
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
          <Question
            question="Who can come?"
            answer={whoCanComeAnswer}
          />
          <Question
            question="I'm new. What should I do? "
            answer={newAnswer}
          />
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
      className="w-full flex h-fit
relative overflow-visible items-center 
flex-col justify-start min-h-[600px]"
    >
      <div className="w-full h-full max-w-7xl relative flex flex-col items-center pb-[24rem]">
        <QuestionContainer />
      </div>
    </div>
  );
}
