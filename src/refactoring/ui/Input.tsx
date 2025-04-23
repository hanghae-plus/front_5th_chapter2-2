import clsx from 'clsx';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  className?: string;
}

//새상품 추가 input
const primaryInputClasses = 'w-full p-2 border rounded';
export const Input = ({ className, ...props }: InputProps) => (
  <input {...props} className={clsx(primaryInputClasses, className)} />
);
