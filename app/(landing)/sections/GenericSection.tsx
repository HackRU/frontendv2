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
      className={'flex w-full flex-col items-center bg-blue-200'}
    >
      <SectionTitle title={props.title} />
      {props.children}
      <div className='h-[15vh] w-full bg-blue-100'></div>
    </div>
  );
}
