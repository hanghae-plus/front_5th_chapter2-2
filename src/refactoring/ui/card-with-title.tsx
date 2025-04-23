type CardWithTitleProps = {
  title: string;
  children: React.ReactNode;
};

export const CardWithTitle = ({ title, children }: CardWithTitleProps) => {
  return (
    <div className={`mt-6 bg-white p-4 rounded shadow`}>
      <h2 className="text-2xl font-semibold mb-2">{title}</h2>
      {children}
    </div>
  );
};
