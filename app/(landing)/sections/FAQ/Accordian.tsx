import { useState } from 'react';

type propType = {
  question: string;
  answer: string;
};

export default function Accordion(props: propType) {
  const [accordionOpen, setAccordionOpen] = useState(false);

  return (
    <div className="py-2">
      <hr />
      <button
        onClick={() => setAccordionOpen(!accordionOpen)}
        className="flex w-full justify-between"
      >
        <span className="">{props.question}</span>
        <svg
          className="ml-8 shrink-0 fill-indigo-500"
          width="16"
          height="16"
          xmlns="http://www.w3.org/2000/svg"
        >
          <rect
            y="7"
            width="16"
            height="2"
            rx="1"
            className={`origin-center transform transition duration-200 ease-out ${
              accordionOpen && '!rotate-180'
            }`}
          />
          <rect
            y="7"
            width="16"
            height="2"
            rx="1"
            className={`origin-center rotate-90 transform transition duration-200 ease-out ${
              accordionOpen && '!rotate-180'
            }`}
          />
        </svg>
      </button>
      <div
        className={`grid overflow-hidden text-sm text-slate-600 transition-all duration-300 ease-in-out ${
          accordionOpen
            ? 'grid-rows-[1fr] opacity-100'
            : 'grid-rows-[0fr] opacity-0'
        }`}
      >
        <div className="overflow-hidden">{props.answer}</div>
      </div>
    </div>
  );
}
