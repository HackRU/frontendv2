import SectionTitle from './SectionTitle';
import { ReactNode } from 'react';

type GenericSectionProps = {
  children: ReactNode;
  title: string;
  color?: string;
};

export default function GenericSection(props: GenericSectionProps) {
  const defaultColor = 'yellow-100';
  const bgColorNew = props.color ? `${props.color}` : defaultColor;
  return (
    <div
      id={props.title}
      className={'flex w-full flex-col items-center  sections'}
    >
      <SectionTitle title={props.title} />
      <div className="w-full h-fit sections relative">
        <div className="absolute  top-0 w-full h-full " />
        {props.children}
      </div>
      <div className={`h-[15vh] w-full ${bgColorNew}`}></div>
    </div>
  );
}
