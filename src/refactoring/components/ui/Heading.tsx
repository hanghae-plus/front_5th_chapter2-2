import { ReactNode } from 'react';

interface HeadingProps {
  children: ReactNode;
  level?: 1 | 2 | 3;
  className?: string;
}

export const Heading = ({ children, level = 1, className = '' }: HeadingProps) => {
  const Tag = (['h1', 'h2', 'h3'][level - 1]) as 'h1' | 'h2' | 'h3';
  const base =
    level === 1 ? 'text-3xl font-bold' :
      level === 2 ? 'text-2xl font-semibold' :
        'text-xl font-medium';

  return <Tag className={`${base} ${className}`}>{children}</Tag>;
};

