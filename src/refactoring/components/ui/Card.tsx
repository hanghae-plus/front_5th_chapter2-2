// Card.tsx
import { ReactNode, HTMLAttributes } from 'react';

interface CardProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode;
}

export const Card = ({ children, className = '', ...props }: CardProps) => {
  return (
    <div className={`bg-white p-3 rounded shadow ${className}`} {...props}>
      {children}
    </div>
  );
};
