import { Typography } from "./Typography";

interface SectionLayoutProps {
  title: string;
  children: React.ReactNode;
}

export const SectionLayout = ({ title, children }: SectionLayoutProps) => {
  return (
    <section>
      <Typography variant="h2">{title}</Typography>
      {children}
    </section>
  );
};
