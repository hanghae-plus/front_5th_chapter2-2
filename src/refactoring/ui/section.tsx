type SectionBlockProps = {
  title: string;
  children: React.ReactNode;
};

export const Section = ({ title, children }: SectionBlockProps) => {
  return (
    <div>
      <h2 className="text-2xl font-semibold mb-4">{title}</h2>
      {children}
    </div>
  );
};
