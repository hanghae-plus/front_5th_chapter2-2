import { ReactNode } from 'react';

type PageLayoutProps = {
  title: string;
  mainSection: ReactNode;
  sideSection: ReactNode;
};

const PagesLayout = ({ title, mainSection, sideSection }: PageLayoutProps) => {
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6">{title}</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>{mainSection}</div>
        <div>{sideSection}</div>
      </div>
    </div>
  );
};

export default PagesLayout;
