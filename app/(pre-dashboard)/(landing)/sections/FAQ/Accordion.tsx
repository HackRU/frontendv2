import { useState } from 'react';

type propType = {
  question: string;
  active: boolean;
  setActiveAccordion: (value: number | ((prevVar: number) => number)) => void;
  index: number;
  answer: string;
};

export default function Accordion(props: propType) {
  // const [accordionOpen, setAccordionOpen] = useState(false);

  return (
    <div>
      <button
        onClick={() => {
          if(props.active){
            props.setActiveAccordion(-1)
          }
          else{
            props.setActiveAccordion(props.index)
          }
        }}
        className="flex w-full justify-between items-center pt-5"
      >
        <span className="text-3xl text-orange-100 text-left font-bold">{props.question}</span>
        <svg
          className="ml-8 shrink-0 fill-orange-100"
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
              props.active && '!rotate-180'
            }`}
          />
          <rect
            y="7"
            width="16"
            height="2"
            rx="1"
            className={`origin-center rotate-90 transform transition duration-200 ease-out ${
              props.active && '!rotate-180'
            }`}
          />
        </svg>
      </button>
      <div
        className={`pb-3 grid overflow-hidden text-sm text-orange-100 transition-all duration-300 ease-in-out ${
          props.active
            ? 'grid-rows-[1fr] opacity-100'
            : 'grid-rows-[0fr] opacity-0'
        }`}
      >
        <div className="overflow-hidden text-left text-lg">{props.answer}</div>
      </div>
      <hr />
    </div>
  );
}
