interface Props {
  children: React.ReactNode;
  className?: string;
}

export const CardBox = ({ children, className = '', ...rest }: Props) => (
  <div className={`bg-white p-4 rounded shadow ${className}`} {...rest}>
    {children}
  </div>
);
