import { fredoka } from '@/app/ui/fonts';

type propType = {
  question: string;
  active: boolean;
  setActiveAccordion: (value: number | ((prevVar: number) => number)) => void;
  index: number;
  answer: string;
  textcolor: string;
};

export default function Accordion(props: propType) {
  // inline fontFamily - the className form lost to the body's font class
  // const [accordionOpen, setAccordionOpen] = useState(false);

  return (
    <div
      className="border-b-2 border-[#4A6B2A]/80"
      style={{ fontFamily: fredoka.style.fontFamily }}
    >
      <button
        onClick={() => {
          if (props.active) {
            props.setActiveAccordion(-1);
          } else {
            props.setActiveAccordion(props.index);
          }
        }}
        className="flex w-full items-center justify-between gap-4 py-4 text-left md:py-5"
        aria-expanded={props.active}
      >
        <span className="text-lg font-bold text-[#12200F] md:text-2xl">
          {props.question}
        </span>
        <svg
          className={`h-5 w-5 shrink-0 fill-[#1E2A20] transition-transform duration-200 ease-out md:h-6 md:w-6 ${
            props.active ? 'rotate-180' : ''
          }`}
          viewBox="0 0 12 8"
          xmlns="http://www.w3.org/2000/svg"
          aria-hidden="true"
        >
          <path d="M0 0h12L6 8z" />
        </svg>
      </button>
      <div
        className={`grid overflow-hidden transition-all duration-300 ease-in-out ${
          props.active
            ? 'grid-rows-[1fr] opacity-100'
            : 'grid-rows-[0fr] opacity-0'
        }`}
      >
        <div className="overflow-hidden">
          {/* The answers are template literals in constants.ts, so they carry
              the source file's own line breaks and indentation. Split on blank
              lines for real paragraphs and collapse the rest, otherwise the
              text wraps wherever the source happened to. */}
          <div className="flex flex-col gap-4 pb-5 pr-8">
            {props.answer
              .split(/\n\s*\n/)
              .map((para) => para.replace(/\s+/g, ' ').trim())
              .filter(Boolean)
              .map((para, i) => (
                <p
                  key={i}
                  className="text-left text-base leading-relaxed text-[#2C3A2C] md:text-lg"
                >
                  {para}
                </p>
              ))}
          </div>
        </div>
      </div>
    </div>
  );
}
