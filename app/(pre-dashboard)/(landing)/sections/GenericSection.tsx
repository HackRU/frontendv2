import SectionTitle from './SectionTitle';
import { ReactNode } from 'react';

type GenericSectionProps = {
  children: ReactNode;
  title: string;
  color?: string;
};

export default function GenericSection(props: GenericSectionProps) {
  const defaultColor = 'bg-blue-100';
  const bgColorNew = props.color ? `${props.color}` : defaultColor;
  return (
    <div
      id={props.title}
      className={'flex w-full flex-col items-center bg-blue-200'}
    >
      <SectionTitle title={props.title} />
      {props.children}
      <div className={`h-[15vh] w-full ${bgColorNew}`}></div>
    </div>
  );
}
