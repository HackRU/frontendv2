import SectionTitle from './SectionTitle';
import { ReactNode } from 'react';

type GenericSectionProps = {
  children: ReactNode;
  title: string;
  color: string;
};

export default function GenericSection(props: GenericSectionProps) {
  return (
    <div
      id={props.title}
      className={`flex w-full flex-col items-center bg-${props.color}`}
    >
      <SectionTitle title={props.title} />
      {props.children}
    </div>
  );
}
