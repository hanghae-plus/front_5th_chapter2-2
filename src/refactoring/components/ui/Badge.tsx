import { ReactNode } from 'react';

interface BadgeProps {
  children: ReactNode;
  color?: 'blue' | 'green' | 'red';
  className?: string;
}

export const Badge = ({ children, color = 'blue', className = '' }: BadgeProps) => {
  const baseColor =
    color === 'green' ? 'bg-green-100 text-green-700' :
      color === 'red' ? 'bg-red-100 text-red-700' : 'bg-blue-100 text-blue-700';

  return (
    <span className={`inline-block text-xs px-2 py-0.5 rounded font-medium ${baseColor} ${className}`}>
      {children}
    </span>
  );
};
