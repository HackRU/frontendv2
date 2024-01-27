import { type } from "os";
import SectionTitle from "./SectionTitle";
import { ReactNode } from "react";

type GenericSectionProps = {
  children: ReactNode;
  title: string;
  color: string;
};

export default async function GenericSection(props: GenericSectionProps) {
  return (
    <div
      id={props.title}
      className={`w-full flex flex-col items-center bg-${props.color}`}
    >
      <SectionTitle title={props.title} />
      {props.children}
    </div>
  );
}
