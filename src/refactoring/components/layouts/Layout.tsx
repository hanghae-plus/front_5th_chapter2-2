import { ReactNode } from 'react';
import NavHeader from './NavHeader';

type LayoutProps = {
  children: ReactNode;
  setIsAdmin: React.Dispatch<React.SetStateAction<boolean>>;
  isAdmin: boolean;
};

const Layout = ({ children, setIsAdmin, isAdmin }: LayoutProps) => {
  return (
    <div className="min-h-screen bg-gray-100">
      <nav className="bg-blue-600 text-white p-4">
        <NavHeader isAdmin={isAdmin} onToggle={() => setIsAdmin(!isAdmin)} />
      </nav>
      <main className="container mx-auto mt-6">{children}</main>
    </div>
  );
};

export default Layout;
