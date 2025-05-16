import { type ReactNode, type FC } from "react";
import { Calendar } from "./CalendarApp";

interface Props {
  children?: ReactNode;
}

export const App: FC<Props> = ({}) => {
  return <Calendar />;
};
