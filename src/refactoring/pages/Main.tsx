import { useState } from 'react';

import NavigationHeader from '@/components/common/NavigationHeader.tsx';
import { CartPage } from '@/components/CartPage/index.tsx';
import { AdminPage } from '@/components/AdminPage/index.tsx';

const Main = () => {
  const [isAdmin, setIsAdmin] = useState(false);

  return (
    <div className="min-h-screen bg-gray-100">
      <NavigationHeader
        isAdmin={isAdmin}
        onSwitchPage={() => setIsAdmin(!isAdmin)}
      />
      <main className="container mx-auto mt-6">
        {isAdmin ? <AdminPage /> : <CartPage />}
      </main>
    </div>
  );
};

export default Main;
