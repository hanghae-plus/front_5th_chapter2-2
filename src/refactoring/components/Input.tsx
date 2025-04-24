import { $CN } from "@/refactoring/utils";
import { DetailedHTMLProps } from "react";

type Props = DetailedHTMLProps<React.InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>;

export const Input = ({ className = "", ...rest }: Props) => {
  return <input className={$CN("w-full p-2 border rounded", className)} {...rest} />;
};
