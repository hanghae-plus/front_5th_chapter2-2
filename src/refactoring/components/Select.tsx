import { $CN } from "@/refactoring/utils";
import { DetailedHTMLProps } from "react";

type Props = DetailedHTMLProps<React.SelectHTMLAttributes<HTMLSelectElement>, HTMLSelectElement>;

export const Select = ({ className = "", children, ...rest }: Props) => {
  return (
    <select className={$CN("w-full p-2 border rounded", className)} {...rest}>
      {children}
    </select>
  );
};
