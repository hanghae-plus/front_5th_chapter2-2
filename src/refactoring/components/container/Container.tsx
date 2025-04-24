interface PropsType {
  children: React.ReactNode;
  className?: string;
  testId?: string;
}

const Container = ({ children, className, testId }: PropsType) => {
  return (
    <div className={`bg-white p-3 rounded shadow ${className}`} data-testid={testId}>
      {children}
    </div>
  );
};

export default Container;
