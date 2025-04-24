import { ReactNode } from "react";

type Props = {
  title: string;
  children: ReactNode;
};

export const CartSection = ({ title, children }: Props) => {
  return (
    <div className="mt-6 bg-white p-4 rounded shadow">
      <h2 className="text-2xl font-semibold mb-2">{title}</h2>
      {children}
    </div>
  );
};
