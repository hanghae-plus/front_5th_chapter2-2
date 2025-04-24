import { ReactNode } from "react";

type ColumnLayoutProps = {
  children: ReactNode;
};

export const ColumnLayout = ({ children }: ColumnLayoutProps) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">{children}</div>
  );
};
