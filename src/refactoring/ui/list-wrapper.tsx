type ListWrapperProps = {
  children: React.ReactNode;
  className?: string;
};

export const ListWrapper = ({ children, className = "" }: ListWrapperProps) => {
  return <div className={`space-y-2 ${className}`}>{children}</div>;
};
