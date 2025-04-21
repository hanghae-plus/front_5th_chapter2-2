import { Typography } from "./Typography";

interface PageLayoutProps {
  title: string;
  children: React.ReactNode;
}

export const PageLayout = ({ title, children }: PageLayoutProps) => {
  return (
    <PageContainer>
      <Typography variant="h1">{title}</Typography>
      <TwoColumnGrid>{children}</TwoColumnGrid>
    </PageContainer>
  );
};

const PageContainer = ({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) => {
  return <div className={`container mx-auto p-4 ${className}`}>{children}</div>;
};

const TwoColumnGrid = ({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) => {
  return (
    <div className={`grid grid-cols-1 md:grid-cols-2 gap-6 ${className}`}>
      {children}
    </div>
  );
};
