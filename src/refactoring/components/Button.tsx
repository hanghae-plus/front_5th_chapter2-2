import { $CN } from "@/refactoring/utils";
import { DetailedHTMLProps } from "react";

type Props = DetailedHTMLProps<React.ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement> & {
  isFullWidth?: boolean;
  isRounded?: boolean;
  hover?: string | string[];
};

export const Button = ({ isFullWidth = false, isRounded = false, className = "", hover = "", children, ...rest }: Props) => {
  const classList = [
    // tailwind와 작성하는 코드량의 차이가 없다...
    isFullWidth ? "w-full" : "",
    className,
    isRounded ? "rounded" : "",
    ...(Array.isArray(hover) ? hover.map((h) => `hover:${h}`) : [hover ? `hover:${hover}` : ""]),
  ];
  return (
    <button className={$CN(...classList)} {...rest}>
      {children}
    </button>
  );
};
