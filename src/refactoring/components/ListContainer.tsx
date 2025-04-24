import { ReactNode } from "react";

type Props = {
  children: ReactNode;
};

export const ListContainer = ({ children }: Props) => {
  return <div className="space-y-2">{children}</div>;
};
